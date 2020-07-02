const express = require("express")
      app = express(),
      townRoutes = require("./api/routes/towns"),
      nationRoutes = require("./api/routes/nations"),
      residentRoutes = require("./api/routes/residents")

app.use("/towns", townRoutes)
app.use("/nations", nationRoutes)
app.use("/residents", residentRoutes)

module.exports = app