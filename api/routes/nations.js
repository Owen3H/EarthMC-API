const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var nations = await emc.getNations().then(nations => { return nations })

    res.status(200).json(nations)
})

router.get("/:nationName", async (req, res, next) => 
{
    var nationName = req.params.nationName
    var nations = await emc.getNations().then(nations => { return nations })

    var foundNation = nations.find(nation => nation.name.toLowerCase() == nationName.toLowerCase())

    if (!foundNation) res.status(404).json("That nation does not exist!")
    else res.status(200).json(foundNation)   
})

module.exports = router