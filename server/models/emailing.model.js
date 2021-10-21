const {Schema, model} = require('mongoose')

const EmailingSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  inProcess: {
    type: Boolean,
    required: true,
    default: false
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
    ref: 'EmailList',
    required: true
  },
  emailTemplateId: {
    type: Schema.Types.ObjectId,
    ref: 'EmailTemplate',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = model('EmailingStatus', EmailingSchema)