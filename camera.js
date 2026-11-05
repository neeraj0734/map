const { IsKeyPressed, KEY_W, KEY_A, KEY_S, KEY_D } = require("raylib")
const {getObjRanges, drawBlocks} = require("./map")
const m = require("./math")

function addCameras(width, height, velcity, count) {
    let cameras = []
    for (let index = 0; index < count; index++) {
        cameras.push(createCamera(width, height, velcity))
    }
    return cameras
}

function createCamera(width, height,velcity) {
    return {x:0, y: 0, width, height, velcity};
}

function getUpdatedObjects(camera, objects) {
    const udpatedBlocks = []
    for (const obj of objects) {
        const pos = calcPosInResOfCamera(camera, obj)
        udpatedBlocks.push({x:pos.x, y:pos.y, width: obj.width, height: obj.height, color: obj.color})
    }
    return udpatedBlocks
}

function calcPosInResOfCamera(camera, obj){
    const x = obj.x - camera.x;
    const y = obj.y - camera.y;
    return {x, y}
}

function isBlockInsideCamera(camera, block) {
    const ranges = getObjRanges(camera);
    const coords = {x:block.x, y: block.y}
    const isInHRange = m.isInRange(ranges.hRange, coords.x);
    const isInVRange = m.isInRange(ranges.vRange, coords.y);

    return isInHRange && isInVRange
}

function changeCamera(focusCamera,cameras) {
    if(IsKeyPressed(KEY_A)){return cameras[1]}
    if(IsKeyPressed(KEY_S)){return cameras[2]}
    if(IsKeyPressed(KEY_D)){return cameras[3]}
    if(IsKeyPressed(KEY_W)){return cameras[0]}
    return focusCamera;
}


module.exports={
    isBlocksInsideCamera: isBlockInsideCamera,
    getUpdatedObjects,
    changeCamera
}