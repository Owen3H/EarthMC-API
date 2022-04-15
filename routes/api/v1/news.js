const express = require("express"),
      router = express.Router(),
      cache = require("memory-cache"),
      cors = require('cors')

router.post("/", cors(), async (req, res) => 
{
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY)
    {
        var latestNews = req.body

        cache.put('news', latestNews)
        sendOk(res, latestNews)
    }
    else res.status(401).json("POST request unauthorized!")
})

router.get("/", async (req, res) => 
{
    var cachedLatestNews = cache.get('news')

    if (cachedLatestNews) 
        return sendOk(res, cachedLatestNews)
        
    send204(res)
})

function sendOk(res, data) {
    res.status(200).json(data).setTimeout(5000)
}

function send204(res) {
    res.status(204).json("No news yet, try again later.")
}

module.exports = router