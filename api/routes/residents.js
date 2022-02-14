const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

var cacheTimeout = 30000

router.get("/", async (req, res) => 
{
    var cachedResidents = cache.get('residents')

    if (cachedResidents) 
        res.status(200).json(cachedResidents)
    else 
    {
        var residents = await emc.getResidents().then(residents => { return residents })

        res.status(200).json(residents)
        cache.put('residents', residents, cacheTimeout)
    }
})

router.get("/:residentName", async (req, res) => 
{
    var cachedResident = cache.get(req.url)

    if (cachedResident) 
        res.status(cachedResident.code).json(cachedResident.resident)
    else 
    {
        var resident = await emc.getResident(req.params.residentName).then(resident => { return resident })

        if (!resident) 
        {
            res.status(404).json("That resident does not exist!")
            cache.put(req.url, 
            {
                code: 404,
                resident: "That resident does not exist!"
            }, cacheTimeout)
        } 
        else 
        {
            res.status(200).json(resident)
            cache.put(req.url, 
            {
                code: 200,
                resident: resident
            }, cacheTimeout)
        }
    }
})

module.exports = router