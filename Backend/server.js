const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express()

dotenv.config();
connectDB();

app.use(express.json());   // Parse JSON bodies
app.use(cookieParser());   // Parse cookies

app.use(cors());           // Enable CORS
app.use(morgan('dev'));    // Log HTTP requests


app.use("/api/auth", require('./routes/authRoutes'));    // Import authRoutes

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
