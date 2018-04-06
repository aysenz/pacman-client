class Hero extends Phaser.Circle {
  constructor(x, y, level, name) {
    super(x, y, level * 15)
    this.speed = level * 3
    this.level = level
    this.name = name
  }
}

export default Hero