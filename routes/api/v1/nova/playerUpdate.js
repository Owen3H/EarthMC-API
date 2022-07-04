const express = require("express"),
      router = express.Router(),
      endpoint = require("earthmc/endpoint")

router.get("/", async (req, res) => {
    let data = await fetchUpdates().catch(() => {})
    if (!data) sendError(res)

    res.status(200).send(data)
})

async function fetchUpdates() { 
    let raw = await endpoint.playerData('nova')
    if (!raw || !raw.updates) return null

    raw.updates = raw.updates.filter(e => e.msg != "areaupdated" && e.msg != "markerupdated")
    return raw
}

const sendError = res => res.status(500).json("Error fetching player update, please try again.")

module.exports = router