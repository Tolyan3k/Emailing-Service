const {Schema, model} = require('mongoose')

const EmailSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Email', EmailSchema)
