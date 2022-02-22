const express = require("express"),
      router = express.Router()

router.get("/", async (req, res) => 
{
    res.redirect('onlinePlayers')
})

router.get("/:onlinePlayer", async (req, res) => 
{
    res.redirect('../onlinePlayers/' + req.params.onlinePlayer)
})

module.exports = router