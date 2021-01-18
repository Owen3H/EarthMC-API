const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var onlinePlayers = await emc.getOnlinePlayers(true).then(players => { return players })

    res.status(200).json(onlinePlayers)
})

router.get("/:onlinePlayer", async (req, res, next) => 
{
    var onlinePlayer = await emc.getOnlinePlayer(req.params.onlinePlayer).then(player => { return player })

    if (onlinePlayer.name == "INVALID_PLAYER") res.status(404).json(onlinePlayer.message)
    else res.status(200).json(onlinePlayer)
})

module.exports = router