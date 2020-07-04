const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var onlinePlayers = await emc.getOnlinePlayers().then(players => { return players })

    res.status(200).json(onlinePlayers)
})

router.get("/:onlinePlayer", async (req, res, next) => 
{
    var onlinePlayerName = req.params.onlinePlayer
    var onlinePlayers = await emc.getOnlinePlayers().then(players => { return players })

    var foundPlayer = onlinePlayers.find(p => p.name.toLowerCase() == onlinePlayerName.toLowerCase())

    if (!foundPlayer) res.status(200).json("That player is not online or does not exist!")
    else res.status(200).json(foundPlayer)
})

module.exports = router;