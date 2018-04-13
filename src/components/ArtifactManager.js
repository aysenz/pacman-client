import Artifact from './Artifact'

class ArtifactManager {
  constructor(game) {
    this._game = game
    this._artifacts = []
  }
  getAll() { return this._artifacts }
  createOne(id, x, y, diameter, type) {
    let artifact = new Artifact(id, x, y, diameter, type)
    this._artifacts.push(artifact)
  }
  createAll(artifacts) {
    var extThis = this
    artifacts.forEach(e => extThis.createOne(e.id, e.x, e.y, e.diameter, e.type))
  }
  delete(id) {
    var idx = this._getIndex(id)
    delete this._artifacts[idx]
  }
  _getIndex(id) {
    var idx
    this._artifacts.forEach((a, i) => {
      if (a.id == id) idx = i
    })
    return idx
  }
}

export default ArtifactManager