class Hero extends Phaser.Circle {
  constructor(id, x, y, diameter, name) {
    super(x, y, diameter)
    this.id = id
    this.name = name
  }
  create(game) {
    this.heroGfx = game.add.graphics(this.x, this.y)
    this.heroGfxName = game.add.text(0, 0, this.name, { fill: '#00f', fontSize: '12px' })
  }
  render() {
    this.heroGfx.clear()
    this.heroGfx.beginFill(0xcfffff, 1)
    this.heroGfx.drawCircle(0, 0, this.diameter)
    // this.heroGfx.endFill()
    this.heroGfx.x = this.x
    this.heroGfx.y = this.y
    this.heroGfxName.x = this.x - this.heroGfxName.width / 2
    this.heroGfxName.y = this.y - this.heroGfxName.height / 3
  }
}

export default Hero