import Artifact from './Artifact'

class ArtifactManager {
  constructor(game, min, max) {
    this._game = game
    this._min = min
    this._max = max
    this._artifacts = []
  }
  getAll() { return this._artifacts }
  createOne() {
    let artifact = new Artifact(Math.round(this._game.world.randomX), Math.round(this._game.world.randomY))
    this._artifacts.push(artifact)
  }
  create() {
    let randCount = this._min + Math.round(this._max - this._min * Math.random())
    let i = 0
    while (i < randCount) {
      this.createOne()
      i++
    }
  }
  delete(index) {
    delete this._artifacts[index]
  }
}

export default ArtifactManager