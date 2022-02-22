const express = require("express"),
      router = express.Router()

router.get("/", async (req, res) => 
{
    res.redirect('townlessPlayers')
})

module.exports = router