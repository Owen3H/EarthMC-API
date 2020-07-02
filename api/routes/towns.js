const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var towns = await emc.getTowns().then(towns => { return towns })

    res.status(200).json(towns)
})

module.exports = router;