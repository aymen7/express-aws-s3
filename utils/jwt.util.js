const
    jwt = require('jsonwebtoken'),
    { JWT_SECRET: secret } = require('../config/config'),
    { deepCloneObject } = require('./global.util')


const signToken = (user) => {
    return jwt.sign(deepCloneObject(user), secret)
}

const decodeToken = (bearerToken) => {
    const [bearer, token] = bearerToken.toString().split(' ')
    return jwt.decode(token, secret)
}

module.exports = {
    signToken,
    decodeToken
}
