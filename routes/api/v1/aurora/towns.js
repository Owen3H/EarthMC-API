const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

var cacheTimeout = 30000

router.get("/", async (req, res) => 
{
    var cachedTowns = cache.get('towns')

    if (cachedTowns) res.status(200).json(cachedTowns)
    else {
        var towns = await emc.Aurora.getTowns().then(towns => { return towns }).catch(() => {})
        if (!towns) return sendError(res)

        cache.put('towns', towns, cacheTimeout)
        res.status(200).json(towns).setTimeout(6000)
    }
})

router.get("/:townName", async (req, res) => 
{
    var townName = req.params.townName,
        cachedTowns = cache.get('towns')
        
    if (cachedTowns) {
        var cachedTown = cachedTowns.find(t => t.name.toLowerCase() == townName.toLowerCase())
        
        if (cachedTown) res.status(200).json(cachedTown)
        else res.status(404).json("That town does not exist!")
    }
    else {
        var foundTown = await emc.Aurora.getTown(townName).then(towns => { return towns }).catch(() => {})
    
        if (!foundTown || foundTown == "That town does not exist!") res.status(404).json(foundTown)
        else res.status(200).json(foundTown).setTimeout(3000)
    }
})

router.get("/:townName/joinable", async (req, res) => 
{
    var townName = req.params.townName,
        invitableNationsRes = await emc.Aurora.getJoinableNations(townName).then(nations => { return nations }).catch(() => {})

    if (invitableNationsRes == "That nation does not exist!") res.status(404).json(invitableNationsRes)
    else res.status(200).json(invitableNationsRes)
})

function sendError(res) {
    res.status(500).json("An error occured fetching data, please try again.")
}

module.exports = router