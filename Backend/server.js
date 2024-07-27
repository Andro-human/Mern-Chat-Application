const express = require('express')
const dotenv = require('dotenv')
const app = express()

app.use(express.json());
dotenv.config();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 8080

app.listen(3000, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})
