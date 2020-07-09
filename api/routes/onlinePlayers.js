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

module.exports = router