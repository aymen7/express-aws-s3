const
    userService = require("../services/user.service"),
    AppError = require("../utils/app-error.util")

const addUser = async (req, res) => {
    const { body } = req
    //console.log({res})
    // check if email exist already
    const user = await userService.getOneByQuery({ email: body.email })
    if (user)
        throw new AppError('email already exists, try resetting your password !', 409)

    // create user
    const newUser = await userService.addUser(body)
    if (!newUser)
        throw new AppError('error inserting the user !', 500)

    return res.status(201).json({ msg: `Successfully added the user with the _id: ${newUser._id}` })
}

module.exports = {
    addUser
}