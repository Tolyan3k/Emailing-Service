const emailTemplateService = require('../services/emailTemplate.service')
const emailListService = require('../services/emailList.service')
const emailingService = require('../services/emailing.service')
const emailService = require('../services/email.service')

const ApiException = require('../exceptions/api.exception')
const {validationResult} = require('express-validator')
const UserService = require('../services/user.service')
require('dotenv').config()

class UserController {
//Authentication
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при валидации', errors.array()))
      }

      console.log('User controller - registration')
      const {email, password} = req.body
      const userData = await UserService.registration(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при валидации', errors.array()))
      }

      const {email, password} = req.body
      const userData = await UserService.login(email, password)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const token = await UserService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await UserService.activate(activationLink)

      return res.redirect(process.env.CLIENT_URL)
    } catch (e) {
      next(e)
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies
      const userData = await UserService.refresh(refreshToken)
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await UserService.getUsers()
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }


//Emails
  async addEmail(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка добавления почты для рассылки', errors.array()))
      }

      const {email, tags} = req.body
      const userId = req.user.id

      return res.json(await emailService.addEmail(userId, email, tags))
    } catch (e) {
      next(e)
    }
  }

  async deleteEmail(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка добавления почты для рассылки', errors.array()))
      }

      const {email} = req.body
      const userId = req.user.id

      return res.json(await emailService.deleteEmail(userId, email))
    } catch (e) {
      next(e)
    }
  }

  async getEmail(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка добавления почты для рассылки', errors.array()))
      }

      const {email} = req.body
      const userId = req.user.id

      return res.json(await emailService.getEmail(userId, email))
    } catch (e) {
      next(e)
    }
  }

  async getEmails(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка добавления почты для рассылки', errors.array()))
      }

      const userId = req.user.id

      return res.json(await emailService.getEmails(userId))
    } catch (e) {
      next(e)
    }
  }

  async addTagsToEmail(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка добавления тегов в почту для рассылки', errors.array()))
      }

      const {email, tags} = req.body
      const userId = req.user.id

      return res.json(await emailService.addTagsForEmail(userId, email, tags))
    } catch (e) {
      next(e)
    }
  }

  async deleteTagsFromEmail(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при удалении тегов в почте рассылки', errors.array()))
      }

      const {email, tags} = req.body
      const userId = req.user.id

      return res.json(await emailService.deleteTagsForEmail(userId, email, tags))
    } catch (e) {
      next(e)
    }
  }

  async getEmailTags(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при удалении тегов в почте рассылки', errors.array()))
      }

      const {email} = req.body
      const userId = req.user.id

      return res.json(await emailService.getTagsForEmail(userId, email))
    } catch (e) {
      next(e)
    }
  }

  async getTags(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при удалении тегов в почте рассылки', errors.array()))
      }

      const userId = req.user.id

      return res.json(await emailService.getTags(userId))
    } catch (e) {
      next(e)
    }
  }

  async findEmailByTag(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при поиске электронной почты по тегу', errors.array()))
      }

      const {tags} = req.body
      const userId = req.user.id

      return res.json(await emailService.findEmailByTags(userId, tags))
    } catch (e) {
      next(e)
    }
  }


//Email Templates
  async addEmailTemplate(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании шаблона сообщения рассылки', errors.array()))
      }

      const {title, header, main, footer} = req.body
      const userId = req.user.id

      return res.json(await emailTemplateService.addEmailTemplate(userId, title, header, main, footer))
    } catch (e) {
      next(e)
    }
  }

  async getEmailTemplate(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при получении шаблона сообщения рассылки', errors.array()))
      }

      const emailTemplateId = req.params.id

      return res.json(await emailTemplateService.getEmailTemplate(emailTemplateId))
    } catch (e) {
      next(e)
    }
  }

  async updateEmailTemplate(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при обновлении шаблона сообщения рассылки', errors.array()))
      }

      const emailTemplateId = req.params.id
      const {title, header, main, footer} = req.body

      return res.json(await emailTemplateService.setEmailTemplate(emailTemplateId, {title, header, main, footer}))
    } catch (e) {
      next(e)
    }
  }

  async deleteEmailTemplate(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при удалении шаблона сообщения рассылки', errors.array()))
      }

      const emailTemplateId = req.params.id

      return res.json(await emailTemplateService.deleteEmailTemplate(emailTemplateId))
    } catch (e) {
      next(e)
    }
  }

  async getEmailTemplates(req, res, next) {
    try {
      return res.json(await emailTemplateService.getEmailTemplates(req.user.id))
    } catch (e) {
      next(e)
    }
  }


//Email Lists
  async addEmailList(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const userId = req.user.id
      const {name, emails, emailTemplateId} = req.body

      return res.json(await emailListService.addEmailList(name, userId, emailTemplateId, emails))
    } catch (e) {
      next(e)
    }
  }

  async getEmailList(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const emailListId = req.params.id

      return res.json(await emailListService.getEmailList(emailListId))
    } catch (e) {
      next(e)
    }
  }

  async getEmailLists(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const userId = req.user.id

      return res.json(await emailListService.getEmailLists(userId))
    } catch (e) {
      next(e)
    }
  }

  async deleteEmailList(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const emailListId = req.params.id

      return res.json(await emailListService.deleteEmailList(emailListId))
    } catch (e) {
      next(e)
    }
  }

  async addEmailsToEmailList(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const emailListId = req.params.id
      const {emails} = req.body

      return res.json(await emailListService.addEmails(emailListId, emails))
    } catch (e) {
      next(e)
    }
  }

  async deleteEmailsFromEmailList(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const emailListId = req.params.id
      const {emails} = req.body

      return res.json(await emailListService.deleteEmails(emailListId, emails))
    } catch (e) {
      next(e)
    }
  }

  async setEmailTemplateToEmailList(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const emailListId = req.params.id
      const {emailTemplateId} = req.body

      return res.json(await emailListService.setEmailTemplate(emailListId, emailTemplateId))
    } catch (e) {
      next(e)
    }
  }


//Emailing
  async addEmailing(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const userId = req.user.id
      const {name, emailTemplateId, emailListId} = req.body

      return res.json(await emailingService.addEmailing(name, emailListId, emailTemplateId, userId))
    } catch (e) {
      next(e)
    }
  }

  async deleteEmailing(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const emailingId = req.params.id

      return res.json(await emailingService.deleteEmailing(emailingId))
    } catch (e) {
      next(e)
    }
  }

  async setEmailing(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const emailingId = req.params.id
      const {emailTemplateId, emailListId} = req.body

      return res.json(await emailingService.setEmailing(emailingId, emailListId, emailTemplateId))
    } catch (e) {
      next(e)
    }
  }

  async getEmailing(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const emailingId = req.params.id

      return res.json(await emailingService.getEmailing(emailingId))
    } catch (e) {
      next(e)
    }
  }

  async getEmailings(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const userId = req.user.id

      return res.json(await emailingService.getEmailings(userId))
    } catch (e) {
      next(e)
    }
  }

  async startEmailing(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiException.BadRequest('Ошибка при создании списка рассылки', errors.array()))
      }

      const emailingId = req.params.id

      return res.json(await emailingService.startEmailing(emailingId))
    } catch (e) {
      next(e)
    }
  }
}


module.exports = new UserController()