const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache"),
      cors = require('cors')
      
var timeout = 15000

const mergeByName = (a1, a2) => a1.map(itm => ({...a2.find((item) => (item.name === itm.name) && item), ...itm}))

router.put('/', cors(), async function (req, res) 
{
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY) {
        var allPlayers = await emc.AuroragetAllPlayers().then(players => { return players }),
            players = req.body

        if (!allPlayers) return sendError(res)

        var output = mergeByName(allPlayers, players)

        cache.put('players', output)
        res.status(200).json(output).setTimeout(timeout)
    }
    else res.status(401).send("PUT request unauthorized!")
})

router.get("/", async (req, res) => 
{
    var cachedPlayers = cache.get('players')
    if (cachedPlayers) res.status(200).json(cachedPlayers)
    else res.status(204).json("Players have not been cached yet.")
})

router.get("/:playerName", async (req, res) => 
{
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