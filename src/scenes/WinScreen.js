export default class WinScreen extends Phaser.Scene {
    constructor() {
      super('WinScreen');
    }
  
    preload() {
      this.load.image('win-bg', '../assets/backgrounds/win.png');
      this.load.image('nextButton', '../assets/ui/next_button.png');
      this.load.image('menuButton', '../assets/ui/menu_button.png');
    }
  
    create() {
      this.add.image(400, 300, 'win-bg');
  
      let nextButton = this.add.image(400, 400, 'nextButton').setInteractive();
      let menuButton = this.add.image(400, 500, 'menuButton').setInteractive();
  
      nextButton.on('pointerdown', () => {
        this.scene.start('Level2'); // Passa al livello 2
      });
  
      menuButton.on('pointerdown', () => {
        this.scene.start('MainMenu');
      });
    }
  }
  