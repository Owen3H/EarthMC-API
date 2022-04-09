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

    var nearbyTowns = await emc.getNearbyTowns(Number(req.params.xPos), Number(req.params.zPos), xBlocks, zBlocks)
                               .then(towns => { return towns }).catch(() => {})
    
    if (!nearbyTowns) res.status(200).json([])
    else res.status(200).json(nearbyTowns).setTimeout(timeout)
})

module.exports = router