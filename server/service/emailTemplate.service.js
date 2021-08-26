const EmailTemplateModel = require('../models/emailTemplate.model')

class EmailTemplateService {
  async addEmailTemplate(userId, title = '', header = '', main = '', footer = '') {
    return EmailTemplateModel.create({title, header, main, footer, userId})
  }

  async getEmailTemplate(emailTemplateId) {
    return EmailTemplateModel.findById(emailTemplateId)
  }

  async getEmailTemplates(userId) {
    return EmailTemplateModel.find({userId})
  }

  async setEmailTemplate(emailTemplateId,
                         {title = undefined,
                           header = undefined,
                           main=  undefined,
                           footer = undefined
                         }) {
    let emailTemplateFields = {}
    const setIfNotUndefined = (value) => {
      if (value !== undefined) {
        emailTemplateFields[value] = value
      }
    }

    setIfNotUndefined(title)
    setIfNotUndefined(header)
    setIfNotUndefined(main)
    setIfNotUndefined(footer)

    return EmailTemplateModel.updateOne({_id: emailTemplateId}, emailTemplateFields)
  }

  async deleteEmailTemplate(emailTemplateId) {
    return EmailTemplateModel.deleteOne({_id: emailTemplateId})
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
  return EmailTemplateModel.updateOne({_id: emailTemplateId}, field)
}

module.exports = new EmailTemplateService()