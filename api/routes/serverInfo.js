const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var serverInfo = await emc.getServerInfo().then(info => { return info })

    res.status(200).json(serverInfo)
})

module.exports = router;