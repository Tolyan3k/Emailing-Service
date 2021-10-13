const ApiException = require('../exceptions/api.exception')
const UserModel = require('../models/user.model')
const tokenService = require('./token.service')
const mailService = require('./mail.service')
const UserDto = require('../dtos/user.dto')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
require('dotenv').config()

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({email})
    if (candidate) {
      throw ApiException.BadRequest('Пользователь с почтовым адресом ' + email + ' уже существует')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const activationLink = await uuid.v4()
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const user = await UserModel.create({email, password: hashedPassword, activationLink})
    const userDto = new UserDto(user)

    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async login(email, password) {
    const user = await UserModel.findOne({email})
    if (!user) {
      throw ApiException.BadRequest(`Пользователь с почтой ${email} не найден`)
    }

    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiException.BadRequest('Неверный пароль')
    }

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken)
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({activationLink})
    if (!user) {
      throw ApiException.BadRequest('Некорректная ссылка активации')
    }

    user.isActivated = true
    user.save()
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiException.UnauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findRefreshToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiException.UnauthorizedError()
    }

    const user = await UserModel.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, user: userDto }
  }

  async getUsers() {
    const users = await UserModel.find()
    for (let i = 0; i < users.length; i++) {
      users[i] = new UserDto(users[i])
    }

    return users
  }
}

module.exports = new UserService()