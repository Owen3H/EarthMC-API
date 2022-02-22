const http = require("http"),
      https = require("https"),
      app = require("./app"),
      port = process.env.PORT || 3001
      
const authOptions = {
    cert:  fs.readFileSync('./web/auth/certificate.crt'),
    ca: fs.readFileSync('./web/auth/ca_bundle.crt'),
    key: fs.readFileSync('./web/auth/private.key')
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

httpServer.listen(port)
httpsServer.listen(port)