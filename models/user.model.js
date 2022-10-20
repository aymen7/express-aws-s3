const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    AppError = require('../utils/app-error.util'),
    { Schema } = mongoose

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: false,
        default: ''
    },
    isArchived: {
        type: Boolean,
        required: false,
        default: false
    },
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
    try {
        const user = this

        // make sure to transform the email to lowercase
        user.email = user.email.toString().toLowerCase()

        // hash the password
        if (user.isNew || user.isModified('password')) {
            // generate salt
            const salt = await bcrypt.genSalt(10)

            // hash the password
            const hash = await bcrypt.hash(user.password, salt)

            // assign the hash to the user password
            user.password = hash
        }

        next()
    } catch (error) {
        next(new AppError(error.message, error.status || 500))
    }

})

UserSchema.methods.comparePassword = function (pwd, cb) {
    bcrypt.compare(pwd, this.password, (err, isMatch) => {
        if (err)
            return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)