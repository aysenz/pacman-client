import Material from './Material'

class Hero extends Material {
  constructor(x, y, level, name) {
    super(x, y, level * 10, level * 10)
    this.speed = level * 5
    this.name = name
  }
}

export default Hero