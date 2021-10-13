const messageTemplate = require('./templates/message.template')
const paramTemplate = require('./templates/param.template')
const bodyTemplate = require('./templates/body.template')
const {body} = require("express-validator");

class EmailListValidator {
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

  emails = [
    body('emails')
      .exists().bail().withMessage(messageTemplate.notExistingField('emails'))
      .isArray().bail().withMessage(messageTemplate.notArrayField('emails'))
      .notEmpty().bail().withMessage(messageTemplate.emptyField('emails')),
    body('emails.*')
      .isString().bail().withMessage(messageTemplate.notStringField())
      .notEmpty().bail().withMessage(messageTemplate.emptyField())
    ]

  emailTemplateId = bodyTemplate.existingNotEmptyStringField('emailTemplateId')
}

class ParamValidator {
  id = paramTemplate.existingNotEmptyStringField('id')
}

module.exports = new EmailListValidator()
