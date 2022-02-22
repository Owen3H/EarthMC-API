const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

var cacheTimeout = 30000

router.get("/", async (req, res) => 
{
    var cachedPlayers = cache.get('players')
    if (cachedPlayers) {
        res.status(200).json(cachedPlayers)
    } else {
        var allPlayers = await emc.getAllPlayers().then(players => { return players })

        res.status(200).json(allPlayers)
        cache.put('players', allPlayers, cacheTimeout)
    }
})

router.get("/:playerName", async (req, res) => 
{
    var cachedPlayer = cache.get(req.url)
    if (cachedPlayer) {
        res.status(200).json(cachedPlayer)
    } else {
        var playerName = req.params.playerName,
        foundPlayer = await emc.getPlayer(playerName).then(player => { return player })

        if (!foundPlayer) res.status(404).json("That player does not exist!")
        else {
            res.status(200).json(foundPlayer)
            cache.put(req.url, foundPlayer, cacheTimeout)
        }
    }
})

module.exports = router