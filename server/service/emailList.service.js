const emailTemplateService = require('./emailTemplate.service')
const ApiExceptions = require('../exceptions/api.exception')
const EmailListModel = require('../models/emailList.model')
const emailService = require('./email.service')
const mailService = require('./mail.service')

class EmailListService {
  async addEmailList(userId, emailTemplateId, emails) {
    return EmailListModel.create({emails: Array.from(new Set(emails)), userId, emailTemplateId})
  }

  async deleteEmailList(emailListId) {
    return EmailListModel.deleteOne({_id: emailListId})
  }

  async getEmailList(emailListId) {
    return EmailListModel.findById(emailListId)
  }

  async addEmails(emailListId, emails) {
    return EmailListModel.updateOne({_id: emailListId}, {$addToSet: {emails}})
  }

  async deleteEmails(emailListId, emails) {
    return EmailListModel.updateOne({_id: emailListId}, {$unset: {emails}})
  }

  async setEmails(emailListId, emails) {
    return EmailListModel.updateOne({_id: emailListId}, {emails})
  }

  async setEmailTemplate(emailListId, emailTemplateId) {
    return EmailListModel.updateOne({_id: emailListId}, {emailTemplateId})
  }
}

module.exports = new EmailListService()