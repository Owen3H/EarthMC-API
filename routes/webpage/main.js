const express = require("express"),
      router = express.Router()
      
router.get('/', function(req, res) {
    res.sendFile(`${process.cwd()}/web/index.html`)
})

router.get('/.well-known/pki-validation/9EEA9B71D23DC79A6C31617A1961A9F3.txt', function(req, res) {
    res.sendFile(`${process.cwd()}/web/static/ssl.txt`)
})

module.exports = router