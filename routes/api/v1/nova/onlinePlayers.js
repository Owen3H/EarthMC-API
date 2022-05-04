const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res) => 
{
    var onlinePlayers = await emc.Nova.getOnlinePlayers(true).then(players => { return players }).catch(() => {})

    if (!onlinePlayers) 
        return res.status(500).json("An error occured fetching data, please try again.")
        
    res.status(200).json(onlinePlayers).setTimeout(5000)
})

router.get("/:onlinePlayer", async (req, res) => 
{
    var onlinePlayer = await emc.Nova.getOnlinePlayer(req.params.onlinePlayer).then(player => { return player }).catch(() => {})

    if (onlinePlayer.name == "INVALID_PLAYER") res.status(404).json(onlinePlayer.message)
    else res.status(200).json(onlinePlayer).setTimeout(5000)
})

module.exports = router