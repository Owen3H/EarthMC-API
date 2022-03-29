const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache"),
      cors = require('cors')
      
var cacheTimeout = 30000

const mergeById = (a1, a2) => a1.map(itm => ({...a2.find((item) => (item.name === itm.name) && item), ...itm}));

router.put('/', cors(), async function (req, res) 
{
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY) {
        var allPlayers = await emc.getAllPlayers().then(players => { return players }),
            players = req.body

        cache.put('players', mergeById(allPlayers, players), cacheTimeout)
        res.status(200).json(mergeById(allPlayers, players)).setTimeout(cacheTimeout)
    }
    else res.status(401).send("PUT request unauthorized!")
})

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