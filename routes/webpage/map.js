const express = require("express"),
      router = express.Router()

router.get('/', function(req, res) 
{
    res.sendFile(`${process.cwd()}/web/map.html`)
})

router.use('/static', express.static(`${process.cwd()}/web/static`))
router.use('/js', express.static(`${process.cwd()}/web/js`))

module.exports = router