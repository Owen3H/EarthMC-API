const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

var cacheTimeout = 10000

router.get("/", async (req, res) => 
{
    var cachedTownless = cache.get('townless')
    if (cachedTownless) sendOk(res, cachedTownless)
    else {
        var townlessPlayers = await emc.Nova.getTownless().then(townless => { return townless }).catch(() => {})
        if (!townlessPlayers) return sendError(res)

        cache.put('townless', townlessPlayers, cacheTimeout)
        sendOk(res, townlessPlayers)
    }
})

function sendOk(res, data) {
    res.status(200).json(data).setTimeout(5000)
}

function sendError(res) {
    res.status(500).json("An error occured fetching data, please try again.")
}

module.exports = router