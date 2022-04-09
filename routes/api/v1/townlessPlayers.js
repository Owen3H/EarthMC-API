const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

var cacheTimeout = 10000

router.get("/", async (req, res) => 
{
    var cachedTownless = cache.get('townless')
    if (cachedTownless) {
        res.status(200).json(cachedTownless)
    } else {
        var townlessPlayers = await emc.getTownless().then(townless => { return townless })

        res.status(200).json(townlessPlayers)
        cache.put('townless', townlessPlayers, cacheTimeout)
    }
})

module.exports = router