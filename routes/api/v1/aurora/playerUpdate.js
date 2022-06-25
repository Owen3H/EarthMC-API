const express = require("express"),
      router = express.Router(),
      endpoint = require("earthmc/endpoint")

router.get("/", async (req, res) => {
    let data = await endpoint.playerData('aurora')
    if (!data) return sendError(res)

    res.status(200).send(data)
})

const sendError = res => res.status(500).json("Error fetching player update, please try again.")

module.exports = router