const emailTemplateService = require('.//emailTemplate.service')
const emailListService = require('.//emailList.service')
const mailService = require('.//mail.service')
const EmailingModel = require('../models/emailing.model')
const EmailingDto = require("../dtos/emailing.dto");

class EmailingService {
  async addEmailing(name, emailListId, emailTemplateId, userId) {
    return new EmailingDto(await EmailingModel.create({name, emailListId, emailTemplateId, userId}))
  }

  async deleteEmailing(emailingId) {
    return new EmailingDto(await EmailingModel.deleteOne({_id: emailingId}))
  }

  async setEmailing(emailingId, emailListId, emailTemplateId) {
    return new EmailingDto(await EmailingModel.updateOne({_id: emailingId}, {emailListId, emailTemplateId}))
  }

  async getEmailing(emailingId) {
    return new EmailingDto(await EmailingModel.findById(emailingId))
  }

  async getEmailings(userId) {
    return (await EmailingModel.find({userId})).map(emailing => new EmailingDto(emailing))
  }

  async startEmailing(emailingId) {
    const emailingData = await EmailingModel.findOne({_id: emailingId}, {_id: 0, inProcess: 1, emailListId: 1, emailTemplateId: 1})
    if (emailingData.inProcess) {
      throw Error('Рассылка уже запущена')
    }

    await EmailingModel.updateOne({_id: emailingId}, {inProcess: true})

    const {emails} = await emailListService.getEmailList(emailingData.emailListId)
    const {title, header, body, footer} = await emailTemplateService.getEmailTemplate(emailingData.emailTemplateId)
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
        const mailResult = await mailService.sendMail(email, {title, header, main: body, footer})
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

    await EmailingModel.updateOne({_id: emailingId}, {inProcess: false})
  }
}

module.exports = new EmailingService()