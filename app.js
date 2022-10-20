const express = require("express")
const passport = require('passport')

const app = express()

// load environment
const { PORT } = require('./config/config')

// db
const dbConnection = require('./startup/database.startup')
dbConnection()

//for the json limit
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Initialization of passport
app.use(passport.initialize())

// set-up routing
const router = express.Router()
require('./startup/route.startup')(router)

// use router
app.use('/', router)

// catch error
const appErrorHandler = require('./startup/catch-error.startup')
appErrorHandler(app)

// start the app
app.listen(PORT, () => console.log(`app started at ${PORT}`))

