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

    var nearbyPlayers = await emc.getNearbyPlayers(xPos, zPos, xBlocks, zBlocks).then(players => { return players }).catch(() => {})      
    if (!nearbyPlayers || !canJSON(nearbyPlayers)) return sendOk(res, [])
    
    sendOk(res, nearbyPlayers)
})

function sendOk(res, data) {
    res.status(200).json(data).setTimeout(timeout)
}

function canJSON(value) {
    try {
        JSON.stringify(value)
        return true
    } catch (ex) {
        return false
    }
}

module.exports = router