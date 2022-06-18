const express = require("express"),
      router = express.Router(),
      cache = require("memory-cache"),
      cors = require('cors')

var timeout = 15 * 1000

router.get('/', function (req, res) {
    var cachedAlliances = cache.get('alliances')

    if (cachedAlliances) send200(res, cachedAlliances)
    else send204(res)
})

router.get('/:allianceName', function (req, res) {
    var cachedAlliances = cache.get('alliances'),
        allianceName = req.params.allianceName

    if (cachedAlliances) {
        switch(allianceName.toLowerCase()) {
            case "submeganations":
                let submeganations = cachedAlliances.filter(alliance => alliance.type == 'sub')
                send200(res, submeganations)
                
                break
            case "meganations":
                let meganations = cachedAlliances.filter(alliance => alliance.type == 'mega')
                send200(res, meganations)
                
                break
            case "normal":
                let normal = cachedAlliances.filter(alliance => alliance.type == 'normal')
                send200(res, normal)
                    
                break
            default:
                let alliance = cachedAlliances.find(cur => cur.allianceName.toLowerCase() == allianceName.toLowerCase())

                if (!alliance) res.status(404).json("That alliance does not exist!")
                else send200(res, alliance)
        }
    }
    else send204(res)
})

router.put('/', cors(), function (req, res) {
    if (req.header('AUTH_KEY') == process.env.AUTH_KEY) {
        var alliances = req.body

        cache.put('alliances', alliances)
        send200(res, alliances)
    }
    else res.status(401).send("PUT request unauthorized!")
})

function send200(res, data) {
    res.status(200).json(data).setTimeout(timeout)
}

function send204(res) {
    res.status(202).send("Alliances have not been cached yet.")
}

module.exports = router