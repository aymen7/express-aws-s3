const AppError = require('../utils/app-error.util')

module.exports = (app) => {
    app.use((err, req, res, next) => {
        console.log({ err })
        const statusCode = err instanceof AppError ? err.status : 500

        return res.status(statusCode).json({
            message: err.message
        })
    })
}