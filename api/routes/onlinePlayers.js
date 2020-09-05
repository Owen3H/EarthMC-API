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
    var onlinePlayer = await emc.getOnlinePlayer(req.params.onlinePlayer).then(player => { return player })

    if (!onlinePlayer) res.status(200).json("That player is not online or does not exist!")
    else res.status(200).json(onlinePlayer)
})

router.get("/:onlinePlayer/nearby/:xBlocks?/:zBlocks?", async (req, res, next) => 
{
    var playerName = req.params.onlinePlayer;
    var x = req.params.xBlocks;
    var z = req.params.zBlocks;

    var nearbyPlayers = []

    if (!x || !z) nearbyPlayers = await emc.getNearby(playerName, 500, 500).then(players => { return players })
    else nearbyPlayers = await emc.getNearby(playerName, Number(x), Number(z)).then(players => { return players })

    if (!nearbyPlayers) res.status(200).json([])
    else res.status(200).json(nearbyPlayers)
})

module.exports = router