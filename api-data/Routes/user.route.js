const express = require('express');
const router = express.Router();
const { postuser } = require('../Controller/User.controller');

// route to create a new user
router.post('/', postuser);

module.exports = router;