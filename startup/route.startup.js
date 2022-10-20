const
    indexRouter = require('../routes/index.route'),
    userRouter = require('../routes/user.route'),
    authRouter = require('../routes/auth.route')

module.exports = (router) => {
    router.use('/', indexRouter)
    router.use('/auth', authRouter)
    router.use('/users', userRouter)
}