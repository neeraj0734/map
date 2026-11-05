const m = require("./math")
const map = require("./map")


const hRange = {start : 0, end: 2000}
const vRange = {start : 0, end: 2000}
const mapRange = {width:2000, height: 2000}
const blockProp = {width: 100, height: 100}


console.log(map.getRadomBlocksInsideMap(mapRange, 50, blockProp, 10));


// console.log(m.getRandomValue(range))