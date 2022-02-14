const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

var cacheTimeout = 30

router.get("/", async (req, res) => 
{
    var cachedTowns = cache.get(req.url)

    if (cachedTowns) res.status(200).json(cachedTowns)
    else 
    {
        var towns = await emc.getTowns().then(towns => { return towns })

        res.status(200).json(towns)
        cache.put(req.url, towns, cacheTimeout * 1000)
    }
})

router.get("/:townName", async (req, res) => 
{
    var cachedTown = cache.get(req.url)

    if (cachedTown) res.status(cachedTown.code).json(cachedTown.town)
    else 
    {
        var townName = req.params.townName,
            foundTown = await emc.getTown(townName)
    
        if (!foundTown) 
        {
            res.status(404).json("That town does not exist!")
            cache.put(req.url, {
                code: 404,
                town: "That town does not exist!"
            }, cacheTimeout * 1000)
        } 
        else 
        {
            res.status(200).json(foundTown)
            cache.put(req.url, 
            {
                code: 200,
                town: foundTown
            }, cacheTimeout * 1000)
        }
    }
})

router.get("/:townName/joinable", async (req, res) => 
{
    var townName = req.params.townName,
        invitableNationsRes = await emc.getJoinableNations(townName).then(nations => { return nations })

    if (invitableNationsRes == "That nation does not exist!") 
        res.status(404).json(invitableNationsRes)
    else 
        res.status(200).json(invitableNationsRes)
})


module.exports = router