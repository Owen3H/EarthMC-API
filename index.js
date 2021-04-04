const http = require("http"),
      app = require("./app"),
      port = process.env.PORT || 3001
      server = http.createServer(app)
      
var cacheTimeout = 30 //seconds
module.exports = {cacheTimeout}

server.listen(port)