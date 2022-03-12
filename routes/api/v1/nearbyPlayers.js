const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/:xPos/:zPos/:xBlocks/:zBlocks", async (req, res) => 
{
    var xBlocks = req.params.xBlocks
    var zBlocks = req.params.zBlocks
    if (!xBlocks) xBlocks = 500
    if (!zBlocks) zBlocks = 500

    var nearbyPlayers = await emc.getNearbyPlayers(Number(req.params.xPos), Number(req.params.zPos), Number(xBlocks), Number(zBlocks))
                                 .then(players => { return players })
                                 .catch(() => {})
    
    if (!nearbyPlayers) sendOk(res, [])
    else sendOk(res, nearbyPlayers)
})

function sendOk(res, data)
{
    res.status(200).json(data)
}

module.exports = router