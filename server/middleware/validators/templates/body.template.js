const messageTemplate = require('./message.template')
const {body} = require('express-validator')

class BodyTemplate {
  email() {
    return ([
      body('email')
        .exists().bail().withMessage(messageTemplate.notExistingField('email'))
        .isString().bail().withMessage(messageTemplate.notStringField('email'))
        .notEmpty().bail().withMessage(messageTemplate.emptyField('email'))
        .isEmail().withMessage('Введённый текст не является электронной почтой')
    ])
  }

  password() {
    return (
      body('password')
        .exists().bail().withMessage(messageTemplate.notExistingField('password'))
        .isString().bail().withMessage(messageTemplate.notStringField('password'))
        .trim()
        .notEmpty().bail().withMessage(messageTemplate.emptyField('password'))
        .isLength({min: process.env.PASSWORD_MIN_LENGTH, max: process.env.PASSWORD_MAX_LENGTH}).bail()
          .withMessage(`Пароль должен быть длиной от ${process.env.PASSWORD_MIN_LENGTH} `
            + `до ${process.env.PASSWORD_MAX_LENGTH} включительно`)
        .matches('[^\s]*').bail().withMessage("Пароль не должен содержать пробельные символы")
    )
  }

  existingField(fieldName) {
    return (
      body(fieldName)
        .exists().bail().withMessage(messageTemplate.notExistingField(fieldName))
    )
  }

  existingStringField(fieldName) {
    return (
      body(fieldName)
        .exists().bail().withMessage(messageTemplate.notExistingField(fieldName))
        .isString().bail().withMessage(messageTemplate.notStringField(fieldName))
    )
  }

  maybeExistingStringField(fieldName) {
    return (
      body(fieldName)
        .if(body(fieldName).exists())
        .isString().bail().withMessage(messageTemplate.notStringField(fieldName))
    )
  }

  maybeExistingNotEmptyStringField(fieldName) {
    return (
      body(fieldName)
        .if(body(fieldName).exists)
        .notEmpty().bail().withMessage(messageTemplate.emptyField(fieldName))
        .isString().bail().withMessage(messageTemplate.notStringField(fieldName))
    )
  }

  existingNotEmptyStringField(fieldName) {
    return (
      body(fieldName)
        .exists().bail().withMessage(messageTemplate.notExistingField(fieldName))
        .notEmpty().bail().withMessage(messageTemplate.emptyField(fieldName))
        .isString().bail().withMessage(messageTemplate.notStringField(fieldName))
    )
  }
}

module.exports = new BodyTemplate()