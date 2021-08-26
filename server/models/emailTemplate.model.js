const {Schema, model} = require('mongoose')

const EmailTemplateSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Рассылка'
  },
  header: {
    type: String,
    required: true,
    default: 'Тема рассылки'
  },
  main: {
    type: String,
    required: true,
    default: 'Основной текст рассылки'
  },
  footer: {
    type: String,
    required: true,
    default: 'Подпись для рассылки'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('EmailTemplate', EmailTemplateSchema)