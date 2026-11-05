function getRandomValue(range){
    return range.start + Math.floor(Math.random()*(range.end-range.start+1))
}

function getRandomValueInStep(range, step) {
    return getRandomValue({start: range.start/step, end: range.end/step}) * step
}

function isInRange(range, point) {
    return point >= range.start && point <= range.end
}

module.exports={
    getRandomValue, getRandomValueInStep, isInRange
}