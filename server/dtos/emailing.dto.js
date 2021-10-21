module.exports = class EmailingDto {
  name
  inProcess
  emailsStatus
  emailListId
  emailTemplateId
  userId
  id

  constructor(model) {
    this.name = model.name
    this.inProcess = model.inProcess
    this.emailsStatus = model.emailsStatus
    this.emailListId = model.emailListId
    this.emailTemplateId = model.emailTemplateId
    this.userId = model.userId
    this.id = model._id
  }
}