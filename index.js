const http = require("http"),
      app = require("./app"),
      port = process.env.PORT || 3001
      server = http.createServer(app)
      
var cacheTimeout = 30 //seconds
server.listen(port)
module.exports = {cacheTimeout}