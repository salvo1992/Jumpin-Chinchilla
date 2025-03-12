import Level1 from './scenes/Level1.js';
import MainMenu from './scenes/MainMenu.js';
import Level2 from './scenes/Level2.js';
import GameOver from './scenes/GameOver.js';
import WinScreen from './scenes/WinScreen.js';
import Settings from './scenes/Settings.js';

const config = {
  type: Phaser.AUTO,
  width: 2000,
  height: 1000,
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 300 }, debug: false }
  },
  scene: [MainMenu, Level1, Level2, GameOver, WinScreen, Settings]
};

new Phaser.Game(config);


