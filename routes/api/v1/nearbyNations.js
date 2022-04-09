const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

var timeout = 30000

router.get("/:xPos/:zPos/:xBlocks/:zBlocks", async (req, res) => 
{
    var xBlocks = Number(req.params.xBlocks)
    var zBlocks = Number(req.params.zBlocks)
    if (!xBlocks) xBlocks = 500
    if (!zBlocks) zBlocks = 500

    var nearbyNations = await emc.getNearbyNations(Number(req.params.xPos), Number(req.params.zPos), xBlocks, zBlocks)
                                 .then(nations => { return nations }).catch(() => {})
    
    if (!nearbyNations) res.status(200).json([])
    else res.status(200).json(nearbyNations).setTimeout(timeout)
})

module.exports = router