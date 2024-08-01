const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,      // This will not return password when we get user data
    },
    avatar:{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    }
}, { timestamps: true
})

module.exports = mongoose.model('User', userSchema);