module.exports = class EmailListDto {
  emails
  id

  constructor(model) {
    this.emails = model.emails
    this.id = model._id
  }
}