const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const { createServer } = require("http");
const cloudinary = require("cloudinary").v2;
const {
  createSampleConversation,
  createSampleMessages,
  createUser,
} = require("./seeders/fakeDataCreator");

dotenv.config();
connectDB();

// createSampleMessages(10);
// createUser(10);
// createSampleConversation(10);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const server =  createServer(app, {});
const io = new Server(server, {});
// app.set("socketio", io);

app.use(express.json()); // Parse JSON bodies

app.use(cookieParser()); // Parse cookies
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Log HTTP requests

app.use("/api/auth", require("./routes/authRoutes")); // Auth routes
app.use("/api/message", require("./routes/messageRoutes")); // Message routes
app.use("/api/users", require("./routes/userRoutes")); // User routes
app.use("/api/conversations", require("./routes/conversationRoutes")); // Conversation routes

const PORT = process.env.PORT || 8080;

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // socket.on("joinRoom", (room) => {
  //   socket.join(room);
  //   console.log(`A user joined room ${room}`);
  // });

  socket.on("sendMessage", async (message) => {
    console.log(`Message: ${message}`);
    io.to(message.conversationId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
