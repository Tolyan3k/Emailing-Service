const {createTransport} = require('nodemailer')
require('dotenv').config()

class MailService {
  constructor() {
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта ' + process.env.API_URL,
      text: '',
      html:
        `
          <div>
            <h1>Для активации почты ${to} перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `
    })
  }

  async sendMail(to, {title, header, main, footer}) {
    return this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: title,
      text: [header, main, footer].join('\n\n'),
      html: ''
    })
  }
}

module.exports = new MailService()