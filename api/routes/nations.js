const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

var cacheTimeout = 30

router.get("/", async (req, res) => 
{
    var cachedNations = cache.get(req.url)

    if (cachedNations) 
        res.status(200).json(cachedNations)
    else 
    {
        var nations = await emc.getNations().then(nations => { return nations })

        res.status(200).json(nations)
        cache.put(req.url, nations, cacheTimeout*1000)
    }
})

router.get("/:nationName", async (req, res) => 
{
    var cachedNation = cache.get(req.url)

    if (cachedNation) res.status(cachedNation.code).json(cachedNation.nation)
    else 
    {
        var nationName = req.params.nationName,
            foundNation = await (await emc.getNations(nationName).then(nations => { return nations })).find(nation => nation.name.toLowerCase() == nationName.toLowerCase())
    
        if (!foundNation) 
        {
            res.status(404).json(foundNation)
            cache.put(req.url, 
            {
                code: 404,
                nation: "That nation does not exist!",
            }, cacheTimeout*1000)
        } 
        else 
        {
            res.status(200).json(foundNation)
            cache.put(req.url, 
            {
                code: 200,
                nation: foundNation,
            }, cacheTimeout*1000)
        }
    }
})

router.get("/:nationName/invitable", async (req, res) => 
{
    var nationName = req.params.nationName
    var invitableTownsRes = await emc.getInvitableTowns(nationName, false).then(towns => { return towns })

    if (invitableTownsRes == "That nation does not exist!") res.status(404).json(invitableTownsRes)
    else res.status(200).json(invitableTownsRes)
})

module.exports = router