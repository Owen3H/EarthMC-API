const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var residents = await emc.getResidents().then(residents => { return residents })

    res.status(200).json(residents)
})

module.exports = router;