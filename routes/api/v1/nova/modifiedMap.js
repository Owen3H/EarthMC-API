const express = require("express"),
      router = express.Router(),
      cache = require("memory-cache")
      // dynmapPlus = require("emc-dynmap+")

var cacheTimeout = 30000

router.get("/", async (req, res) => {
    var cachedMapData = cache.get('nova_modified')

    if (cachedMapData) res.status(200).json(cachedMapData)
    else {
        var mapData = await dynmapPlus.NOVA.getModified()
        if (!mapData) return sendError(res)

        cache.put('nova_modified', mapData, cacheTimeout)
        res.status(200).json(mapData)
    }
})

const sendError = res => res.status(500).json("Error fetching modified map data, please try again.")

module.exports = router