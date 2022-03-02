const express = require('express')
const router = express.Router({ mergeParams: true })
const {
  getItems,
  addItem,
  getItem,
  deleteItem,
  updateItem,
} = require('../controllers/itemController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getItems).post(protect, addItem)

router
  .route('/:itemId')
  .get(protect, getItem)
  .delete(protect, deleteItem)
  .put(protect, updateItem)

module.exports = router
