const express = require("express")
      app = express(),
      townsRoute = require("./api/routes/towns"),
      nationsRoute = require("./api/routes/nations"),
      residentsRoute = require("./api/routes/residents"),
      serverInfoRoute = require("./api/routes/serverInfo")

// Use the routes defined in api/routes
app.use("/towns", townsRoute)
app.use("/nations", nationsRoute)
app.use("/residents", residentsRoute)
app.use("/serverinfo", serverInfoRoute)

// Error handling
app.use((req, res, next) => 
{
      const error = new Error('Not found!')
      error.status = 404
      next(error)
})

app.use((error, req, res, next) => 
{
      res.status(error.status || 500)
      res.json(error)
})

module.exports = app