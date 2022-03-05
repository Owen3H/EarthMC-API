const express = require("express"),
      router = express.Router(),
      cache = require("memory-cache"),
      cors = require('cors')

var timeout = 20000

require("dotenv").config()

router.post("/", cors(), async (req, res) => 
{
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY)
    {
        var latestNews = req.body

        cache.put('news', latestNews)
        sendOk(res, latestNews)
    }
    else send401(res)
})

router.get("/", async (req, res) => 
{
    var cachedLatestNews = cache.get('news')

    if (cachedLatestNews) sendOk(res, cachedLatestNews)
    else send202(res)
})

function sendOk(res, data)
{
    res.status(200).json(data).setTimeout(timeout)
}

function send202(res)
{
    res.status(202).send("Alliances being initialized, try again later.")
}

function send401(res)
{
    res.status(401).send("POST request unauthorized!")
}