const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/:xPos/:zPos/:xBlocks/:zBlocks", async (req, res) => 
{
    var xBlocks = req.params.xBlocks
    var zBlocks = req.params.zBlocks
    if (!xBlocks) xBlocks = 500
    if (!zBlocks) zBlocks = 500

    var nearbyNations = await emc.getNearbyNations(Number(req.params.xPos), Number(req.params.zPos), Number(xBlocks), Number(zBlocks)).then(nations => { return nations })
    
    if (!nearbyNations) res.status(200).json([])
    else res.status(200).json(nearbyNations)
})

module.exports = router