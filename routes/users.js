const express = require('express');
const { getUsers, getUser, addUser, updateUser, delUser } = require('../controllers/users.controller');

const router = express.Router();

/* GET users listing. */
router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/new', addUser);

router.put('/:id', updateUser);

router.delete('/:id', delUser);

module.exports = router;
