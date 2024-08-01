const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const { v4: uuid } = require("uuid");
const { createServer } = require("http");
const cloudinary = require("cloudinary").v2;
const {
  createSampleConversation,
  createSampleMessages,
  createUser,
} = require("./seeders/fakeDataCreator");
const messageModel = require("./models/messageModel");

dotenv.config();
connectDB();

const userSocketIDs = new Map();

// createSampleMessages(10);
// createUser(10);
// createSampleConversation(10);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server = createServer(app, {});
const io = new Server(server, {});
// app.set("socketio", io);

app.use(express.json()); // Parse JSON bodies

app.use(cookieParser()); // Parse cookies
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})); // Enable CORS
app.use(morgan("dev")); // Log HTTP requests

app.use("/api/v1/auth", require("./routes/authRoutes")); // Auth routes
app.use("/api/v1/message", require("./routes/messageRoutes")); // Message routes
app.use("/api/v1/users", require("./routes/userRoutes")); // User routes
app.use("/api/v1/conversations", require("./routes/conversationRoutes")); // Conversation routes

const PORT = process.env.PORT || 8080;

io.use((socket, next) => {
  next();
})

io.on("connection", (socket) => {
  const user = { _id: "435424", name: "John Doe" };
  userSocketIDs.set(user._id.toString(), socket.id);
  console.log(userSocketIDs);

  // socket.on("joinRoom", (room) => {
  //   socket.join(room);
  //   console.log(`A user joined room ${room}`);
  // });

  socket.on("sendMessage", async ({ conversationId, message, member }) => {
    const newMessage = {
      message,
      _id: uuid(),
      sender: { _id: user._id, name: user.name },
      conversation: conversationId,
      createdAt: new Date().toISOString(),
    };

    const messageForDb = {
      message,
      senderId: user._id,
      conversationId,
    };

    // Emit event to all members of the conversation
    const memberSocket = userSocketIDs.get(member._id.toString());

    io.to(memberSocket).emit("NEW_MESSAGE", {
      conversationId,
      message: newMessage,
    });

    try {
      await messageModel.create(messageForDb); 
    } catch (error) {
      console.error("Error in saving message to db:", error)
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});

server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
