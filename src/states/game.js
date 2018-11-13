import Hero from '../components/Hero'
import HeroManager from '../components/HeroManager'
import Artifact from '../components/Artifact'
import ArtifactManager from '../components/ArtifactManager'

class Game extends Phaser.State {

  constructor() {
    super();
  }

  init(args) {
    this.username = args.username
    this.userID = 0
    this.objects = { artifacts: [], heroes: [] }
    var globalThis = this
    this.ws = new WebSocket('ws://' + args.serverIP + ':13254/')
    this.ws.onopen = function() {
      globalThis.ws.send(JSON.stringify({
        'cmd_type': 'connect_new_gamer',
        'name': globalThis.username
      }))
    }
    this.ws.onmessage = function(e) {
      var msg = JSON.parse(e.data)
      switch (msg.cmd_type) {
        case 'your_id':
          globalThis.userID = msg.your_id
          break;
        case 'all_positions':
          globalThis.objects = msg.positions
          globalThis.create()
          break;
        case 'connect_new_gamer':
          if (msg.hero.id != globalThis.userID) {
            globalThis.heroManager.createOne(msg.hero.id, msg.hero.x, msg.hero.y, msg.hero.diameter, msg.hero.name)
          }
          break;
        case 'destroy_hero':
          // globalThis.heroManager.delete(msg.hero_id)
          break;
        case 'destroy_artifact':
          globalThis.artifactManager.delete(msg.artifact_id)
          break;
        case 'move':
          globalThis.heroManager.setPosition(msg.hero_id, msg.position)
          break;
        case 'create_artifact':
          globalThis.artifactManager.createOne(msg.artifact.id, msg.artifact.x, msg.artifact.y, msg.artifact.diameter, msg.artifact.type)
          break;
      }
    }
    this.ws.onclose = function() {
      alert('server is down')
    }
    this.ws.onerror = function(e) {
      console.log(e)
    }
    setInterval(() => {
      if (this.game.input.keyboard.isDown(Phaser.KeyCode.LEFT)) {
        this.ws.send(JSON.stringify({ 'cmd_type': 'move', 'direction': 'left' }))
      }
      if (this.game.input.keyboard.isDown(Phaser.KeyCode.RIGHT)) {
        this.ws.send(JSON.stringify({ 'cmd_type': 'move', 'direction': 'right' }))
      }
      if (this.game.input.keyboard.isDown(Phaser.KeyCode.UP)) {
        this.ws.send(JSON.stringify({ 'cmd_type': 'move', 'direction': 'up' }))
      }
      if (this.game.input.keyboard.isDown(Phaser.KeyCode.DOWN)) {
        this.ws.send(JSON.stringify({ 'cmd_type': 'move', 'direction': 'down' }))
      }
    }, 1000/60)
  }

  create() {
    this.game.world.setBounds(0, 0, 1920, 1200);
    this.artifactManager = new ArtifactManager(this.game)
    this.artifactManager.createAll(this.objects.artifacts)
    this.heroManager = new HeroManager(this.game)
    this.heroManager.createAll(this.objects.heroes)
  }

  render() {
    this.heroManager.render()
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
    let hero = this.heroManager.get(this.userID)
    if (hero != void 0) {
      if (hero.id == this.userID) {
        this.game.camera.x = hero.x - window.innerWidth / 2
        this.game.camera.y = hero.y - window.innerHeight / 2
      }
    }
  }

  endGame() {
    this.game.state.start('gameover');
  }

}

export default Game;
