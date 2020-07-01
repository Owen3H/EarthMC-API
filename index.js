const { Http2ServerRequest } = require("http2")

const http = require("http"),
      app = require("./app"),
      port = process.env.PORT || 3001
      server = http.createServer(app)

server.listen(port)