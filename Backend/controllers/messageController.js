const conversationModel = require("../models/conversationModel");
const messageModel = require("../models/messageModel");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.userId;

    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "Sender and receiver cannot be the same",
      });
    }

    let conversation = await conversationModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = await messageModel.create({
      message,
      senderId,
      receiverId,
    });

    conversation.messages.push(newMessage._id);

    await conversation.save();
    // socket.io functionality to be added here

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      newMessage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in sendMessage API",
      error,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const { page = 1 } = req.query;
    const limit = 20;
    const skip = (page - 1) * limit;

    const [messages, totalMessagesCount] = await Promise.all([ messageModel
      .find({ conversationId })
      .populate("senderId", "name")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean(),
      messageModel.countDocuments({ conversationId })
    ])

    const totalPages = Math.ceil(totalMessagesCount / limit) || 0;

    return res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      messages: messages.reverse(),
      totalPages
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getMessages API",
      error,
    });
  }
}

module.exports = { sendMessage, getMessages };
