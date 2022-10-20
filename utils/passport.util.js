const AppError = require("./app-error.util")
const { decodeToken } = require("./jwt.util")
const userService = require('../services/user.service')

const verifyJwt = () => {
    return async (req, res, next) => {

        const { authorization: bearerToken } = req.headers
        if (!bearerToken)
            throw new AppError('Not Authorized to perform this action !', 401)

        // decode the token and get the _id from the payload
        const { _id } = decodeToken(bearerToken)

        // check if the user exist in our DB
        const user = await userService.getOneByQuery(_id)
        if (!user)
            throw new AppError('Not Authorized to perform this action !', 401)

        // assign the user to req.user
        req.user = user

        next()

    }
}

module.exports = {
    verifyJwt
}