const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache"),
      cacheTimeout = require("../..").cacheTimeout

router.get("/", async (req, res, next) => 
{
    var cachedTownless = cache.get(req.url)
    if (cachedTownless) {
        res.status(200).json(cachedTownless)
    } else {
        var townlessPlayers = await emc.getTownless().then(townless => { return townless })

        res.status(200).json(townlessPlayers)
        cache.put(req.url, townlessPlayers, cacheTimeout)
    }
})

module.exports = router