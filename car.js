const r = require("raylib")
const {getRandomColor} = require("./map")
const m = require("./math")



function drawCar(car) {
    r.DrawRectangle(car.x, car.y, car.width, car.height, car.color)
}

function drawCars(cars) {
    for (const car of cars) {
        drawCar(car)
    }
}

function getCars(width, height, gap, count) {
    const cars = [];
    for (let index = 0; index < count; index++) {
        const color = getRandomColor();
        const x =  (index*(gap+width));
        const y = 0;
        const vx = m.getRandomValue({start:1, end: 3})
        const vy = m.getRandomValue({start:1, end: 3})
        cars.push(createCar(x, y, width, height, color, {vx, vy}));
    }

    return cars
}

function createCar(x, y, width, height, color, velocity) {
    return {x, y, width, height, color, velocity}
}

function moveCars(cars) {
    for (const car of cars) {
        car.y += car.velocity.vy
    }   
}



module.exports={
    createCar, drawCars, getCars, moveCars
}