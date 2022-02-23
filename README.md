<img src="https://cdn.glitch.me/project-avatar/5bf8d5e2-f6b5-469a-9f2f-b384fa098bd2.png" width="100"> [![NPM Version][npm-image]][npm-url] 

# EarthMC API 
A REST API providing info about people, places and more on EarthMC.

## Basic Setup (JS Example)
1. Install a fetch package in your chosen language.
```js 
$ npm install earthmc
```
2. Require/import the package.
```js
var fetch = require("node-fetch")
```
3. Implement by fetching and returning the data. 
  ```js
var town = await fetch("http://earthmc-api.herokuapp.com/towns/London").then(res => res.json()).catch(err => { return err })

console.log(town)
// => { area: 975, x: -352, z: -9904, name: 'TownName', nation: 'NationName', mayor: 'MayorName', residents: ['Resident', 'OtherResident', ...], pvp: false, mobs: false, public: false, explosion: false, fire: false, capital: true }
```

### Understanding the structure
<dl>
  <dl>Choose a domain - </dl>
  <dd>• (shorter, no ssl) - http://earthmcstats.sly.io</dd>
  <dd>• (longer, ssl) - https://earthmc-api.herokuapp.com</dd>

  <dl>Append the API version - </dl>
  <dd>Current versions: v1</dd>
  <dd>Chosen domain + /api/v1/</dd>
  
  <dl>Append a route from the list below</dl>
  <dd>Full URL Example: http://earthmcstats.sly.io/api/v1/towns</dd>
</dl>

## Routes
<details>
<summary>Towns</summary>
<p>

All - [towns/](https://earthmc-api.herokuapp.com/api/v1/towns/)<br>
Single - [towns/townName](https://earthmc-api.herokuapp.com/api/v1/towns/London)
</details>

<details>
<summary>Nations</summary>
<p>

All - [nations/](https://earthmc-api.herokuapp.com/api/v1/nations/)<br>
Single - [nations/nationName](https://earthmc-api.herokuapp.com/api/v1/nations/Britain)
</details>

<details>
<summary>Residents</summary>
<p>

All - [residents/](https://earthmc-api.herokuapp.com/api/v1/residents/)<br>
Single - [residents/residentName](https://earthmc-api.herokuapp.com/api/v1/residents/Warriorrr)
</details>

<details>
<summary>Players</summary>
<p>

This merges online players and residents.<br>
**NOTE** - The "town", "nation" and "rank" keys will not appear for townless players

All - [allplayers/](https://earthmc-api.herokuapp.com/api/v1/allplayers/)<br>
Single - [allplayers/playerName](https://earthmc-api.herokuapp.com/api/v1/allplayers/playerName)
</details>

<details>
<summary>Online Players</summary>
<p>

All - [onlineplayers/](https://earthmc-api.herokuapp.com/api/v1/onlineplayers/)<br>
Single - [onlineplayers/playerName](https://earthmc-api.herokuapp.com/api/v1/onlineplayers/playerName)
</details>

<details>
<summary>Townless</summary>
<p> 
  
Only displays townless players that are online.
  
[townlessplayers/](https://earthmc-api.herokuapp.com/api/v1/townlessplayers)
</details>

<details>
<summary>Nearby</summary>
<p>
  
Returns any players visible on the map in a radius to a certain point.<br>
  
xPos/zPos - The coordinates of a point on the dynmap.<br>
xRadius/zRadius - The x and z radii (in blocks) around the specified coords.

[nearby/xPos/zPos/xRadius/zRadius](https://earthmc-api.herokuapp.com/api/v1/nearby/xPos/zPos/xRadius/zRadius)
</details>

<details>
<summary>Server Info</summary>
<p>

[serverinfo/](https://earthmc-api.herokuapp.com/api/v1/serverinfo/)
</details>

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/earthmc.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/earthmc
[logo]: https://cdn.glitch.me/project-avatar/5bf8d5e2-f6b5-469a-9f2f-b384fa098bd2.png "EarthMC Stats Icon"
