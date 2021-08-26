const messageTemplate = require('./templates/message.template')
const paramTemplate = require('./templates/param.template')
const bodyTemplate = require('./templates/body.template')
const {oneOf} = require('express-validator')

class EmailTemplateValidator {
  validateIdBody = bodyTemplate.existingNotEmptyStringField('emailTemplateId')
  validateTitle = bodyTemplate.existingStringField('title')
  validateMain = bodyTemplate.existingStringField('main')
  validateHeader = bodyTemplate.existingStringField('header')
  validateFooter = bodyTemplate.existingStringField('footer')

  validateMaybeExistingStringTitle = bodyTemplate.maybeExistingStringField('title')
  validateMaybeExistingStringHeader = bodyTemplate.maybeExistingStringField('header')
  validateMaybeExistingStringMain = bodyTemplate.maybeExistingStringField('main')
  validateMaybeExistingStringFooter = bodyTemplate.maybeExistingStringField('footer')
  validateMaybeExistingOneOfEmailTemplateFields =
    oneOf([
      bodyTemplate.existingField('title'),
      bodyTemplate.existingField('header'),
      bodyTemplate.existingField('main'),
      bodyTemplate.existingField('footer'),
    ], messageTemplate.notOneOf(['title', 'header', 'main', 'footer']))

  validateIdParam = paramTemplate.existingNotEmptyStringField('id')
}

module.exports = new EmailTemplateValidator()