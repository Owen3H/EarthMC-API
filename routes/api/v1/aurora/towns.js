const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

var cacheTimeout = 30000

router.get("/", async (req, res) => {
    var cachedTowns = cache.get('aurora_towns')

    if (cachedTowns) res.status(200).json(cachedTowns)
    else {
        var towns = await emc.Aurora.getTowns().catch(() => {})
        if (!towns) return sendError(res)

        cache.put('towns', towns, cacheTimeout)
        res.status(200).json(towns).setTimeout(6000)
    }
})

router.get("/:townName", async (req, res) => {
    var townName = req.params.townName,
        cachedTowns = cache.get('aurora_towns')
        
    if (cachedTowns) {
        var cachedTown = cachedTowns.find(t => t.name.toLowerCase() == townName.toLowerCase())
        
        if (cachedTown) res.status(200).json(cachedTown)
        else res.status(404).json("That town does not exist!")
    }
    else {
        var foundTown = await emc.Aurora.getTown(townName).catch(() => {})
        if (!foundTown) return sendError(res)
    
        if (foundTown == "That town does not exist!") res.status(404).json(foundTown)
        else res.status(200).json(foundTown).setTimeout(3000)
    }
})

router.get("/:townName/joinable", async (req, res) => {
    var townName = req.params.townName,
        joinable = await emc.Aurora.getJoinableNations(townName).catch(() => {})

    if (!joinable) return sendError(res)
    if (joinable == "That nation does not exist!") res.status(404).json(joinable)
    else res.status(200).json(joinable)
})

function sendError(res) {
    res.status(500).json("An error occured fetching data, please try again.")
}

module.exports = router