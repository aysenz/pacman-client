import Hero from './Hero'

class HeroManager {
  constructor(game) {
    this._game = game
    this._heroes = []
  }
  get(id) {
    var idx = this._getIndex(id)
    if (idx == void 0) return void 0
    return this._heroes[idx]
  }
  getAll() { return this._heroes }
  createOne(id, x, y, diameter, name) {
    let hero = new Hero(id, x, y, diameter, name)
    hero.create(this._game)
    this._heroes.push(hero)
  }
  render() {
    for (let i = 0; i < this._heroes.length; i++) {
      this._heroes[i].render()
    }
  }
  createAll(heroes) {
    var extThis = this
    heroes.forEach(e => extThis.createOne(e.id, e.x, e.y, e.diameter, e.name))
  }
  delete(id) {
    var idx = this._getIndex(id)
    delete this._heroes[idx]
  }
  setPosition(id, position) {
    var idx = this._getIndex(id)
    if (idx == void 0) return false
    this._heroes[idx].x = position.x
    this._heroes[idx].y = position.y
    this._heroes[idx].diameter = position.diameter
  }
  _getIndex(id) {
    var idx = void 0
    this._heroes.forEach((a, i) => {
      if (a.id == id) idx = i
    })
    return idx
  }
}

export default HeroManager