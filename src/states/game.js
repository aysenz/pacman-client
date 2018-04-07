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
    this.game.world.setBounds(0, 0, 1920, 1200);
    this.artifactManager = new ArtifactManager(this.game, 100, 150)
    this.artifactManager.create()
    this.hero = new Hero(this.game.world.centerX, this.game.world.centerY, this.username);
    this.heroGfx = this.game.add.graphics(this.hero.x, this.hero.y)
    this.heroGfxName = this.game.add.text(0, 0, this.username, { fill: '#00f', fontSize: '12px' })
    this.physics = new Physics()
  }

  render() {
    this.heroGfx.clear()
    this.heroGfx.beginFill(0xcfffff, 1)
    this.heroGfx.drawCircle(0, 0, this.hero.diameter)
    // this.heroGfx.endFill()
    this.heroGfx.x = this.hero.x
    this.heroGfx.y = this.hero.y
    this.heroGfxName.x = this.hero.x - this.heroGfxName.width / 2
    this.heroGfxName.y = this.hero.y - this.heroGfxName.height / 3

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
    this.game.camera.x = this.hero.x - window.innerWidth / 2
    this.game.camera.y = this.hero.y - window.innerHeight / 2
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
