# EarthMC-API
 A REST API providing info on the EarthMC Minecraft server.
## Getting town info
To get town info get http://earthmc-api.herokuapp.com/towns/ this will give you all info about all towns on the server
if you want info about a specific town than add the town name to the end of the url

when you get info about a town you will get json data that looks a bit like this
```json
{"name":"str","nation":"str","residents":"list/array","nationResidents":"list/array","area":"int","mayor":"str","pvp":"bool","mobs":"bool","public":"bool","explosion":"bool","fire":"bool","capital":"bool","x":"int","z":"int"}
```
## Getting nation info
To get town info get http://earthmc-api.herokuapp.com/nations/ this will give you all info about all nations on the server
if you want info about a specific nation than add the nation name to the end of the url

when you get info about a nation you will get json data that looks a bit like this
```json
{"name":"str","residents":"list/array","towns":"list/array","king":"str","capitalName":"str","capitalX":"int","capitalZ":"int","area":"int"}
```
## Getting resident info
To get town info get http://earthmc-api.herokuapp.com/residents/ this will give you all info about all residents on the server
if you want info about a specific resident than add the resident name to the end of the url

when you get info about a resident you will get json data that looks a bit like this
```json
{"name":"str","town":"str","nation":"str","rank":"str"}
```
## Getting online player info
To get town info get http://earthmc-api.herokuapp.com/onlineplayers/ this will give you all info about all online players on the server
if you want info about a specific player than add the player name to the end of the url

when you get info about an online player you will get json data that looks a bit like this
```json
{"x":"int","y":"int","z":"int","isUnderground":"bool","nickname":"str","name":"str"}
```
## Getting server info
To get server info get http://earthmc-api.herokuapp.com/serverinfo

when you get server info you will get json data that looks a bit like this
```json
{"serverOnline":"bool","online":"int","max":"int","towny":"int","storming":"bool","thundering":"int","queue":"int or null"}
```
## Errors
if you attempt to get data about something that doesnt exist it will return a string
