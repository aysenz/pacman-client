class Artifact extends Phaser.Circle {
  constructor(id, x, y, diameter, type) {
    super(x, y, diameter)
    this.id = id
    this.TYPES = {
      POTATO: 0,
      POTION: 1,
      MEATBALL: 2
    }
    this.type = type
  }
}

export default Artifact