const http = require("http"),
      https = require("https"),
      fs = require("fs"),
      app = require("./app")
      
const authOptions = {
    cert:  fs.readFileSync('./web/auth/certificate.crt'),
    ca: fs.readFileSync('./web/auth/ca_bundle.crt'),
    key: process.env.AUTH_KEY
 };
 
const httpServer = http.createServer(app),
      httpsServer = https.createServer(authOptions, app)

app.use((req, res, next) => 
{
    if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`)
    else
        next()
})

httpServer.listen(process.env.PORT || 8080)
httpsServer.listen(5000, 'earthmcstats.sly.io')