const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache"),
      cors = require('cors')
      
var timeout = 15000

const mergeByName = (a1, a2) => a1.map(itm => ({...a2.find((item) => (item.name === itm.name) && item), ...itm}))
const mergeNoDupes = (a1, a2, prop) => a1.reduce((c, v) => c.concat(c.some(e => e[prop] == v[prop]) ? [] : [v]), a2)

router.put('/', cors(), async (req, res) => {
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY) {
        var players = req.body,
            novaPlayers = await emc.Nova.getAllPlayers().catch(console.error)
            auroraPlayers = await emc.Aurora.getAllPlayers().catch(console.error)

        if (!novaPlayers || !auroraPlayers) return sendError(res)

        var allPlayers = mergeNoDupes(auroraPlayers, novaPlayers, 'name'), // Create an array from both maps with only unique players.
            output = mergeByName(allPlayers, players) // Add db info by merging the request body.

        cache.put('players', output)
        res.status(200).json(output).setTimeout(timeout)
    }
    else res.status(401).send("PUT request unauthorized!")
})

router.get("/", async (req, res) => {
    var cachedPlayers = cache.get('players')
    if (cachedPlayers) res.status(200).json(cachedPlayers)
    else res.status(204).json("Players have not been cached yet.")
})

router.get("/:playerName", async (req, res) => {
    var cachedPlayers = cache.get('players'),
        playerName = req.params.playerName.toLowerCase()

    if (cachedPlayers) {
        var player = cachedPlayers.find(p => p.name.toLowerCase() == playerName)

        if (!player) res.status(404).json("That player does not exist!")
        else res.status(200).json(player).setTimeout(timeout)
    } 
    else res.status(204).json("Players have not been cached yet.")
})

function sendError(res) {
    res.status(500).json("An error occured fetching data, please try again.")
}

module.exports = router