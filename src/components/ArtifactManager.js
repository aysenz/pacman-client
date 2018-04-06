import Artifact from './Artifact'

class ArtifactManager {
  constructor(game, min, max) {
    this._game = game
    this._min = min
    this._max = max
    this._artifacts = []
  }
  getAll() { return this._artifacts }
  create() {
    let artifact = new Artifact(Math.round(this._game.world.randomX), Math.round(this._game.world.randomY), 1)
    this._artifacts.push(artifact)
  }
}

export default ArtifactManager