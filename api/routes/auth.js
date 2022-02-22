const express = require("express"),
      router = express.Router()

router.get('/', function(req, res) 
{
    res.sendFile(`${process.cwd()}/web/827593ADDAAF607A3E2FD65FC3FAF43E.txt`)
})

module.exports = router