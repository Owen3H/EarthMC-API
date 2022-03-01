const express = require("express"),
      router = express.Router(),
      cache = require("memory-cache"),
      cors = require('cors')

var timeout = 60000

require("dotenv").config()

// PUT = UPDATE
// POST = CREATE
// GET = READ

router.get('/', function (req, res) 
{
    var cachedAlliances = cache.get('alliances')

    if (cachedAlliances) {
        res.status(200).json(cachedAlliances)
        res.setTimeout(timeout)
    }
    else res.send("Alliances are not updated yet.")
})

router.put('/', cors(), function (req, res) 
{
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY)
    {
        var alliances = req.body

        console.log(alliances)
        cache.put('alliances', alliances)
        res.status(200).json(alliances).setTimeout(timeout)
    }
    else res.status(404).send("PUT request unauthorized!")
})

module.exports = router