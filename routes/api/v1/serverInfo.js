const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res) => 
{
    var serverInfo = await emc.getServerInfo().then(info => { return info }).catch(() => {})

    if (!serverInfo) 
        return res.status(500).json("An error occured fetching data, please try again.")
    
    res.status(200).json(serverInfo)
})

module.exports = router