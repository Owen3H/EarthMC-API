const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var residents = await emc.getResidents().then(residents => { return residents })

    res.status(200).json(residents)
})

router.get("/:residentName", async (req, res, next) => 
{
    var residentName = req.params.residentName
    var residents = await emc.getResidents().then(residents => { return residents })

    var foundResident = residents.find(r => r.name.toLowerCase() == residentName.toLowerCase())

    if (!foundResident) res.status(200).json("That resident does not exist!")
    else res.status(200).json(foundResident)
})

module.exports = router;