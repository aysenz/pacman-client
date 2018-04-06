import Hero from '../components/Hero'
import Artifact from '../components/Artifact'
import ArtifactManager from '../components/ArtifactManager'
import Physics from '../components/Physics'

class Game extends Phaser.State {

  constructor() {
    super();
  }

  init(args) {
    this.username = args.username
  }

  create() {
    this.artifactManager = new ArtifactManager(this.game, 100, 150)
    this.artifactManager.create()
    this.hero = new Hero(this.game.world.centerX, this.game.world.centerY, this.username);
    this.physics = new Physics()
  }

  render() {
    this.game.debug.geom(this.hero,'#cfffff');
    this.game.debug.text(this.hero.name, this.hero.x - 10, this.hero.y + 25, "#ff1e00", "12px Courier");

    this.artifactManager.getAll().forEach(artifact => {
      let color
      switch (artifact.type) {
        case artifact.TYPES.POTATO:
          color = '#cc9966'
          break;
        case artifact.TYPES.POTION:
          color = '#66cc00'
          break;
        case artifact.TYPES.MEATBALL:
          color = '#990000'
          break;
      }
      this.game.debug.geom(artifact,color);
    });
  }

  update() {
    let globalThis = this
    this.artifactManager.getAll().forEach((artifact, index) => {
      if (globalThis.physics.objectOnObject(globalThis.hero, artifact)) {
        globalThis.hero.eat(artifact)
        globalThis.artifactManager.delete(index)
      }
    })

    if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
      this.hero.x -= this.hero.speed
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
      this.hero.x += this.hero.speed
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
      this.hero.y -= this.hero.speed
    }
    if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
      this.hero.y += this.hero.speed
    }
  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
