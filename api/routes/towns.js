const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var towns = await emc.getTowns().then(towns => { return towns })

    res.status(200).json(towns)
})

router.get("/:townName", async (req, res, next) => 
{
    var townName = req.params.townName
    var foundTown = await emc.getTown(townName).then(town => { return town })

    if (!foundTown) res.status(404).json("That town does not exist!")
    else res.status(200).json(foundTown)
})

module.exports = router;