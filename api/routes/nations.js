const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

router.get("/", async (req, res, next) => 
{
    var cachedNations = cache.get(req.url)
    if (cachedNations) {
        res.status(200).json(cachedNations)
    } else {
        var nations = await emc.getNations().then(nations => { return nations })

        res.status(200).json(nations)
        cache.put(req.url, nations, 60*1000)
    }
})

router.get("/:nationName", async (req, res, next) => 
{
    var cachedNation = cache.get(req.url)
    if (cachedNation) {
        res.status(cachedNation.code).json(cachedNation.nation)
    } else {
        var nationName = req.params.nationName
        var foundNation = await (await emc.getNations(nationName).then(nations => { return nations })).find(nation => nation.name.toLowerCase() == nationName.toLowerCase())
    
        if (!foundNation) {
            res.status(404).json(foundNation)
            cache.put(req.url, {
                code: 404,
                nation: "That nation does not exist!",
            }, 60*1000)
        } else {
            res.status(200).json(foundNation)
            cache.put(req.url, {
                code: 200,
                nation: foundNation,
            }, 60*1000)
        }
    }
})

router.get("/:nationName/invitable", async (req, res, next) => 
{
    var nationName = req.params.nationName
    var invitableTownsRes = await emc.getInvitableTowns(nationName, false).then(towns => { return towns })

    if (invitableTownsRes == "That nation does not exist!") res.status(404).json(invitableTownsRes)
    else res.status(200).json(invitableTownsRes)
})

module.exports = router