const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

var cacheTimeout = 30000

router.get("/", async (req, res) => 
{
    var cachedTownless = cache.get('townless')
    if (cachedTownless) res.status(200).json(cachedTownless)
    else {
        var townlessPlayers = await emc.getTownless().then(townless => { return townless }).catch(() => {})
        if (!townlessPlayers || !canJSON(townlessPlayers)) return sendOk(res, [])

        sendOk(res, townlessPlayers)
        cache.put('townless', townlessPlayers, cacheTimeout)
    }
})

function sendOk(res, data) {
    res.status(200).json(data).setTimeout(5000)
}

function canJSON(value) {
    try {
        JSON.stringify(value)
        return true
    } catch (ex) {
        return false
    }
}

module.exports = router