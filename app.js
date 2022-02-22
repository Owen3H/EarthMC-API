const express = require("express")
      app = express(),
      mainRoute = require("./routes/main"),
      townsRoute = require("./routes/api/towns"),
      nationsRoute = require("./routes/api/nations"),
      residentsRoute = require("./routes/api/residents"),
      serverInfoRoute = require("./routes/api/serverInfo"),
      onlinePlayersRoute = require("./routes/api/onlinePlayers"),
      townlessPlayersRoute = require("./routes/api/townlessPlayers"),
      allPlayersRoute = require("./routes/api/allPlayers"),
      nearbyPlayersRoute = require("./routes/api/nearbyPlayers"),
      nearbyTownsRoute = require("./routes/api/nearbyTowns"),
      nearbyNationsRoute = require("./routes/api/nearbyNations"),
      onlineRedirect = require("./routes/api/redirects/online"),
      playersRedirect = require("./routes/api/redirects/players"),
      townlessRedirect = require("./routes/api/redirects/townless")

// Use index and auth routes.
app.use("/", mainRoute)

// Use the routes defined in api/routes
app.use("/api/towns", townsRoute)
app.use("/api/nations", nationsRoute)
app.use("/api/residents", residentsRoute)
app.use("/api/serverinfo", serverInfoRoute)
app.use("/api/onlineplayers", onlinePlayersRoute)
app.use("/api/townlessplayers", townlessPlayersRoute)
app.use("/api/allplayers", allPlayersRoute)
app.use("/api/nearby", nearbyPlayersRoute)
app.use("/api/nearbyplayers", nearbyPlayersRoute)
app.use("/api/nearbytowns", nearbyTownsRoute)
app.use("/api/nearbynations", nearbyNationsRoute)

// Redirects
app.use("/api/online", onlineRedirect)
app.use("/api/players", playersRedirect)
app.use("/api/townless", townlessRedirect)

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