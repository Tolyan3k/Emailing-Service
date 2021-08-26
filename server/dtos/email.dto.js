module.exports = class EmailDto{
  email
  tags
  id

  constructor(model) {
    this.email = model.email
    this.tags = model.tags || []
    this.id = model._id
  }
}