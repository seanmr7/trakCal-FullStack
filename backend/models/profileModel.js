const mongoose = require('mongoose')

const profileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    toObject: { vituals: true },
    toJSON: { virtuals: true },
    timestamps: true,
  }
)

profileSchema.virtual('bmi').get(function () {
  return (this.weight / this.height ** 2) * 704
})

module.exports = mongoose.model('Profile', profileSchema)
