const express = require("express"),
      router = express.Router()

router.get("/", async (req, res) => 
{
    res.redirect('allPlayers')
})

router.get("/:playerName", async (req, res) => 
{
    res.redirect('../allPlayers/' + req.params.playerName)
})

module.exports = router