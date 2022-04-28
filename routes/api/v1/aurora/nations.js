const express = require("express"),
      router = express.Router(),
      emc = require("earthmc"),
      cache = require("memory-cache")

var cacheTimeout = 30000

router.get("/", async (req, res) => 
{
    var cachedNations = cache.get('nations')

    if (cachedNations) res.status(200).json(cachedNations)
    else {
        var nations = await emc.AuroragetNations().then(nations => { return nations }).catch(() => {})
        if (!nations) return sendError(res)

        cache.put('nations', nations, cacheTimeout)
        res.status(200).json(nations)
    }
})

router.get("/:nationName", async (req, res) => 
{
    var nationName = req.params.nationName,
        cachedNations = cache.get('nations')
        
    if (cachedNations) {
        var cachedNation = cachedNations.find(n => n.name.toLowerCase() == nationName.toLowerCase())
        
        if (cachedNation) res.status(200).json(cachedNation)
        else res.status(404).json("That nation does not exist!")
    }
    else {
        var foundNation = await emc.Nova.getNation(nationName).then(nation => { return nation })
    
        if (foundNation == "That nation does not exist!") res.status(404).json(foundNation)
        else res.status(200).json(foundNation).setTimeout(10000)
    }
})

router.get("/:nationName/invitable", async (req, res) => 
{
    var nationName = req.params.nationName,
        invitableTownsRes = await emc.Nova.getInvitableTowns(nationName, false).then(towns => { return towns })

    if (invitableTownsRes == "That nation does not exist!") res.status(404).json(invitableTownsRes)
    else res.status(200).json(invitableTownsRes).setTimeout(10000)
})

function sendError(res) {
    res.status(500).json("An error occured fetching data, please try again.")
}

module.exports = router