const mongoose = require('mongoose')
const { DB_CONNECTION } = require('../config/config')

const connectToDb = () => {
    return mongoose.connect(DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = () => {
    // make the text bright
    console.log('\x1b[1m')
    connectToDb()
        .then(() => {
            // make the text green
            console.error('\x1b[32m')
            console.log('connection successful to DB')
        })
        .catch((err) => {
            // make the text red
            console.error('\x1b[31m')
            console.error(err)
        })
        .finally(() => console.log('\x1b[0m')) // reset console.log style to default

}