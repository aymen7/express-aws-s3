const
    express = require('express'),
    router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('Welcome to AWS S3 API')
})

module.exports = router