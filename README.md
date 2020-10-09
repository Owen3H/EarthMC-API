# EarthMC API

Provides info on the EarthMC Minecraft server using node-fetch.

## Prerequisites
Install a fetch package such as [node-fetch](https://www.npmjs.com/package/node-fetch)
```bash
$ npm install node-fetch
```
Require the package
```js
var fetch = require("node-fetch")
```

## Example
```js
var town = await fetch("http://earthmc-api.herokuapp.com/towns/London").then(response => response.json()).catch(err => { return err }) 

console.log(town)

// => { area: 975, x: -352, z: -9904, name: 'TownName', nation: 'NationName', mayor: 'MayorName', residents: ['Resident', 'OtherResident', ...], pvp: false, mobs: false, public: false, explosion: false, fire: false, capital: true }
```

## Routes
<details>
<summary>Towns</summary>
<p>

All towns - [http://earthmc-api.herokuapp.com/towns/](http://earthmc-api.herokuapp.com/towns/)<br>
Get town - [http://earthmc-api.herokuapp.com/towns/townName](http://earthmc-api.herokuapp.com/towns/London)
</details>

<details>
<summary>Nations</summary>
<p>

All nations - [http://earthmc-api.herokuapp.com/nations/](http://earthmc-api.herokuapp.com/nations/)<br>
Get nation -[http://earthmc-api.herokuapp.com/nations/nationName](http://earthmc-api.herokuapp.com/nations/Britain)
</details>

<details>
<summary>Residents</summary>
<p>

All residents - [http://earthmc-api.herokuapp.com/residents/](http://earthmc-api.herokuapp.com/residents/)<br>
Get resident - [http://earthmc-api.herokuapp.com/residents/residentName](http://earthmc-api.herokuapp.com/residents/Warriorrr)
</details>

<details>
<summary>Online Players</summary>
<p>

All online players - [http://earthmc-api.herokuapp.com/onlineplayers/](http://earthmc-api.herokuapp.com/onlineplayers/)<br>
Get online player - [http://earthmc-api.herokuapp.com/onlineplayers/playerName](http://earthmc-api.herokuapp.com/onlineplayers/playerName)
</details>

<details>
<summary>Townless Players</summary>
<p>

[http://earthmc-api.herokuapp.com/townlessplayers](http://earthmc-api.herokuapp.com/townlessplayers)  (This is only townless players that are online)
</details>

<details>
<summary>All Players</summary>
<p>

This merges online players and residents.<br>
**NOTE** - The "town", "nation" and "rank" keys will not appear for townless players

All players - [http://earthmc-api.herokuapp.com/allplayers/](http://earthmc-api.herokuapp.com/allplayers/)
Get player - [http://earthmc-api.herokuapp.com/allplayers/playerName](http://earthmc-api.herokuapp.com/allplayers/playerName)
</details>

<details>
<summary>Server Info</summary>
<p>

[http://earthmc-api.herokuapp.com/serverinfo/](http://earthmc-api.herokuapp.com/serverinfo/)
</details>
