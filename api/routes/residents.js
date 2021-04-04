const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

router.get("/", async (req, res, next) => 
{
    var cachedResidents = cache.get(req.url)
    if (cachedResidents) {
        res.status(200).json(cachedResidents)
    } else {
        var residents = await emc.getResidents().then(residents => { return residents })

        res.status(200).json(residents)
        cache.put(req.url, residents, 60*1000)
    }
})

router.get("/:residentName", async (req, res, next) => 
{
    var cachedResident = cache.get(req.url)
    if (cachedResident) {
        res.status(cachedResident.code).json(cachedResident.resident)
    } else {
        var resident = await (await emc.getResidents().then(resident => { return resident })).find(resident => resident.name.toLowerCase() == req.params.residentName.toLowerCase())
        console.log(resident)

        if (!resident) {
            res.status(404).json("That resident does not exist!")
            cache.put(req.url, {
                code: 404,
                resident: "That resident does not exist!"
            }, 60*1000)
        } else {
            res.status(200).json(resident)
            cache.put(req.url, {
                code: 200,
                resident: resident
            }, 60*1000)
        }
    }
})

module.exports = router