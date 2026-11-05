const {getObjRanges} = require("./map")
const m = require("./math")

function displayObjects(camera, blocks) {
    let numberOfInnerObjects = 0;
    for (const block of blocks) {
        if (isBlockInsideCamera(camera, block)) {
            const pos = calcPosInResOfCamera(camera, block)
            // console.log("Block inside camera : ", block);
            numberOfInnerObjects++;
            block.x = pos.x;
            block.y = pos.y;
        }      
    }
    // console.log("numberOfInnerObjects : ", numberOfInnerObjects);
    
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
    displayObjects
}