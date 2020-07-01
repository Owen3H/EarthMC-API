const express = require("express")
      app = express(),
      emc = require("earthmc")

app.use(async (req, res, next) => 
{
    var towns = await emc.getTowns().then(towns => { return towns })

    res.status(200).json(towns)
})

module.exports = app