const express = require("express"),
      router = express.Router(),
      fetch = require("node-fetch")
      // dynmapPlus = require("emc-dynmap+")

router.get("/", async (req, res) => {
    var mapData = await fetch("https://raw.githubusercontent.com/3meraldK/earthmc-dynmap-chromium-test/main/marker_earth.json").then(d => d.json())
    if (!mapData) return sendError(res)
 
    res.status(200).json(mapData).setTimeout(10000)
})

var sendError = res => res.status(500).json("Error fetching modified map data, please try again.")

module.exports = router