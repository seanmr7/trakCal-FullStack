const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Profile = require('../models/profileModel')
const Item = require('../models/itemModel')

// @desc    Get profile items
// @route   GET /api/profiles/:profileId/items
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const profile = await Profile.findById(req.params.profileId)

  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const items = await Item.find({ profile: profile._id })

  res.status(200).json(items)
})

// @desc    Get single item
// @route   GET /api/profiles/:profileId/item/:itemId
// @access  Private
const getItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const profile = await Profile.findById(req.params.profileId)

  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const item = await Item.findById(req.params.itemId)

  res.status(200).json(item)
})

// @desc    Create food items
// @route   POST /api/profiles/:profileId/items
// @access  Private
const addItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const profile = await Profile.findById(req.params.profileId)

  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const item = await Item.create({
    name: req.body.name,
    calories: req.body.calories,
    user: req.user.id,
    profile: req.params.profileId,
  })

  res.status(200).json(item)
})

// @desc    Delete an item
// @route   DELETE /api/profiles/:profileId/items/:itemId
// @access  Private
const deleteItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const profile = await Profile.findById(req.params.profileId)

  if (!profile) {
    res.status(404)
    throw new Error('Profile not found')
  }

  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const item = await Item.findById(req.params.itemId)

  if (!item) {
    res.status(404)
    throw new Error('Item not found')
  }

  await item.remove()

  res.status(200).json({ success: true })
})

// @desc    Update an item
// @route   PUT /api/profiles/:profileId/items/:itemId
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const profile = await Profile.findById(req.params.profileId)

  if (!profile) {
    res.status(404)
    throw new Error('Profile not found')
  }

  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const item = await Item.findById(req.params.itemId)

  if (!item) {
    res.status(404)
    throw new Error('Item not found')
  }

  const updatedItem = await Item.findByIdAndUpdate(
    req.params.itemId,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedItem)
})

module.exports = {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
}
