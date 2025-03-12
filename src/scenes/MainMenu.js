export default class MainMenu extends Phaser.Scene {
    constructor() {
      super('MainMenu');
    }
  
    preload() {
      this.load.image('menu-bg', '../assets/backgrounds/menu.png');
      this.load.image('playButton', '../assets/ui/play_button.png');
      this.load.image('settingsButton', '../assets/ui/settings_button.png');
      this.load.image('exitButton', '../assets/ui/exit_button.png');
    }
  
    create() {
      this.add.image(400, 300, 'menu-bg');
      
      let playButton = this.add.image(400, 300, 'playButton').setInteractive();
      let settingsButton = this.add.image(400, 400, 'settingsButton').setInteractive();
      let exitButton = this.add.image(200, 500, 'exitButton').setInteractive();
  
      playButton.on('pointerdown', () => {
        this.scene.start('Level1');
      });
  
      settingsButton.on('pointerdown', () => {
        this.scene.start('Settings');
      });
  
      exitButton.on('pointerdown', () => {
        this.game.destroy(true);
      });
    }
  }
  
