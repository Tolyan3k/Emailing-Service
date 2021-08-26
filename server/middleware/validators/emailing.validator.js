const messageTemplate = require('./templates/message.template')
const paramTemplate = require('./templates/param.template')
const bodyTemplate = require('./templates/body.template')
const {body, oneOf} = require("express-validator");

class EmailingValidator {
  body = new BodyValidator()
  param = new ParamValidator()
}

class BodyValidator {
  emailTemplateId = bodyTemplate.existingNotEmptyStringField('emailTemplateId')
  emailListId = bodyTemplate.existingNotEmptyStringField('emailListId')

  emailTemplateIdIfExist = bodyTemplate.maybeExistingNotEmptyStringField('emailTemplateId')
  emailListIdIfExist = bodyTemplate.maybeExistingNotEmptyStringField('emailListId')

  emailListIdOrTemplateIdExist =
    oneOf([
      body('emailListId')
        .exists(),
      body('emailTemplateId')
        .exists()
    ], messageTemplate.notOneOf(['emailListId', 'emailTemplateId']))
}

class ParamValidator {
  id = paramTemplate.existingNotEmptyStringField('id')
}

module.exports = new EmailingValidator()
