const userModel = require("../models/userModel");

const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.userId;

        const users = await userModel.find({ _id: { $ne: loggedInUser } }) // This will return all users except the logged in user

    
        return res.status(200).json({
        success: true,
        message: "Users fetched Successfully",
        users,
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


module.exports = { getUsersForSidebar };