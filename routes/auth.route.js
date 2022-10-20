const
    express = require('express'),
    router = express.Router(),
    AsyncErrorWrapper = require('../utils/async-error-wrapper.util'),
    joiValidationWrapperMiddleware = require('../validators/middlewares/joi-validation-wrapper-middleware.validator'),
    { loginValidatorSchema } = require('../validators/schemas/login-schema.validator'),
    authController = require('../controllers/auth.controller')


router.post('/login', joiValidationWrapperMiddleware(loginValidatorSchema), AsyncErrorWrapper(authController.login))

module.exports = router