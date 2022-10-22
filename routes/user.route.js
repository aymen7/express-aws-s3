const
    express = require('express'),
    router = express.Router(),
    AsyncErrorWrapper = require('../utils/async-error-wrapper.util'),
    joiValidationWrapperMiddleware = require('../validators/middlewares/joi-validation-wrapper-middleware.validator'),
    { addUserValidatorSchema } = require('../validators/schemas/add-user-schema'),
    userController = require('../controllers/user.controller'),
    passport = require('../utils/passport.util'),
    singleFileUpload = require('../utils/single-file-upload.util')

router.post('/',
    [
        AsyncErrorWrapper(passport.verifyJwt()),
        joiValidationWrapperMiddleware(addUserValidatorSchema)
    ], AsyncErrorWrapper(userController.addUser))

router.patch('/profile-picture',
    [
        AsyncErrorWrapper(passport.verifyJwt()),
        AsyncErrorWrapper(singleFileUpload('/images/', ['image/png', 'image/jpeg'])),
    ], AsyncErrorWrapper(userController.updateProfilePicture))

module.exports = router