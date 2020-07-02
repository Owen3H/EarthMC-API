const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var nations = await emc.getNations().then(nations => { return nations })

    res.status(200).json(nations)
})

module.exports = router;