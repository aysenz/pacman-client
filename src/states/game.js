import Hero from '../components/Hero'
import Artifact from '../components/Artifact';
import ArtifactManager from '../components/ArtifactManager';

class Game extends Phaser.State {

  constructor() {
    super();
  }

  init(args) {
    this.username = args.username
  }

  create() {
    this.hero = new Hero(this.game.world.centerX, this.game.world.centerY, 1, this.username);
    this.artifactManager = new ArtifactManager(this.game, 10, 100)
    this.artifactManager.create()
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
