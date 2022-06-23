const express = require("express"),
      router = express.Router(),
      testData = require("../../../../test.json")
      // dynmapPlus = require("emc-dynmap+")

router.get("/", async (req, res) => {
    if (!testData) return sendError(res)

    res.status(200).send(testData)
})

function sendError(res) { res.status(500).json("Error fetching modified map data, please try again.") }

module.exports = router