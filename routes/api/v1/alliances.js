const res = require("express/lib/response")

const express = require("express"),
      router = express.Router()

require("dotenv").config()

// PUT = UPDATE
// POST = CREATE
// GET = READ

router.put('/', function (req, res) 
{
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY)
    {
        var alliances = req.body
        res.status(200).json(alliances)
    }
})

router.get('/', function (req, res)
{
    res.status(200)
})

module.exports = router;