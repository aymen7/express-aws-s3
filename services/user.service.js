const User = require('../models/user.model')

const getOneByQuery = async (query, select) => {
    return !select ? await User.findOne({ ...query, isArchived: false }) : await User.findOne({ ...query, isArchived: false }).select(select)
}

const comparePassword = (user, body) => {
    const { password } = body
    return new Promise(resolve => {
        user.comparePassword(password, (err, isMatch) => resolve(!err && isMatch))
    })
}

const addUser = async (doc) => {
    return await User.create(doc)
}

module.exports = {
    getOneByQuery,
    comparePassword,
    addUser
}