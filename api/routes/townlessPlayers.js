const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var townlessPlayers = await emc.getTownless().then(townless => { return townless })

    res.status(200).json(townlessPlayers)
})

module.exports = router