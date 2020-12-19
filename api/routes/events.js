const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

var townsCache = []

router.get("/", async (req, res, next) => 
{
    var towns = await emc.getTowns().then(arr => { return arr }),
        updates = []

    setInterval(() =>
    {
        townsCache = towns
    }, 20*1000)

    towns.forEach(town => 
    {
        var cachedTown = townsCache.find(t => t.name == town.name)
        if (!cachedTown) return

        var townObj = {
            name: town.name,
            pvpChanged: town.pvp != cachedTown.pvp ? true : false,
            publicChanged: town.public != cachedTown.public ? true : false, 
            fireChanged: town.fire != cachedTown.fire ? true : false,
            mobsChanged: town.mobs != cachedTown.mobs ? true : false,
            explosionsChanged: town.explosion != cachedTown.explosion ? true : false
        }

        updates.push(townObj)
    })

    res.status(200).json(updates)
})

module.exports = router