class Hero extends Phaser.Circle {
  constructor(x, y, name) {
    super(x, y, 15)
    this.name = name
    this.speed = 3
  }
  eat(something) {
    switch (something.constructor.name) {
      case 'Artifact':
        this._eatArtifact(something)
        break
      case 'Hero':
        break
    }
  }
  _eatArtifact(artifact) {
    let diameterDiff
    switch (artifact.type) {
      case artifact.TYPES.POTATO:
        diameterDiff = artifact.diameter / this.diameter
        this.diameter += diameterDiff * 15
        break
      case artifact.TYPES.POTION:
        diameterDiff = artifact.diameter / this.diameter
        if (this.diameter >= 15) {
          this.diameter -= diameterDiff * 15
          if (this.diameter < 15) this.diameter = 15
        }
        break
      case artifact.TYPES.MEATBALL:
        break
    }
  }
}

export default Hero