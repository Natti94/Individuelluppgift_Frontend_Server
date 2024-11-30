const express = require('express');
const router = express.Router();
const { createUser, getAllUser, getUser, updateUser, deleteUser } = require('../controller/controller');

router.get('/', getAllUser);
router.get('/:user_id', getUser);
router.post('/', createUser); // This matches POST requests to '/user'
router.put('/:user_id', updateUser);
router.delete('/:user_id', deleteUser);

module.exports = router;
