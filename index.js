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
    if (req.protocol === 'http') 
    {
        res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    
    next();
});

httpServer.listen(80)
httpsServer.listen(443)