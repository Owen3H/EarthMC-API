// @ts-nocheck
const scout = require("@scout_apm/scout-apm"),
      express = require("express"),
      app = express(),
      rateLimit = require('express-rate-limit'),
      mainRoute = require("./routes/webpage/main"),
      inviteRoute = require("./routes/webpage/invite"),
      monitorRoute = require("./routes/webpage/monitor"),
      mapRoute = require("./routes/webpage/map"),
      serverInfoRoute = require("./routes/api/v1/serverInfo")

const auroraTownsRoute = require("./routes/api/v1/aurora/towns"),
      auroraNationsRoute = require("./routes/api/v1/aurora/nations"),
      auroraResidentsRoute = require("./routes/api/v1/aurora/residents"),
      auroraOnlinePlayersRoute = require("./routes/api/v1/aurora/onlinePlayers"),
      auroraTownlessPlayersRoute = require("./routes/api/v1/aurora/townlessPlayers"),
      auroraAllPlayersRoute = require("./routes/api/v1/aurora/allPlayers"),
      auroraNearbyPlayersRoute = require("./routes/api/v1/aurora/nearbyPlayers"),
      auroraNearbyTownsRoute = require("./routes/api/v1/aurora/nearbyTowns"),
      auroraNearbyNationsRoute = require("./routes/api/v1/aurora/nearbyNations"),
      auroraAlliancesRoute = require("./routes/api/v1/aurora/alliances"),
      auroraNewsRoute = require("./routes/api/v1/aurora/news")

const novaTownsRoute = require("./routes/api/v1/nova/towns"),
      novaNationsRoute = require("./routes/api/v1/nova/nations"),
      novaResidentsRoute = require("./routes/api/v1/nova/residents"),
      novaOnlinePlayersRoute = require("./routes/api/v1/nova/onlinePlayers"),
      novaTownlessPlayersRoute = require("./routes/api/v1/nova/townlessPlayers"),
      novaAllPlayersRoute = require("./routes/api/v1/nova/allPlayers"),
      novaNearbyPlayersRoute = require("./routes/api/v1/nova/nearbyPlayers"),
      novaNearbyTownsRoute = require("./routes/api/v1/nova/nearbyTowns"),
      novaNearbyNationsRoute = require("./routes/api/v1/nova/nearbyNations"),
      novaAlliancesRoute = require("./routes/api/v1/nova/alliances"),
      novaNewsRoute = require("./routes/api/v1/nova/news")

// Leave these in this order.
setupLimiter()
setupMonitoring()
setupRoutes()
setupGC()

async function setupGC() {
      setInterval (() => {
            let mu = process.memoryUsage()
            print('heapTotal:',  mu.heapTotal, 'heapUsed:', mu.heapUsed)

            if (mu.heapUsed > 460 * 1024 * 1024) {
                  print('Taking out the garbage')
                  global.gc()
            }
      }, 1000 * 60)
}

async function setupMonitoring() {
      app.use(scout.expressMiddleware())
}

async function setupLimiter() {
      var window = 5 * 1000
      const limiter = rateLimit({
            windowMs: window, // Time (ms) until limit is reset
            max: 10, // Limit each IP to x requests per `window`
            message: 'You are currently rate-limited, try again in ' + window/1000 + ' seconds.',
            standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      })
            
      app.set('trust proxy', 1)
      app.use(limiter)
}

async function setupRoutes() {
      const compression = require('compression')
      app.use(compression()) // Compress all routes

      var bodyParser = require("body-parser")
      app.use(bodyParser.json({ limit: '20mb' }))
      app.use(bodyParser.urlencoded({ limit: "20mb", extended: true, parameterLimit: 20000 }))

      // Serve webpage routes.
      app.use("/", mainRoute)
      app.use("/invite", inviteRoute)
      app.use("/monitor", monitorRoute)
      app.use("/map", mapRoute)
      app.use("/api/v1/serverinfo", serverInfoRoute)

      //#region Serve Nova routes.
      app.use("/api/v1/nova/towns", novaTownsRoute)
      app.use("/api/v1/nova/nations", novaNationsRoute)
      app.use("/api/v1/nova/residents", novaResidentsRoute)
      app.use("/api/v1/nova/onlineplayers", novaOnlinePlayersRoute)
      app.use("/api/v1/nova/townlessplayers", novaTownlessPlayersRoute)
      app.use("/api/v1/nova/nearby", novaNearbyPlayersRoute)
      app.use("/api/v1/nova/nearbyplayers", novaNearbyPlayersRoute)
      app.use("/api/v1/nova/nearbytowns", novaNearbyTownsRoute)
      app.use("/api/v1/nova/nearbynations", novaNearbyNationsRoute)

      // POST, PUT, DELETE restricted to EMC Stats.
      app.use("/api/v1/nova/alliances", novaAlliancesRoute)
      app.use("/api/v1/nova/news", novaNewsRoute)
      app.use("/api/v1/nova/allplayers", novaAllPlayersRoute)
      //#endregion

      //#region Serve Aurora routes
      // app.use("/api/v1/aurora/towns", auroraTownsRoute)
      // app.use("/api/v1/aurora/nations", auroraNationsRoute)
      // app.use("/api/v1/aurora/residents", auroraResidentsRoute)
      // app.use("/api/v1/aurora/onlineplayers", auroraOnlinePlayersRoute)
      // app.use("/api/v1/aurora/townlessplayers", auroraTownlessPlayersRoute)
      // app.use("/api/v1/aurora/nearby", auroraNearbyPlayersRoute)
      // app.use("/api/v1/aurora/nearbyplayers", auroraNearbyPlayersRoute)
      // app.use("/api/v1/aurora/nearbytowns", auroraNearbyTownsRoute)
      // app.use("/api/v1/aurora/nearbynations", auroraNearbyNationsRoute)

      // // POST, PUT, DELETE restricted to EMC Stats.
      // app.use("/api/v1/aurora/alliances", auroraAlliancesRoute)
      // app.use("/api/v1/aurora/news", auroraNewsRoute)
      // app.use("/api/v1/aurora/allplayers", auroraAllPlayersRoute)
      //#endregion

      // Default not found response
      app.use((req, res) => {
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
      app.use((error, req, res) => {
            var date = new Date()

            res.json({
                  "timestamp": date.getTime(),
                  "status": error.status || 500,
                  "error": "Internal Server Error",
                  "message": error.message,
                  "path": req.path
            })
      })
}

module.exports = app