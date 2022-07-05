const express = require("express"),
      router = express.Router(),
      cache = require("memory-cache"),
      modify = require("earthmc-dynmap-plus")

var cacheTimeout = 30*1000

async function sendModified(cacheKey, res) {
    let cachedMapData = cache.get(cacheKey),
        allianceType = cacheKey.replace('nova_', '')

    if (cachedMapData) res.status(200).send(cachedMapData)
    else {
        let modified = await modify('nova', allianceType)
        if (!modified) return sendError(res)

        cache.put(cacheKey, modified, cacheTimeout)
        res.status(200).send(modified)
    }
}

async function putModified(cacheKey, res) {
    if (req.header('AUTH_KEY') == process.env.EDP_AUTH_KEY)
        return res.status(401).send("PUT request unauthorized!")

    cache.put(cacheKey, req.body, cacheTimeout)
    res.status(200).send(req.body)
}

router.put("/mega", async (req, res) => putModified('nova_mega', res))
router.put("/pact", async (req, res) => putModified('nova_normal', res))

router.get("/mega", async (req, res) => sendModified('nova_mega', res))
router.get("/pact", async (req, res) => sendModified('nova_normal', res))

const sendError = res => res.status(500).json("Error fetching modified map data, please try again.")

module.exports = router