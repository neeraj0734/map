const r = require("raylib")
const map = require("./map");
const c = require("./camera");
const cr = require("./car");

const config = {
    screen: {
        width:500,
        height:500,
        title: "Map",
        fps: 50,
    },
    map: {
        x: 0,
        y:0,
        width: 2000,
        height: 2000,
    },
    block:{width:100,height:100},
    cameras : [
        {x:0, y: 0, width:500, height:500, velcity: {vx:5, vy:5}},
        {x:0, y: 0, width:500, height:500, velcity: {vx:5, vy:5}},
        {x:0, y: 0, width:500, height:500, velcity: {vx:5, vy:5}},
        {x:0, y: 0, width:500, height:500, velcity: {vx:5, vy:5}},
    ],
    
}

function setup(){
    const {screen, block} = config;
    r.InitWindow(screen.width, screen.height, screen.title)
    r.SetTargetFPS(screen.fps)

    const blocks = map.getRadomBlocksInsideMap(config.map, 50, block, 100)
    const cars = cr.getCars(40, 80, 50, 5)

    config.blocks = blocks;
    config.focusCamera = config.cameras[0];
    config.cars = cars;
    return config
}

function update(world){
    world.focusCamera = c.changeCamera(world.focusCamera, world.cameras);
    console.log(world.focusCamera);
    
    moveCamera(world.focusCamera, world.map)
    const blocks = c.getUpdatedObjects(world.focusCamera, world.blocks);
    map.drawBlocks(blocks);

    const updatedCars = c.getUpdatedObjects(world.focusCamera, world.cars);
    cr.drawCars(updatedCars)

    cr.moveCars(world.cars)
}

function draw(world){
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    // cr.drawCar(world.cars)
    
    r.EndDrawing()
}

function addCamera(cam) {
    r.DrawRectangleLines(cam.x, cam.y, cam.width, cam.height, r.RED)
}

function constrainCamera(camera, screen) {
    const minX = screen.x ;
    const maxX = screen.x + screen.width;
    const minY = screen.y;
    const maxY = screen.y + screen.height

    if(camera.x <= minX){
        camera.x = minX
    }
    if(camera.x >= maxX){
        camera.x = maxX
    }
    if(camera.y <= minY){
        camera.y = minY
    }
    if(camera.y >= maxY){
        camera.y = maxY
    }
}

function moveCamera(cam, screen) {
    if(r.IsKeyDown(r.KEY_LEFT)){
        cam.x -= cam.velcity.vx
    }
    if(r.IsKeyDown(r.KEY_RIGHT)){
        cam.x += cam.velcity.vx
    }
    if(r.IsKeyDown(r.KEY_UP)){
        cam.y -= cam.velcity.vy
    }
    if(r.IsKeyDown(r.KEY_DOWN)){
        cam.y += cam.velcity.vy
    }
    constrainCamera(cam, screen)
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