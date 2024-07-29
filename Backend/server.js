const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;    
const app = express()

dotenv.config();
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.json());   // Parse JSON bodies
app.use(cookieParser());   // Parse cookies

app.use(cors());           // Enable CORS
app.use(morgan('dev'));    // Log HTTP requests


app.use("/api/auth", require('./routes/authRoutes'));             // Auth routes
app.use("/api/message", require('./routes/messageRoutes'))       // Message routes

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
