const emailTemplateValidator = require('../middleware/validators/emailTemplate.validator')
const emailListValidator = require('../middleware/validators/emailList.validator')
const emailingValidator = require('../middleware/validators/emailing.validator')
const emailValidator = require('../middleware/validators/email.validator')
const userValidator = require('../middleware/validators/user.validator')

const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const Router = require('express').Router
const router = new Router()
require('dotenv').config()

//Authentication
router.post('/registration', userValidator.validateRegistration, userController.registration)
router.post('/login', userValidator.validateLogin, userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

//Email List
router.post('/email', authMiddleware, [
  emailValidator.validateEmail,
], userController.addEmail)

router.post('/email/tags', authMiddleware, [
  emailValidator.validateEmail,
  emailValidator.validateMaybeExistingTags
], userController.addTagsToEmail)

router.delete('/email', authMiddleware, [
  emailValidator.validateEmail
], userController.deleteEmail)

router.delete('/email/tags', authMiddleware, [
  emailValidator.validateEmail,
  emailValidator.validateExistingTags
], userController.deleteTagsFromEmail)

router.get('/email', [
    emailValidator.validateEmail,
], authMiddleware, userController.getEmail)

router.get('/emails', authMiddleware, userController.getEmails)
router.get('/emails/tags', authMiddleware, userController.getTags)

router.get('/emails/find', [
  emailValidator.validateMaybeExistingTags
], authMiddleware, userController.findEmailByTag)


//Email Templating
router.post('/emailTemplate',
  emailTemplateValidator.validateTitle,
  emailTemplateValidator.validateHeader,
  emailTemplateValidator.validateMain,
  emailTemplateValidator.validateFooter,
  authMiddleware, userController.addEmailTemplate)

router.delete('/emailTemplate/:id', [
  emailTemplateValidator.validateIdParam
], authMiddleware, userController.deleteEmailTemplate)

router.put('/emailTemplate/:id', [
  emailTemplateValidator.validateIdParam,
  emailTemplateValidator.validateMaybeExistingStringTitle,
  emailTemplateValidator.validateMaybeExistingStringHeader,
  emailTemplateValidator.validateMaybeExistingStringMain,
  emailTemplateValidator.validateMaybeExistingStringFooter,
  emailTemplateValidator.validateMaybeExistingOneOfEmailTemplateFields
], authMiddleware, userController.updateEmailTemplate)

router.get('/emailTemplate/:id',
  emailTemplateValidator.validateIdParam,
  authMiddleware, userController.getEmailTemplate)

router.get('/emailTemplates', authMiddleware, userController.getEmailTemplates)


//Email Lists
router.post('/emailList',
  emailListValidator.body.name,
  emailListValidator.body.emails,
  // emailListValidator.body.emailTemplateId,
  authMiddleware, userController.addEmailList)

router.get('/emailList/:id', emailListValidator.param.id, authMiddleware, userController.getEmailList)
router.get('/emailLists', authMiddleware, userController.getEmailLists)
router.delete('/emailList/:id', emailListValidator.param.id, authMiddleware, userController.deleteEmailList)

router.put('/emailList/:id/emails',
  emailListValidator.param.id,
  emailListValidator.body.emails,
  authMiddleware, userController.addEmailsToEmailList)

router.delete('/emailList/:id/emails',
  emailListValidator.param.id,
  emailListValidator.body.emails,
  authMiddleware, userController.deleteEmailsFromEmailList)

router.put('/emailList/:id/emailTemplate',
  emailListValidator.param.id,
  emailListValidator.body.emailTemplateId,
  authMiddleware, userController.setEmailTemplateToEmailList)


//Emailing
router.post('/emailing',
  emailingValidator.body.name,
  emailingValidator.body.emailTemplateId,
  emailingValidator.body.emailListId,
  authMiddleware, userController.addEmailing)

router.get('/emailing/:id',
  emailingValidator.param.id,
  authMiddleware, userController.getEmailing)

router.delete('/emailing/:id',
  emailingValidator.param.id,
  authMiddleware, userController.deleteEmailing)

router.post('/emailing/:id',
  emailingValidator.param.id,
  authMiddleware, userController.startEmailing)

router.put('/emailing/:id',
  emailingValidator.param.id,
  emailingValidator.body.emailListIdIfExist,
  emailingValidator.body.emailTemplateIdIfExist,
  emailingValidator.body.emailListIdOrTemplateIdExist,
  authMiddleware, userController.setEmailing)

router.get('/emailing', authMiddleware, userController.getEmailing)

module.exports = router