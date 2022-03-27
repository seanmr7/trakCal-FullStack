const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Profile = require('../models/profileModel')

// @desc    Get user profiles
// @route   GET /api/profiles
// @access  Private
const getProfiles = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const profiles = await Profile.find({ user: req.user.id })

  res.status(200).json(profiles)
})

// @desc    Get a profile
// @route   GET /api/profiles/:id
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  const profile = await Profile.findById(req.params.id)

  if (!profile) {
    res.status(404)
    throw new Error('Profile not found')
  }

  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(profile)
})

// @desc    Create new profiles
// @route   POST /api/profiles
// @access  Private
const createProfile = asyncHandler(async (req, res) => {
  const { name, height, weight } = req.body

  if (!name || !height || !weight) {
    res.status(400)
    throw new Error('Please add a name, height, and weight')
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const profile = await Profile.create({
    name,
    height,
    weight,
    user: req.user.id,
  })

  res.status(201).json(profile)
})

// @desc    Delete profile
// @route   DELETE /api/profiles/:id
// @access  Private
const deleteProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const profile = await Profile.findById(req.params.id)

  if (!profile) {
    res.status(404)
    throw new Error('Profile not found')
  }

  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  await profile.remove()

  res.status(200).json({ success: true })
})

// @desc    Update a profile
// @route   PUT /api/profiles/:id
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const profile = await Profile.findById(req.params.id)

  if (!profile) {
    res.status(404)
    throw new Error('Profile not found')
  }

  if (profile.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  const updatedProfile = await Profile.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, upsert: true }
  )

  res.status(200).json(updatedProfile)
})

module.exports = {
  getProfiles,
  getProfile,
  createProfile,
  deleteProfile,
  updateProfile,
}
