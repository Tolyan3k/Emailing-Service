const EmailModel = require('../models/email.model')
const ApiException = require('../exceptions/api.exception')
const EmailDto = require("../dtos/email.dto");

const emailProjection = { _id: 1, email: 1, tags: 1 }
const tagsProjection = { _id: 0, tags: 1}

class EmailService {
  async addEmail(userId, email, tags) {
    const isEmailExist = await EmailModel.findOne({email, userId})
    if (isEmailExist) {
      throw ApiException.BadRequest(`Email ${email} для текущего пользователя уже существует`)
    }

    email = await EmailModel.create({email, userId, tags: Array.from(new Set(tags))})
    email = new EmailDto(email)
    return (email)
  }

  async deleteEmail(userId, email) {
    let resEmail = await EmailModel.findOneAndDelete({email, userId})
    resEmail = new EmailDto(resEmail)
    return resEmail
  }

  async getEmail(userId, email) {
    let resEmail = await EmailModel.findOne({email, userId}, emailProjection)
    resEmail = new EmailDto(resEmail)
    return resEmail
  }

  async getEmails(userId) {
    let resEmails = await EmailModel.find({userId}, emailProjection)
    for (let i = 0; i < resEmails.length; i++) {
      resEmails[i] = new EmailDto(resEmails[i])
    }
    return resEmails
  }

  async addTagsForEmail(userId, email, tags) {
    let resEmail = await EmailModel.updateOne({email, userId}, {$addToSet: {tags}})
    resEmail = new EmailDto(resEmail)
    return resEmail
  }

  async deleteTagsForEmail(userId, email, tags) {
    let resEmail = await EmailModel.updateOne({email, userId}, {$unset: {tags}})
    resEmail = new EmailDto(resEmail)
    return resEmail
  }

  async getTagsForEmail(userId, email) {
    return EmailModel.findOne({email, userId}, tagsProjection)
  }

  async getTags(userId) {
    return {tags: (await EmailModel.find({userId}).distinct('tags'))}
  }

  async findEmailByTags(userId, tags) {
    return EmailModel.find({userId, tags: {$all: tags}}, emailProjection)
  }
}

module.exports = new EmailService()