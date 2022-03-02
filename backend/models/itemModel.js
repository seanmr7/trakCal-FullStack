const mongoose = require('mongoose')

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Profile',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Item', itemSchema)
