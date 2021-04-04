const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

router.get("/", async (req, res, next) => 
{
    var cachedTownless = cache.get(req.url)
    if (cachedTownless) {
        res.status(200).json(cachedTownless)
    } else {
        var townlessPlayers = await emc.getTownless().then(townless => { return townless })

        res.status(200).json(townlessPlayers)
        cache.put(req.url, townlessPlayers, 60*1000)
    }
})

module.exports = router