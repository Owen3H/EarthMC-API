const express = require("express"),
      router = express.Router()

router.get('/', function(req, res) {
    res.redirect('https://emc-toolkit.vercel.app/docs')
})

router.get('/invite', function(req, res) {
    res.redirect('https://emc-toolkit.vercel.app/invite')
})

module.exports = router