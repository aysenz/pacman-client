class Physics {
  constructor() {}
  objectOnObject(objectA, objectB) {
    let diff = this._getDiff(objectA, objectB)
    let distance = this._getDistance(diff)
    let criticalDistance = this._getCriticalDistance(objectA, objectB)
    return distance < criticalDistance ? true : false
  }
  _getDiff(objectA, objectB) {
    let diffByX, diffByY
    if (objectA.x > objectB.x) diffByX = objectA.x - objectB.x
    if (objectA.x < objectB.x) diffByX = objectB.x - objectA.x
    if (objectA.y > objectB.y) diffByY = objectA.y - objectB.y
    if (objectA.y < objectB.y) diffByY = objectB.y - objectA.y
    return { x: diffByX, y: diffByY }
  }
  _getDistance(diff) {
    // теорема пифагора)
    let a = Math.pow(diff.x, 2),
        b = Math.pow(diff.y, 2)
    let c = a + b
    return Math.sqrt(c)
  }
  _getCriticalDistance(objectA, objectB) {
    return (objectA.diameter + objectB.diameter) / 2
  }
}

export default Physics