const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

var cacheTimeout = 30000

router.get("/", async (req, res) => 
{
    var cachedNations = cache.get('nations')

    if (cachedNations) res.status(200).json(cachedNations)
    else 
    {
        var nations = await emc.getNations().then(nations => { return nations })

        res.status(200).json(nations)
        cache.put('nations', nations, cacheTimeout)
    }
})

router.get("/:nationName", async (req, res) => 
{
    var cachedNation = cache.get(req.url)

    if (cachedNation) res.status(cachedNation.code).json(cachedNation.nation)
    else 
    {
        var nationName = req.params.nationName,
            foundNation = await emc.getNation(nationName).then(nation => { return nation })
    
        if (foundNation == "That nation does not exist!") 
        {
            res.status(404).json(foundNation)
            cache.put(req.url, 
            {
                code: 404,
                nation: foundNation,
            }, cacheTimeout)
        } 
        else
        {
            res.status(200).json(foundNation)
            cache.put(req.url, 
            {
                code: 200,
                nation: foundNation,
            }, cacheTimeout)
        }
    }
})

router.get("/:nationName/invitable", async (req, res) => 
{
    var nationName = req.params.nationName,
        invitableTownsRes = await emc.getInvitableTowns(nationName, false).then(towns => { return towns })

    if (invitableTownsRes == "That nation does not exist!") res.status(404).json(invitableTownsRes)
    else res.status(200).json(invitableTownsRes)
})

module.exports = router