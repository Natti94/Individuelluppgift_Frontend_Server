const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true},
  emailField: { type: String, required: true, unique: true} 
}, { timestamps: true })

module.exports = mongoose.model('user', NoteSchema)