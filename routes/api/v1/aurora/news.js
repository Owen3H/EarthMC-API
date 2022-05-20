const express = require("express"),
      router = express.Router(),
      cache = require("memory-cache"),
      cors = require('cors')

router.post("/", cors(), async (req, res) => {
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY) {
        var latestNews = req.body

        cache.put('aurora_news', latestNews)
        sendOk(res, latestNews)
    }
    else res.status(401).json("POST request unauthorized!")
})

router.get("/", async (req, res) => {
    var cachedLatestNews = cache.get('aurora_news')
    if (!cachedLatestNews) return sendErr(res)
        
    sendOk(res, cachedLatestNews)
})

function sendOk(res, data) {
    res.status(200).json(data).setTimeout(5000)
}

function sendErr(res) {
    res.status(503).json("News not cached yet, try again later.")
}

module.exports = router