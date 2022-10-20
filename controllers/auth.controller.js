const
    userService = require("../services/user.service"),
    AppError = require("../utils/app-error.util"),
    { signToken } = require("../utils/jwt.util")


const login = async (req, res, next) => {
    // body = { email, password }
    const { body } = req

    // check if user exist
    const user = await userService.getOneByQuery({ email: { '$eq': body.email.toLowerCase() } })
    if (!user)
        throw new AppError('Authentication failed. User not found.', 401)

    // compare password
    const isMatch = await userService.comparePassword(user, body)
    if (!isMatch)
        throw new AppError('Authentication failed. User not found.', 401)

    // sign the JWT token
    const { password, isArchived, ...objToDecode } = user.toObject() // .toObject() is used to map the mongoose doc to a plain js object
    const token = signToken(objToDecode)

    return res.status(200).json({ token })
}

module.exports = {
    login
}