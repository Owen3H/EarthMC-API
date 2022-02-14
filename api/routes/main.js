const express = require("express"),
      router = express.Router()

router.get('/', function(res) 
{
    res.sendFile(`${process.cwd()}/web/index.html`)
})

module.exports = router