const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res) => {
    var onlinePlayers = await emc.Aurora.getOnlinePlayers(true).catch(() => {})
    if (!onlinePlayers) return res.status(500).json("An error occured fetching data, please try again.")
        
    res.status(200).json(onlinePlayers).setTimeout(5000)
})

router.get("/:playerName", async (req, res) => {
    var onlinePlayer = await emc.Aurora.getOnlinePlayer(req.params.playerName).catch(() => {})
    if (!onlinePlayer) return res.status(404).json("That player is offline or does not exist!" )

    if (onlinePlayer.name == "INVALID_PLAYER") res.status(404).json(onlinePlayer.message)
    else res.status(200).json(onlinePlayer).setTimeout(5000)
})

module.exports = router