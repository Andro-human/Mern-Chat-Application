const conversationModel = require("../models/conversationModel");
const userModel = require("../models/userModel");

const searchUser = async (req, res) => {
  try {
    const { name = "" } = req.query;
    const loggedInUser = req.userId;

    if (name === "") {
      return res.status(200).json({
        success: true,
        message: "Users fetched Successfully",
        users: [],
      });
    }

      // Find all conversations where loggedInUser is a member
    const myConversations = await conversationModel.find({
      members: { $in: [loggedInUser] },
    });

    // Find all users who are not in myConversations
    const usersFromExistingConversations = myConversations.map(
      (conversation) => conversation.members
    ).flat();     // flat is used to convert 2D array to 1D array
    
    const allUsersExceptUsersFromExistingConversations = await userModel.find({
      _id: { $nin: usersFromExistingConversations },
      name: { $regex: name, $options: "i" },        // i is for case insensitive
    });
    
    const users = allUsersExceptUsersFromExistingConversations.map(({_id, name,avatar}) => ({
      _id,
      name,
      avatar: avatar.url
    }))
    // const users = await userModel.find({
    //   name: { $regex: name, $options: "i" },        // i is for case insensitive
    //   _id: { $ne: loggedInUser },                // ne is for not equal
    // });

    return res.status(200).json({
      success: true,
      message: "Users fetched Successfully",
      users,
      // allUsersExceptUsersFromExistingConversations
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getUsers API",
      error,
    });
  }
};

module.exports = { searchUser };
