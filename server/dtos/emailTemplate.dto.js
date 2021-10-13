module.exports = class EmailTemplateDto {
  id
  title
  header
  body
  footer
  userId

  constructor(model) {
    this.id = model._id
    this.title = model.title
    this.header = model.header
    this.body = model.body
    this.footer = model.footer
    this.userId = model.userId
  }
}