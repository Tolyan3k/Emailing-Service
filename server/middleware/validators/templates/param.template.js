const messageTemplate = require('./message.template')
const {param} = require('express-validator')

class ParamTemplate {
  existingStringField(fieldName) {
    return (
      param(fieldName)
        .exists().bail().withMessage(messageTemplate.notExistingField(fieldName))
        .isString().bail().withMessage(messageTemplate.notStringField(fieldName))
    )
  }

  existingNotEmptyStringField(fieldName) {
    return (
      param(fieldName)
        .exists().bail().withMessage(messageTemplate.notExistingField(fieldName))
        .notEmpty().bail().withMessage(messageTemplate.emptyField(fieldName))
        .isString().bail().withMessage(messageTemplate.notStringField(fieldName))
    )
  }
}

module.exports = new ParamTemplate()