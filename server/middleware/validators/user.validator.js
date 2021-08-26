const bodyTemplate = require('./templates/body.template')

class UserValidator {
  validateRegistration = [
    bodyTemplate.email(),
    bodyTemplate.password(),
  ]

  validateLogin = this.validateRegistration
}

module.exports = new UserValidator()
