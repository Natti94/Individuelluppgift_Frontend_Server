const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
  })