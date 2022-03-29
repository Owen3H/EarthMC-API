const express = require("express"),
      router = express.Router()

router.get('/', function(req, res) 
{
    res.sendFile(`${process.cwd()}/web/map.html`)
})

router.use('/static', express.static(`${process.cwd()}/web/static`))

module.exports = router