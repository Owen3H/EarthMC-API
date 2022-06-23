const express = require("express"),
      router = express.Router(),
      fetch = require("node-fetch"),
      cache = require("memory-cache")
      // dynmapPlus = require("emc-dynmap+")

var cacheTimeout = 30000

router.get("/", async (req, res) => {
    var cachedMapData = cache.get('nova_modified')

    if (cachedMapData) res.status(200).json(cachedMapData)
    else {
        var mapData = await fetch("https://raw.githubusercontent.com/3meraldK/earthmc-dynmap-chromium-test/main/marker_earth.json").then(d => d.json())
        if (!mapData) return sendError(res)

        cache.put('nova_modified', mapData, cacheTimeout)
        res.status(200).json(mapData)
    }
})

const sendError = res => res.status(500).json("Error fetching modified map data, please try again.")

module.exports = router