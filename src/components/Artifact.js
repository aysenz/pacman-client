class Artifact extends Phaser.Circle {
  constructor(x, y, type) {
    super(x, y, 10)
    this.TYPES = {
      POTATO: 0,
      POTION: 1,
      MEATBALL: 2
    }
    if (!type) this.type = Math.round(2*Math.random())
    else this.type = type
  }
}

export default Artifact