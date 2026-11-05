const r = require("raylib")
const map = require("./map");
const c = require("./camera");


const config = {
    screen: {
        width:500,
        height:500,
        title: "Map",
        fps: 50,
    },
    map: {
        width: 2000,
        height: 2000,
    },
    block:{width:100,height:100},
    camera:{x:0, y: 0, width:500, height:500},
}

function setup(){
    const {screen, block} = config;
    r.InitWindow(screen.width, screen.height, screen.title)
    r.SetTargetFPS(screen.fps)

    const blocks = map.getRadomBlocksInsideMap(config.map, 50, block, 100)

    config.blocks = blocks
    return config
}

function update(world){
    moveCamera(world.camera)
    c.displayObjects(world.camera, world.blocks)
}

function draw(world){
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    map.drawBlocks(world.blocks)
    addCamera(world.camera);

    r.EndDrawing()
}

function addCamera(cam) {
    r.DrawRectangleLines(cam.x, cam.y, cam.width, cam.height, r.RED)
}

function moveCamera(cam) {
    if(r.IsKeyDown(r.KEY_LEFT)){
        cam.x -= 2
    }
    if(r.IsKeyDown(r.KEY_RIGHT)){
        cam.x += 2
    }
    if(r.IsKeyDown(r.KEY_UP)){
        cam.y -= 2
    }
    if(r.IsKeyDown(r.KEY_DOWN)){
        cam.y += 2
    }
}

function loop(world){
    while (!r.WindowShouldClose()) {
        update(world)
        draw(world)
    }
}

function main(){
    const world = setup();
    loop(world)
}

main();