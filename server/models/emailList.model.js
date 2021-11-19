const {Schema, model} = require('mongoose')

const EmailListSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  emails: [{
    type: String,
    trim: true,
    toLowerCase: true
  }],

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
})

module.exports = model('EmailList', EmailListSchema)