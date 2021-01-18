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

router.get("/:townName/joinable", async (req, res, next) => 
{
    var townName = req.params.townName
    var invitableNationsRes = await emc.getJoinableNations(townName).then(nations => { return nations })

    if (invitableNationsRes == "That nation does not exist!") res.status(404).json(invitableNationsRes)
    else res.status(200).json(invitableNationsRes)
})


module.exports = router