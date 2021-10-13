const TokenModel = require('../models/token.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1h'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({user: userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }

    return await TokenModel.create({user: userId, refreshToken});
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_KEY)
      return userData
    } catch (e) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY)
      return userData
    } catch (e) {
      return null
    }
  }

  async findRefreshToken(refreshToken) {
    const tokenData = await TokenModel.findOne({refreshToken})
    return tokenData
  }

  async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({refreshToken})
    return tokenData
  }
}

module.exports = new TokenService()