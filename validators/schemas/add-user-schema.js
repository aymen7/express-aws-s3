const Joi = require('joi')

const addUserValidatorSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

module.exports = {
    addUserValidatorSchema
}