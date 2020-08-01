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
    var resident = await emc.getResident(req.params.residentName).then(resident => { return resident })

    if (!resident) res.status(404).json("That resident does not exist!")
    else res.status(200).json(resident)
})

module.exports = router