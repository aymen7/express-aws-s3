const AppError = require("../../utils/app-error.util")

module.exports = (schema) => {
    return (req, res, next) => {
        const
            { body } = req,
            { error } = schema.validate(body)

        // error will be capture by the global express middleware
        if (error)
            throw new AppError(error.details[0].message, 400)

        next()

    }
}