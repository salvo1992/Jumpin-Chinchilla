export default class GameOver extends Phaser.Scene {
    constructor() {
      super('GameOver');
    }
  
    preload() {
      this.load.image('gameover-bg', '../assets/backgrounds/gameover.png');
      this.load.image('restartButton', '../assets/ui/restart_button.png');
      this.load.image('menuButton', '../assets/ui/menu_button.png');
    }
  
    create() {
      this.add.image(400, 300, 'gameover-bg');
  
      let restartButton = this.add.image(400, 400, 'restartButton').setInteractive();
      let menuButton = this.add.image(400, 500, 'menuButton').setInteractive();
  
      restartButton.on('pointerdown', () => {
        this.scene.start('Level1'); // Riparte dal livello 1
      });
  
      menuButton.on('pointerdown', () => {
        this.scene.start('MainMenu');
      });
    }
  }
  