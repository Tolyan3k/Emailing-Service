module.exports = class EmailListDto {
  name
  emails
  id

  constructor(model) {
    this.name = model.name
    this.emails = model.emails
    this.id = model._id
  }
}