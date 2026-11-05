const {getObjRanges, drawBlocks} = require("./map")
const m = require("./math")

function getUpdatedObjects(camera, blocks) {
    const udpatedBlocks = []
    for (const block of blocks) {
        const pos = calcPosInResOfCamera(camera, block)
        udpatedBlocks.push({x:pos.x, y:pos.y, width: block.width, height: block.height, color: block.color})
    }
    return udpatedBlocks
}

function calcPosInResOfCamera(camera, block){
    const x = block.x - camera.x;
    const y = block.y - camera.y;
    return {x, y}
}

function isBlockInsideCamera(camera, block) {
    const ranges = getObjRanges(camera);
    const coords = {x:block.x, y: block.y}
    const isInHRange = m.isInRange(ranges.hRange, coords.x);
    const isInVRange = m.isInRange(ranges.vRange, coords.y);

    return isInHRange && isInVRange
}


module.exports={
    isBlocksInsideCamera: isBlockInsideCamera,
    getUpdatedObjects
}