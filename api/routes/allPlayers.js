const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var allPlayers = await emc.getAllPlayers().then(players => { return players })

    res.status(200).json(allPlayers)
})

router.get("/:playerName", async (req, res, next) => 
{
    var playerName = req.params.playerName
    var foundPlayer = await emc.getPlayer(playerName).then(players => { return players })

    if (!foundPlayer) res.status(404).json("That player does not exist!")
    else res.status(200).json(foundPlayer)   
})

module.exports = router