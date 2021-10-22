const messageTemplate = require('./templates/message.template')
const paramTemplate = require('./templates/param.template')
const bodyTemplate = require('./templates/body.template')
const {body, oneOf} = require("express-validator");

class EmailingValidator {
  body = new BodyValidator()
  param = new ParamValidator()
}

class BodyValidator {
  name = [
    body('name')
      .exists().bail().withMessage(messageTemplate.notExistingField('name'))
      .isString().bail().withMessage(messageTemplate.notStringField('name'))
      .notEmpty().bail().withMessage(messageTemplate.emptyField('name'))
  ]

  emailingNameIfExist = bodyTemplate.maybeExistingNotEmptyStringField('name')
  emailingName = bodyTemplate.existingNotEmptyStringField('name')

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
