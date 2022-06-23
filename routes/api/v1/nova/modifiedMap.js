const express = require("express"),
      router = express.Router(),
      cache = require("memory-cache"),
      calcArea = require("earthmc/functions").calcPolygonArea,
      endpoint = require("earthmc/endpoint")
      // dynmapPlus = require("emc-dynmap+")

var cacheTimeout = 30000

router.get("/", async (req, res) => {
    var cachedMapData = cache.get('nova_modified')

    if (cachedMapData) res.status(200).json(cachedMapData)
    else {
        var mapData = await endpoint.mapData("nova").catch(() => {})
        if (!mapData) return sendError(res)

        let modified = modify(mapData)
        cache.put('nova_modified', modified, cacheTimeout)
        res.status(200).json(mapData)
    }
})

async function modify(data) {
    if (!data.sets) return []
    
    // Delete star icons.
    delete data.sets["townyPlugin.markerset"].markers
    let towns = Object.values(data.sets["townyPlugin.markerset"].areas)

    let i = 0, len = towns.length
    for (; i < len; i++) {
        let town = towns[i]

        var townTitle = town.desc.split('<br \/>')[0]
            .replace(/\(Shop\)$/g, '')
            .replaceAll(/[()]/g, '')
            .split(' ')

        const nation = townTitle[2].replace('</span>', ''),
              area = calcArea(town.x, town.z, town.x.length)

        const memberList = town.desc.split('Members <span style=\"font-weight:bold\">')[1].split('</span><br />Flags')[0],
              memberSize = (memberList.match(/,/g) || []).length + 1

        // Make shops invisible
        if (town.desc.includes('(Shop)')) 
            town.fillopacity = town.opacity = 0

        // Recreating town's description.
        town.desc = town.desc.replace('>hasUpkeep:', '>Has upkeep:')
                            .replace('>pvp:', '>PVP allowed:')
                            .replace('>mobs:', '>Mob spawning:')
                            .replace('>public:', '>Public status:')
                            .replace('>explosion:', '>Explosions:')
                            .replace('>fire:', '>Fire spread:')
                            .replace('>capital:', '>Is capital:')

        town.desc = town.desc.replaceAll('true<', 'Yes').replaceAll('false<', 'No')
        town.desc = town.desc.replace('Members <span', 'Members <b>[' + memberSize + ']</b> <span')
        town.desc = town.desc.replace('</span><br /> Members', '</span><br />Size<span style=\"font-weight:bold\"> ' + area + ' </span><br /> Members')

        // Modifying esthetics of the area.
        town.weight = 1
        town.opacity = 0.7

        if (town.color == "#3FB4FF" && town.fillcolor == "#3FB4FF") town.color = town.fillcolor = "#000000"
        if (nation.length < 1) return town.fillcolor = town.color = '#83003F'
    }

    return towns
}

const sendError = res => res.status(500).json("Error fetching modified map data, please try again.")

module.exports = router