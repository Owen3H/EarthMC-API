const express = require("express"),
      router = express.Router()

require("dotenv").config()

// PUT = UPDATE
// POST = CREATE
// GET = READ

router.get('/', function (req, res) 
{
    res.status(200)
})

router.put('/', function (req, res) 
{
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY)
    {
        var alliances = req.body

        res.setTimeout(60000)
        res.status(200).json(alliances)
    }
    else res.status(404).send("PUT request unauthorized!")
})

module.exports = router