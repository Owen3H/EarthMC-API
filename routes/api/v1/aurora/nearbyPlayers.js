const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

var timeout = 10000

router.get("/:xPos/:zPos/:xBlocks/:zBlocks", async (req, res) => 
{
    var xPos = Number(req.params.xPos), zPos = Number(req.params.zPos)
    if (!xPos || !zPos) return res.status(400).json([])

    var xBlocks = Number(req.params.xBlocks), zBlocks = Number(req.params.zBlocks)
    if (!xBlocks) xBlocks = 500
    if (!zBlocks) zBlocks = 500

    var nearbyPlayers = await emc.Aurora.getNearbyPlayers(xPos, zPos, xBlocks, zBlocks).catch(() => {})      
    if (!nearbyPlayers) return sendError(res)
    
    sendOk(res, nearbyPlayers)
})

function sendOk(res, data) {
    res.status(200).json(data).setTimeout(timeout)
}

function sendError(res) {
    res.status(500).json("An error occured fetching data, please try again.")
}

module.exports = router