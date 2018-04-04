class Menu extends Phaser.State {

  constructor() {
    super();
  }

  preload() {
    this.slickUI = this.game.plugins.add(Phaser.Plugin.SlickUI);
    this.slickUI.load('assets/ui/kenney/kenney.json');
  }

  create() {
    /*
    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'MENU', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    this.input.onDown.add(this.startGame, this);
    */

    // var textField = panel.add(new SlickUI.Element.TextField(10,58, panel.width - 20, 40, 7));
    // textField.events.onOK.add(function () {
    //     alert('Your name is: ' + textField.value);
    // });
    // textField.events.onToggle.add(function (open) {
    //     console.log('You just ' + (open ? 'opened' : 'closed') + ' the virtual keyboard');
    // });
    // textField.events.onKeyPress.add(function(key) {
    //     console.log('You pressed: ' + key);
    // });



    this.game.add.sprite(0,-125,'backdrop');
    var panel;
    this.slickUI.add(panel = new SlickUI.Element.Panel(8, 8, this.game.width - 16, this.game.height - 16));
    panel.add(new SlickUI.Element.Text(10,10, "Pacman")).centerHorizontally().text.alpha = 0.5;
    panel.add(new SlickUI.Element.Text(12,34, "What is your name?"));
    var textField = panel.add(new SlickUI.Element.TextField(10,58, panel.width - 20, 40));
    textField.events.onOK.add(function () {
        alert('Your name is: ' + textField.value);
    });
    textField.events.onToggle.add(function (open) {
        console.log('You just ' + (open ? 'opened' : 'closed') + ' the virtual keyboard');
    });
    textField.events.onKeyPress.add(function(key) {
        console.log('You pressed: ' + key);
    });
    var button;
    panel.add(button = new SlickUI.Element.Button(this.game.width/2 - 140/2,this.game.height/2 - 80/2 - 8, 140, 80));
    button.events.onInputUp.add(function () {console.log('Clicked button');});
    button.add(new SlickUI.Element.Text(0,0, "Play")).center();
  }

  update() {}

  startGame () {
    this.game.state.start('game');
  }

}

export default Menu;
