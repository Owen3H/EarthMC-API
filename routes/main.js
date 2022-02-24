const express = require("express"),
      router = express.Router()

router.get('/', function(req, res) 
{
    res.sendFile(`${process.cwd()}/web/index.html`)
})

router.get('/invite', function(req, res) 
{
    res.sendFile(`${process.cwd()}/web/invite.html`)
})

module.exports = router