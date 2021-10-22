const emailTemplateService = require('./emailTemplate.service')
const ApiExceptions = require('../exceptions/api.exception')
const EmailListModel = require('../models/emailList.model')
const emailService = require('./email.service')
const mailService = require('./mail.service')
const EmailListDto = require("../dtos/emailList.dto");

class EmailListService {
  async addEmailList(name, userId, emailTemplateId, emails) {
    return new EmailListDto(await EmailListModel.create({name, emails: Array.from(new Set(emails)), userId, emailTemplateId}))
  }

  async deleteEmailList(emailListId) {
    return new EmailListDto(await EmailListModel.deleteOne({_id: emailListId}))
  }

  async getEmailList(emailListId) {
    const emailList = await EmailListModel.findById(emailListId)
    if (!emailList) {
      throw ApiExceptions.BadRequest('Списка рассылки с таким с id не существует')
    }

    return new EmailListDto(emailList)
  }

  async getEmailLists(userId) {
    const emailLists = await EmailListModel.find({userId})
    return emailLists.map(emailList => new EmailListDto(emailList))
  }

  async addEmails(emailListId, emails) {
    return new EmailListDto(await EmailListModel.updateOne({_id: emailListId}, {$addToSet: {emails}}))
  }

  async deleteEmails(emailListId, emails) {
    return new EmailListDto(await EmailListModel.updateOne({_id: emailListId}, {$pull: {emails: {$in: [...emails]}}}))
  }

  async setEmails(emailListId, emails) {
    return new EmailListDto(EmailListModel.updateOne({_id: emailListId}, {emails}))
  }

  async setEmailTemplate(emailListId, emailTemplateId) {
    return new EmailListDto(EmailListModel.updateOne({_id: emailListId}, {emailTemplateId}))
  }
}

module.exports = new EmailListService()