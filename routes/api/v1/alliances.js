const express = require("express"),
      router = express.Router(),
      cache = require("memory-cache")

var cacheTimeout = 30000

require("dotenv").config()

// PUT = UPDATE
// POST = CREATE
// GET = READ

router.get('/', function (req, res) 
{
    var cachedAlliances = cache.get('alliances')
    res.setTimeout(cacheTimeout)

    if (cachedAlliances) {
        res.status(200).json(cachedAlliances)
    } else {
        res.status(200).send('No alliances found, wait for an update.')
    }
})

router.put('/', function (req, res) 
{
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY)
    {
        var alliances = req.body

        cache.put('alliances', alliances, cacheTimeout)

        res.setTimeout(cacheTimeout)
        res.status(200).json(alliances)
    }
    else res.status(404).send("PUT request unauthorized!")
})

module.exports = router