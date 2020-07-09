const express = require("express"),
      router = express.Router(),
      emc = require("earthmc")

router.get("/", async (req, res, next) => 
{
    var residents = await emc.getResidents().then(residents => { return residents })

    res.status(200).json(residents)
})

router.get("/:residentName/liveposition", async (req, res, next) => 
{
    var lastValidLocation     
    var timedOut

    var foundPlayerOld = onlinePlayers.find(op => op.account.toLowerCase() == args[1].toLowerCase())
              
    if (!foundPlayerOld)
    {
        return "Player is offline or does not exist!"
    }

    async function livePosFunc()
    { 
        let townyres = await fetch("https://earthmc.net/map/up/world/earth/").catch(sendEmbed => { return m.edit(fn.townyIssues).then(msg => msg.delete(10*1000)) }).catch(err => {})
        let townydata = await townyres.json().catch(err => {})
                  
        if (!townydata) 
        {

        }
                
        var onlinePlayersNew = townydata.players                             
        var foundPlayerNew = onlinePlayersNew.find(op => op.account.toLowerCase() == args[1].toLowerCase())
                  
        if (!foundPlayerNew)
        {
            return m.edit
            (
                new Discord.RichEmbed()
                .setTitle("Error fetching player")
                .setDescription(args[1] + " has gone offline!")
                .setTimestamp()
                .setColor("RED")
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
            ).then(msg => msg.delete(10*1000)).catch(err => {})
        }
                  
        // If they are in the earth world
        if (foundPlayerNew.world != "-some-other-bogus-world-") 
        {
            lastValidLocation = 
            {
                x: foundPlayerNew.x,
                y: foundPlayerNew.y,
                z: foundPlayerNew.z                        
            }
                    
            return lastValidLocation
        }
        else
        {
            if (lastValidLocation == null || lastValidLocation == undefined)
            {
                return "Can't get location, this player has not yet appeared on the dynmap!"
            } 
            else
            {
                return lastValidLocation
            }
        }

        if (!timedOut)
        {
            setTimeout(livePosFunc, 5000)
        } 
        else
        {
            if (lastValidLocation == null || lastValidLocation == undefined)
            {
                return "Can't get location, this player has not yet appeared on the dynmap!"
            }
            else
            {
                return lastValidLocation
            }
        }
    }
        
    livePosFunc()
            
    setTimeout(timer =>
    {  
        timedOut = true
    }, 120000) // 2 minutes

    lastValidLocation = 
    {
        x: foundPlayerNew.x,
        y: foundPlayerNew.y,
        z: foundPlayerNew.z                        
    }
})

router.get("/:residentName", async (req, res, next) => 
{
    var residentName = req.params.residentName
    var residents = await emc.getResidents().then(residents => { return residents })

    var foundResident = residents.find(r => r.name.toLowerCase() == residentName.toLowerCase())

    if (!foundResident) res.status(200).json("That resident does not exist!")
    else res.status(200).json(foundResident)
})

module.exports = router;