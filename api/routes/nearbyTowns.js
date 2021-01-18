const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/:xPos/:zPos/:xBlocks/:zBlocks", async (req, res, next) => 
{
    var xBlocks = req.params.xBlocks
    var zBlocks = req.params.zBlocks
    if (!xBlocks) xBlocks = 500
    if (!zBlocks) zBlocks = 500

    var nearbyTowns = await emc.getNearbyTowns(Number(req.params.xPos), Number(req.params.zPos), Number(xBlocks), Number(zBlocks)).then(towns => { return towns })
    
    if (!nearbyTowns) res.status(200).json([])
    else res.status(200).json(nearbyTowns)
})

module.exports = router