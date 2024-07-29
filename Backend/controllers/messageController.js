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
    const { id: receiverId } = req.params;
    const senderId = req.userId;

    if (receiverId === senderId) {
        return res.status(400).json({
            success: false,
            message: "Sender and receiver cannot be the same",
        });
    }
    
    const conversation = await conversationModel
      .findOne({
        members: { $all: [senderId, receiverId] },
      })
      .populate("messages");        // not reference but actual messages

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "No conversation found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      messages: conversation.messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getMessages API",
      error,
    });
  }
};

module.exports = { sendMessage, getMessages };
