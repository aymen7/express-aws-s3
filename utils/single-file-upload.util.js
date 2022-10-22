const {uploadConfiguration, multerDelay} = require("../services/multer.service")

/**
 * 
 * @param {*} dest destination folder inside the /tmp
 * @param {*} whitelist list of extensions which are allowed to be uploaded
 * @returns 
 */
module.exports = (dest, whitelist, name = 'file') => {
    return async (req, res, next) => {
        // get the upload config obj
        const upload = uploadConfiguration(dest, whitelist)

        // call the upload.single
        upload.single(name)(req, res, next)

        // make sur we wait for the upload to finish to solve the req.file is undefined
        //await multerDelay()
        //next()
    }
}
