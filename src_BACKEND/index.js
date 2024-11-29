const express = require('express')
const cors = require('cors')
const connectDB = require('./configs/database')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB()

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
  })