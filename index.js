const http = require("http"),
      app = require("./app"),
      scout = require("@scout_apm/scout-apm")

// The "main" function
async function start() {
    // Trigger the download and installation of the core-agent
    // await scout.install({
    //     allowShutdown: true, // allow shutting down spawned scout-agent processes from this program
    //     monitor: true, // enable monitoring
    //     name: process.env.SCOUT_NAME,
    //     key: process.env.SCOUT_KEY
    // })

    const httpServer = http.createServer(app)
    httpServer.listen(process.env.PORT || 8080)
}

if (require.main === module) start()