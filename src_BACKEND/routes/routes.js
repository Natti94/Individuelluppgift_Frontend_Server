const express = require('express')
const router = express.Router()
const { createNote, getAllNotes, getNote, updateNote, deleteNote } = require('../controllers/noteController')

router.get('/', getAllNotes)

router.get('/:note_id', getNote)

router.post('/', createNote)

router.put('/:note_id', updateNote)

router.delete('/:note_id', deleteNote)

module.exports = router