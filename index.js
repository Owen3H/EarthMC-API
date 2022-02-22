const http = require("http"),
      app = require("./app")

const httpServer = http.createServer(app)
httpServer.listen(process.env.PORT || 8080)