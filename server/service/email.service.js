const EmailModel = require('../models/email.model')
const ApiException = require('../exceptions/api.exception')

const emailProjection = { _id: 0, email: 1, tags: 1 }
const tagsProjection = { _id: 0, tags: 1}

class EmailService {
  async addEmail(userId, email, tags) {
    const isEmailExist = await EmailModel.findOne({email, userId})
    if (isEmailExist) {
      throw ApiException.BadRequest(`Email ${email} для текущего пользователя уже существует`)
    }

    return (await EmailModel.create({email, userId, tags: Array.from(new Set(tags))}))
  }

  async deleteEmail(userId, email) {
    return EmailModel.findOneAndDelete({email, userId}, )
  }

  async getEmail(userId, email) {
    return EmailModel.findOne({email, userId}, emailProjection)
  }

  async getEmails(userId) {
    return EmailModel.find({userId}, emailProjection)
  }

  async addTagsForEmail(userId, email, tags) {
    return EmailModel.updateOne({email, userId}, {$addToSet: {tags}})
  }

  async deleteTagsForEmail(userId, email, tags) {
    return EmailModel.updateOne({email, userId}, {$unset: {tags}})
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