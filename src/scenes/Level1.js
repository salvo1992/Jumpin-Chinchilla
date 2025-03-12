export default class Level1 extends Phaser.Scene {
    constructor() {
      super('Level1');
    }
  
    preload() {
      this.load.image('level-bg', 'assets/backgrounds/foresta.png');
      this.load.image('ground', 'assets/ui/platform.png');
      this.load.image('coin', 'assets/ui/coin.png');
      this.load.image('supercoin', 'assets/ui/golden_acorn.png');
      this.load.image('sign', 'assets/ui/sign.png');
      this.load.image('cloud', 'assets/ui/cloud.png');
      
      // Caricamento nemici
      this.load.image('snake', 'assets/enemies/snake.png');
      this.load.image('owl', 'assets/enemies/owl.png');
      this.load.image('fox', 'assets/enemies/fox.png');
      this.load.image('badger', 'assets/enemies/badger.png');
      this.load.image('hawk', 'assets/enemies/hawk.png');
      this.load.image('boss', 'assets/enemies/boss.png');
      
      // Carica il nuovo spritesheet
      this.load.spritesheet('chinchilla', 'assets/sprites/chinchilla_spritesheet.png', { 
        frameWidth: 64, 
        frameHeight: 64 
      });
    }
  
    create() {
      this.add.image(400, 300, 'level-bg').setDepth(-1);
  
      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(1).refreshBody();
  
      this.player = this.physics.add.sprite(100, 450, 'chinchilla');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
      this.physics.add.collider(this.player, platforms);
  
      // Creazione elementi di gioco
      this.createCoins();
      this.createEnemies();
      this.createClouds();
      this.createSigns();
  
      // Crea le animazioni del personaggio
      this.createAnimations();
  
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  
    createCoins() {
      this.coins = this.physics.add.group({ key: 'coin', repeat: 5, setXY: { x: 100, y: 0, stepX: 150 } });
      this.coins.children.iterate((coin) => { coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); });
      this.physics.add.collider(this.coins, this.platforms);
      this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
      
      this.supercoins = this.physics.add.group({ key: 'supercoin', repeat: 1, setXY: { x: 500, y: 100, stepX: 300 } });
      this.physics.add.overlap(this.player, this.supercoins, this.collectSuperCoin, null, this);
    }
  
    createEnemies() {
      this.enemies = this.physics.add.group();
      const enemyTypes = ['snake', 'owl', 'fox', 'badger', 'hawk'];
      enemyTypes.forEach((type, index) => {
        let enemy = this.enemies.create(200 + index * 200, 500, type);
        enemy.setBounce(0.2);
        enemy.setCollideWorldBounds(true);
        enemy.setVelocityX(Phaser.Math.Between(-100, 100));
      });
      this.physics.add.collider(this.enemies, this.platforms);
    }
  
    createClouds() {
      this.add.image(600, 100, 'cloud').setScale(0.5);
      this.add.image(300, 50, 'cloud').setScale(0.5);
    }
  
    createSigns() {
      this.add.image(150, 550, 'sign').setScale(0.7);
    }
  
    collectCoin(player, coin) {
      coin.disableBody(true, true);
    }
  
    collectSuperCoin(player, supercoin) {
      supercoin.disableBody(true, true);
    }
  
    update() {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('walk', true);
        this.player.setFlipX(true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('walk', true);
        this.player.setFlipX(false);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('idle', true);
      }
  
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
        this.player.anims.play('jump', true);
      }
  
      if (this.player.body.touching.down && !this.cursors.up.isDown) {
        this.player.anims.play('land', true);
      }
    }
}

