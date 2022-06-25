const express = require("express"),
      router = express.Router(),
      endpoint = require("earthmc/endpoint"),
      cache = require("memory-cache"),
      modify = require("earthmc-dynmap-plus")

var cacheTimeout = 15000

async function sendModified(cacheKey, res) {
    let cachedMapData = cache.get(cacheKey),
        allianceType = cacheKey.replace('nova', '')

    if (cachedMapData) res.status(200).send(cachedMapData)
    else {
        var mapData = await endpoint.mapData('nova').catch(e => console.log(e))
        if (!mapData) return sendError(res)

        let modified = modify(mapData, 'nova', allianceType)
        cache.put(cacheKey, modified, cacheTimeout)
        res.status(200).send(modified)
    }
}

router.get("/mega", async (req, res) => sendModified('nova_mega', res))
router.get("/pact", async (req, res) => sendModified('nova_pact', res))

const sendError = res => res.status(500).json("Error fetching modified map data, please try again.")

module.exports = router