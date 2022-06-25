const express = require("express"),
      router = express.Router(),
      cache = require("memory-cache"),
      endpoint = require("earthmc/endpoint")

router.get("/", async (req, res) => {
    let cached = cache.get('aurora_update')

    if (cached) res.status(200).send(cached)
    else {
        let data = await endpoint.playerData('aurora')
        if (!data) return sendError(res)

        cache.put('aurora_update', data, cacheTimeout)
        res.status(200).send(data)
    }
})

const sendError = res => res.status(500).json("Error fetching player update, please try again.")

module.exports = router