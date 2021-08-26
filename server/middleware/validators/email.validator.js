const messageTemplate = require('./templates/message.template')
const bodyTemplate = require('./templates/body.template')
const {body} = require('express-validator')

class EmailValidator {
    validateEmail =
      bodyTemplate.email()

    validateMaybeExistingTags = [
      body('tags')
        .if(body('tags').exists())
        .isArray().bail().withMessage(messageTemplate.notArrayField('tags'))
        .notEmpty().bail().withMessage(messageTemplate.emptyField('tags')),
      body('tags.*')
        .if(body('tags').exists())
        .exists().bail().withMessage(messageTemplate.notExistingField())
        .isString().bail().withMessage(messageTemplate.notStringField())
        .notEmpty().bail().withMessage(messageTemplate.emptyField())
    ]

    validateExistingTags = [
      body('tags')
        .exists().bail().withMessage(messageTemplate.notExistingField('tags'))
        .isArray().bail().withMessage(messageTemplate.notArrayField('tags'))
        .notEmpty().bail().withMessage(messageTemplate.emptyField('tags')),
      body('tags.*')
        .exists().bail().withMessage(messageTemplate.notExistingField())
        .isString().bail().withMessage(messageTemplate.notStringField())
        .notEmpty().bail().withMessage(messageTemplate.emptyField())
      ]
}


module.exports = new EmailValidator()