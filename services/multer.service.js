const
    path = require('path'),
    multer = require('multer'),
    { TMP_STORAGE: tmpStorage } = require('../config/config'),
    AppError = require('../utils/app-error.util'),
    mkdirp = require('mkdirp')

const uploadConfiguration = (dest, whitelist) => {
    // storage 
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            // set the directory 
            const dir = `${tmpStorage}${dest}`
            mkdirp.sync(dir)
            cb(null, dir)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },

    })

    // upload filter
    const uploadFilter = (req, file, cb) => {

        if (!whitelist.includes(file.mimetype)) {
            return cb(new AppError('file type is not allowed', 400), false)
        }
        // make this to solve problem with req.file is undefined in the following middleware
        req.file = file
        cb(null, true)
    }

    return multer({
        storage: storage,
        fileFilter: uploadFilter
    })
}

/**
 * 
 * @returns promise that resolve after the queue is clear
 */
const multerDelay = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 0))
} 

module.exports = {
    uploadConfiguration,
    multerDelay
}