const express = require('express')

const router = express.Router();

const {
  login,
  verifyToken,
  isadminOrSeller,
  forgotPassword,
  resetPassword
} =  require('../Controller/Auth.controller');

router.post('/', login);

module.exports = router;