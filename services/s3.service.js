const
    S3 = require('aws-sdk/clients/s3'),
    {
        AWS_BUCKET_NAME: Bucket,
        AWS_PUBLIC_KEY: accessKeyId,
        AWS_REGION: region,
        AWS_SECRET_KEY: secretAccessKey,
        TMP_STORAGE
    } = require('../config/config'),
    fs = require('fs')

/**
 * 
 * @returns return a new S3 object
 */
const initClient = () => {
    return new S3({
        region,
        accessKeyId,
        secretAccessKey
    })
}

/**
 * 
 * @param {*} file file uploaded 
 * @returns the upload result as a promise
 */
const uploadFileToBucket = (file) => {
    const s3 = initClient()

    // turn file to fileStream
    const fileStream = fs.createReadStream(file.path)

    // get the full dest path to store it as a folder in S3
    const Key = file.path.split('/').filter(word => !TMP_STORAGE.includes(word)).join('/')
    // prepare the upload params
    const params = {
        Bucket,
        Body: fileStream,
        Key
    }
    // upload the obj
    return s3.upload(params).promise()
}

module.exports = {
    uploadFileToBucket
}