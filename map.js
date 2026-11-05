const r = require("raylib")
const m = require("./math")

function getRadomBlockInsideMap(ranges, step,blockProp) {
    const x = m.getRandomValueInStep(ranges.hRange, step)
    const y = m.getRandomValueInStep(ranges.vRange, step)
    const color = getRandomColor();

    return {x, y, width: blockProp.width, height :blockProp.height, color}
}

function getRadomBlocksInsideMap(map, step, blockProp, count){
    const ranges = getObjRanges(map);
    const blocks = [];
    for (let index = 0; index < count; index++) {
        const block = getRadomBlockInsideMap(ranges, step, blockProp)
        blocks.push(block)
    }
    return blocks
}

function drawBlock(b) {
    r.DrawRectangle(b.x, b.y, b.width, b.height, b.color)
}

function drawBlocks(blocks) {
    for (const block of blocks) {
        drawBlock(block)
    }
}

function getRandomColor() {
    const brightnessRange = {start:0, end: 255}; 
    const r = m.getRandomValue(brightnessRange);
    const g = m.getRandomValue(brightnessRange);
    const b = m.getRandomValue(brightnessRange);
    const a = 255;
    return {r, g, b, a};
}

function getObjRanges(obj) {
    const hRange = { start: 0, end: obj.width };
    const vRange = { start: 0, end: obj.height };
    return {hRange,vRange}
}

module.exports = {
    getRadomBlocksInsideMap, 
    drawBlocks,
    getObjRanges, getRandomColor
}
