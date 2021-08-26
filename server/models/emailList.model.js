const {Schema, model} = require('mongoose')

const EmailListSchema = new Schema({
  emails: [{
    type: String,
    unique: true,
    trim: true,
    toLowerCase: true
  }],
  // tags: [{
  //   type: String,
  //   unique: true,
  //   trim: true
  // }],
  emailTemplateId: {
    type: Schema.Types.ObjectId,
    ref: 'EmailTemplate'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('EmailList', EmailListSchema)