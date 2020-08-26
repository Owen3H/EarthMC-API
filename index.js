const http = require("http"),
      app = require("./app"),
      port = process.env.PORT || 3001
      server = http.createServer(app)
      
server.listen(port)