const {Schema, model} = require('mongoose')

const EmailingSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  emailsStatus: [{
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    statusDate: {
      type: Date,
      default: Date.now()
    }
  }],
  emailListId: {
    type: Schema.Types.ObjectId,
    ref: 'EmailList'
  },
  emailTemplateId: {
    type: Schema.Types.ObjectId,
    ref: 'EmailTemplate'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('EmailingStatus', EmailingSchema)