const express = require("express")
      app = express(),
      mainRoute = require("./api/routes/main"),
      townsRoute = require("./api/routes/towns"),
      nationsRoute = require("./api/routes/nations"),
      residentsRoute = require("./api/routes/residents"),
      serverInfoRoute = require("./api/routes/serverInfo"),
      onlinePlayersRoute = require("./api/routes/onlinePlayers"),
      townlessPlayersRoute = require("./api/routes/townlessPlayers"),
      allPlayersRoute = require("./api/routes/allPlayers"),
      nearbyPlayersRoute = require("./api/routes/nearbyPlayers"),
      nearbyTownsRoute = require("./api/routes/nearbyTowns"),
      nearbyNationsRoute = require("./api/routes/nearbyNations")

// Use the routes defined in api/routes
app.use("/", mainRoute)
app.use("/towns", townsRoute)
app.use("/nations", nationsRoute)
app.use("/residents", residentsRoute)
app.use("/serverinfo", serverInfoRoute)
app.use("/onlineplayers", onlinePlayersRoute)
app.use("/townlessplayers", townlessPlayersRoute)
app.use("/allplayers", allPlayersRoute)
app.use("/nearby", nearbyPlayersRoute)
app.use("/nearbyplayers", nearbyPlayersRoute)
app.use("/nearbytowns", nearbyTownsRoute)
app.use("/nearbynations", nearbyNationsRoute)

// Default not found response
app.use((req, res) => 
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

// Error handling
app.use((error, req, res) => 
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