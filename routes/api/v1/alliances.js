const express = require("express"),
      router = express.Router()

require("dotenv").config()

// PUT = UPDATE
// POST = CREATE

router.get('/', function (req, res) 
{
    if (req.method == "PUT")
    {
        if (req.header('AUTH_KEY') == process.env.AUTH_KEY)
        {
            var alliances = req.body
            res.status(200).json(alliances)
        }
    }
})

// router.post('/:allianceName', function (req, res) 
// {
//     var alliance = req.allianceName
// })

module.exports = router;