const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var nations = await emc.getNations().then(nations => { return nations })

    res.status(200).json(nations)
})

router.get("/:nationName", async (req, res, next) => 
{
    var nationName = req.params.nationName
    var foundNation = await emc.getNation(nationName).then(nation => { return nation })

    if (foundNation == "That nation does not exist!") res.status(404).json(foundNation)
    else res.status(200).json(foundNation)
})

router.get("/:nationName/invitable", async (req, res, next) => 
{
    var nationName = req.params.nationName
    var invitableTownsRes = await emc.getInvitableTowns(nationName, false).then(towns => { return towns })

    if (invitableTownsRes == "That nation does not exist!") res.status(404).json(invitableTownsRes)
    else res.status(200).json(invitableTownsRes)
})


module.exports = router