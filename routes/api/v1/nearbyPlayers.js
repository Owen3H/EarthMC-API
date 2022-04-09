const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

var timeout = 10000

router.get("/:xPos/:zPos/:xBlocks/:zBlocks", async (req, res) => 
{
    var xBlocks = Number(req.params.xBlocks)
    var zBlocks = Number(req.params.zBlocks)
    if (!xBlocks) xBlocks = 500
    if (!zBlocks) zBlocks = 500

    var nearbyPlayers = await emc.getNearbyPlayers(Number(req.params.xPos), Number(req.params.zPos), xBlocks, zBlocks)
                                 .then(players => { return players }).catch(() => {})
    
    if (!nearbyPlayers) sendOk(res, [])
    else sendOk(res, nearbyPlayers)
})

function sendOk(res, data) {
    res.status(200).json(data).setTimeout(timeout)
}

module.exports = router