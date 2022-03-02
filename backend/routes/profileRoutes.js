const express = require('express')
const router = express.Router()
const {
  getProfiles,
  getProfile,
  createProfile,
  deleteProfile,
  updateProfile,
} = require('../controllers/profileController')

const { protect } = require('../middleware/authMiddleware')

// Route into item router
const itemRouter = require('./itemRoutes')
router.use('/:profileId/items', itemRouter)

router.route('/').get(protect, getProfiles).post(protect, createProfile)

router
  .route('/:id')
  .get(protect, getProfile)
  .delete(protect, deleteProfile)
  .put(protect, updateProfile)

module.exports = router
