const EmailTemplateModel = require('../models/emailTemplate.model')
const EmailTemplateDto = require("../dtos/emailTemplate.dto");
const ApiExceptions = require("../exceptions/api.exception");

class EmailTemplateService {
  async addEmailTemplate(userId, title = '', header = '', main = '', footer = '') {
    return new EmailTemplateDto(await EmailTemplateModel.create({title, header, main, footer, userId}))
  }

  async getEmailTemplate(emailTemplateId) {
    const emailTemplate = await EmailTemplateModel.findById(emailTemplateId)
    if (!emailTemplate) {
      throw ApiExceptions.BadRequest('Шаблон письма с указанным id не существует')
    }

    return new EmailTemplateDto(emailTemplate)
  }

  async getEmailTemplates(userId) {
    return (await EmailTemplateModel.find({userId})).map(emailTemplate => new EmailTemplateDto(emailTemplate))
  }

  async setEmailTemplate(emailTemplateId,
                         {title = undefined,
                           header = undefined,
                           main=  undefined,
                           footer = undefined
                         }) {
    let emailTemplateFields = {}
    const setIfNotUndefined = (value) => {
      console.log(value)
      if (value !== undefined) {
        Object.assign(emailTemplateFields, value)
      }
    }

    setIfNotUndefined({title})
    setIfNotUndefined({header})
    setIfNotUndefined({main})
    setIfNotUndefined({footer})

    console.log(emailTemplateFields)
    return new EmailTemplateDto(await EmailTemplateModel.updateOne({_id: emailTemplateId}, emailTemplateFields))
  }

  async deleteEmailTemplate(emailTemplateId) {
    return new EmailTemplateDto(await EmailTemplateModel.deleteOne({_id: emailTemplateId}))
  }

  async setTitle(emailTemplateId, newTitle) {
    return setEmailTemplateField(emailTemplateId, {title: newTitle})
  }

  async setHeader(emailTemplateId, newHeader) {
    return setEmailTemplateField(emailTemplateId, {header: newHeader})
  }

  async setMain(emailTemplateId, newMain) {
    return setEmailTemplateField(emailTemplateId, {main: newMain})
  }

  async setFooter(emailTemplateId, newFooter) {
    return setEmailTemplateField(emailTemplateId, {footer: newFooter})
  }
}

async function setEmailTemplateField(emailTemplateId, field) {
  return new EmailTemplateDto(await EmailTemplateModel.updateOne({_id: emailTemplateId}, field))
}

module.exports = new EmailTemplateService()