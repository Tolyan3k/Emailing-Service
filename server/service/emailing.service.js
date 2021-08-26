const emailTemplateService = require('../service/emailTemplate.service')
const emailListService = require('../service/emailList.service')
const mailService = require('../service/mail.service')
const EmailingModel = require('../models/emailing.model')

class EmailingService {
  addEmailing(emailListId, emailTemplateId, userId) {
    return EmailingModel.create({emailListId, emailTemplateId, userId})
  }

  deleteEmailing(emailingId) {
    return EmailingModel.deleteOne({_id: emailingId})
  }

  setEmailing(emailingId, emailListId, emailTemplateId) {
    return EmailingModel.updateOne({_id: emailingId}, {emailListId, emailTemplateId})
  }

  getEmailing(emailingId) {
    return EmailingModel.findById(emailingId)
  }

  getEmailings(userId) {
    return EmailingModel.find({userId})
  }

  async startEmailing(emailingId) {
    const emailingData = await EmailingModel.findOne({_id: emailingId}, {_id: 0, emailListId: 1, emailTemplateId: 1})

    const {emails} = await emailListService.getEmailList(emailingData.emailListId)
    const {title, header, main, footer} = await emailTemplateService.getEmailTemplate(emailingData.emailTemplateId)
    await EmailingModel.updateOne({_id: emailingId}, {emailsStatus: []})

    emails.forEach((email) => {
      console.log(email)
      const emailStatus = {email, status: 'Готовится к отправке', statusDate: Date.now()}
      const func = async () => {
        await EmailingModel.updateOne({_id: emailingId}, {$push: {emailsStatus: emailStatus}})
      }
      func()
    })

    emails.forEach(email => {
      const func = async () => {
        const mailResult = await mailService.sendMail(email, {title, header, main, footer})
        if (mailResult['accepted'].length) {
          await EmailingModel.updateOne({_id: emailingId, 'emailsStatus.email': email},
            {$set: {'emailsStatus.$.status': 'Отправлено', 'emailsStatus.$.statusDate': Date.now()}})
        } else {
          await EmailingModel.updateOne({_id: emailingId, 'emails.email': email},
            {$set: {'emailsStatus.$.status': 'Ошибка во время отправки', 'emailsStatus.$.statusDate': Date.now()}})
        }
      }
      func()
    })
  }
}

module.exports = new EmailingService()