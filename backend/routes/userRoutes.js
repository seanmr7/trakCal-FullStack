const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  registerUser,
  loginUser,
  getUser,
} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/current-user', protect, getUser)

module.exports = router
