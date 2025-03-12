export default class Settings extends Phaser.Scene {
    constructor() {
      super('Settings');
    }
  
    preload() {
      this.load.image('settings-bg', '../assets/backgrounds/settings.png');
      this.load.image('backButton', '../assets/ui/back_button.png');
    }
  
    create() {
      this.add.image(400, 300, 'settings-bg');
      let backButton = this.add.image(400, 500, 'backButton').setInteractive();
      
      backButton.on('pointerdown', () => {
        this.scene.start('MainMenu');
      });
    }
  }
  
