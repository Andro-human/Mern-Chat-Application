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
const socketAuth = require("./middlewares/socketAuth");

dotenv.config();
connectDB();

const userSocketIDs = new Map();

// To generate sample data
// createSampleMessages(10);
// createUser(10);
// createSampleConversation(10);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const corsOptions = {
  origin: ["http://localhost:5173", "https://chat-app.animeshsinha.info"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const app = express();
const server = createServer(app, {});

app.use(
  cors(corsOptions)
);// Enable CORS

const io = new Server(server, {
  cors: corsOptions,
});

app.options('*', cors(corsOptions));

// app.set("socketio", io);
app.set("io", io);
app.use(express.json()); // Parse JSON bodies

app.use(cookieParser()); // Parse cookies


app.use(morgan("dev")); // Log HTTP requests

app.use("/api/v1/auth", require("./routes/authRoutes")); // Auth routes
app.use("/api/v1/message", require("./routes/messageRoutes")); // Message routes
app.use("/api/v1/users", require("./routes/userRoutes")); // User routes
app.use("/api/v1/conversations", require("./routes/conversationRoutes")); // Conversation routes

const PORT = process.env.PORT || 8080;

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, async (err) => {
    await socketAuth(err, socket, next);
  });
  // next();
});

io.on("connection", (socket) => {
  const user = socket.user;
  console.log("A user Connected", user);
  userSocketIDs.set(user._id.toString(), socket.id);


  io.emit("onlineUsers", { userIDs: Array.from(userSocketIDs.keys()) });
  socket.on("sendMessage", async ({ conversationId, message, members }) => {
    const newMessage = {
      message,
      _id: uuid(),
      senderId: { _id: user._id, name: user.name },
      conversation: conversationId,
      createdAt: new Date().toISOString(),
    };

    const messageForDb = {
      message,
      senderId: user._id,
      conversationId,
    };

    console.log("New message:", members);
    // Emit event to all members of the conversation
    const memberSocket = members.map((member) => userSocketIDs.get(member));

    io.to(memberSocket).emit("newMessage", {
      conversationId,
      message: newMessage,
    });

    try {
      await messageModel.create(messageForDb);
    } catch (error) {
      console.error("Error in saving message to db:", error);
    }
  });

  socket.on("typing", ({ conversationId, members }) => {
    const memberSocket = members.map((member) => userSocketIDs.get(member));
    socket.to(memberSocket).emit("typing", { conversationId });
  });
  socket.on("stopTyping", ({ conversationId, members }) => {
    const memberSocket = members.map((member) => userSocketIDs.get(member));
    socket.to(memberSocket).emit("stopTyping", { conversationId });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    userSocketIDs.delete(user._id.toString());
    io.emit("onlineUsers", { userIDs: Array.from(userSocketIDs.keys()) });
  });
});
server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
