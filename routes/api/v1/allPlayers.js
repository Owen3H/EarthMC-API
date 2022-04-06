const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache"),
      cors = require('cors')
      
var timeout = 10000

const mergeById = (a1, a2) => a1.map(itm => ({...a2.find((item) => (item.name === itm.name) && item), ...itm}))

router.put('/', cors(), async function (req, res) 
{
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY) {
        var allPlayers = await emc.getAllPlayers().then(players => { return players }),
            players = req.body

        cache.put('players', mergeById(allPlayers, players))
        res.status(200).json(mergeById(allPlayers, players)).setTimeout(timeout)
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
        cache.put('players', allPlayers)
    }
})

router.get("/:playerName", async (req, res) => 
{
    var cachedPlayers = cache.get('players'),
        playerName = req.params.playerName.toLowerCase()

    if (cachedPlayers) {
        var player = cachedPlayers.find(p => p.name.toLowerCase() == playerName)

        if (!player) res.status(404).json("That player does not exist!")
        else res.status(200).json(player)
    } else {
        res.status(202).json("Players have not been cached yet.")
    }
})

module.exports = router