 # EarthMC API [![NPM Version][npm-image]][npm-url] 
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
var town = await fetch("http://earthmc-api.herokuapp.com/api/v1/nova/towns/London")
console.log(town)
// => { area: int, x: int, z: int, name: string, nation: string, mayor: string, residents: string[], pvp: boolean, mobs: boolean, public: boolean, explosion: boolean, fire: boolean, capital: boolean }
```

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/earthmc.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/earthmc
