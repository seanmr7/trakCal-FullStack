const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// @desc      Register new user
// @route     POST /api/users
// @access    public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Validate request body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Check if user already exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('A user already exists for that email')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc      Login user
// @route     POST /api/users/login
// @access    public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid Credentials')
  }
})

// @desc      Get current user
// @route     GET /api/users/current-user
// @access    private
const getUser = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
  }
  res.status(200).json(user)
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
}
