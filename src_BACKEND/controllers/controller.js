const Note = require('../model/user')

const getAllUser = async (req, res) => {
  try {
    const user = await user.find()
    res.status(200).json(notes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}
