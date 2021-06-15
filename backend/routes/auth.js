const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  settings
} = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/settings', protect, settings);

module.exports = router;
