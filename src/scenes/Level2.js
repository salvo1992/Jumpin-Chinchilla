export default class Level2 extends Phaser.Scene {
    constructor() {
      super('Level2');
    }
  
    preload() {
      this.load.image('level2-bg', '../../assets/backgrounds/forest2.png');
      this.load.image('ground', '../../assets/ui/platform.png');
      this.load.spritesheet('chinchilla', '../../assets/sprites/chinchilla_spritesheet.png', {
        frameWidth: 64,
        frameHeight: 64
      });
    }
  
    create() {
      this.add.image(400, 300, 'level2-bg');
  
      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  
      this.player = this.physics.add.sprite(100, 450, 'chinchilla');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, platforms);
  
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  
    update() {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
      } else {
        this.player.setVelocityX(0);
      }
  
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }
    }
  }
  