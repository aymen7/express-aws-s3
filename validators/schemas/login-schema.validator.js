const Joi = require('joi')

const loginValidatorSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

module.exports = {
    loginValidatorSchema
}