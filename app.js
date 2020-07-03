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
      var date = new Date()

      res.json({
            "timestamp": date.getTime(),
            "status": 404,
            "error": "Endpoint Error",
            "message": "Not found!",
            "path": req.path
      })
})

app.use((error, req, res, next) => 
{
      var date = new Date()

      res.json({
            "timestamp": date.getTime(),
            "status": error.status || 500,
            "error": "Internal Server Error",
            "message": error.message,
            "path": req.path
      })
})

module.exports = app