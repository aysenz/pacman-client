class Artifact extends Phaser.Circle {
  constructor(x, y, level) {
    super(x, y, level * 10)
    this.level = level
    this.TYPES = {
      POTATO: 0,
      POTION: 1,
      MEATBALL: 2
    }
    this.type = Math.round(2*Math.random())
  }
}

export default Artifact