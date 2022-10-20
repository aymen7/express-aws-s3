const
    dotenv = require('dotenv'),
    path = require('path'),
    NODE_ENV = process.env.NODE_ENV

// load the right variables
dotenv.config({ path: path.join(__dirname, 'env', `.env.${NODE_ENV}`) })

module.exports = {
    NODE_ENV,
    AWS_PUBLIC_KEY: process.env.AWS_PUBLIC_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_CONNECTION: process.env.DB_CONNECTION,
}