export default class Level1 extends Phaser.Scene {
  constructor() {
    super('Level1');
  }

  preload() {
    this.load.image('level-bg', '../../assets/backgrounds/foresta.png');
    this.load.image('ground', '../../assets/ui/platform.png');
    this.load.image('coin', '../../assets/ui/coin.png');
    this.load.image('supercoin', '../../assets/ui/golden_acorn.png');
    this.load.image('sign', '../../assets/ui/sign.png');
    this.load.image('cloud', '../../assets/ui/cloud.png');
    
    // Caricamento nemici
    this.load.image('snake', '../../assets/enemies/snake.png');
    this.load.image('owl', '../../assets/enemies/owl.png');
    this.load.image('fox', '../../assets/enemies/fox.png');
    this.load.image('badger', '../../assets/enemies/badger.png');
    this.load.image('hawk', '../../assets/enemies/hawk.png');
    this.load.image('boss', '../../assets/enemies/boss.png');
    
    // Carica il nuovo spritesheet
    this.load.spritesheet('chinchilla', '../../assets/sprites/chinchilla_spritesheet.png', { 
      frameWidth: 70, 
      frameHeight: 70 
    });
  }

  create() {
    // Imposta lo sfondo per coprire tutta l'area di gioco
    this.add.image(400, 300, 'level-bg').setOrigin(0.5, 0.5).setScale(1.0).setDepth(-1);

    // Imposta la piattaforma in basso come pavimento
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(600, 780, 'ground').setScale(0.2).refreshBody();

    this.player = this.physics.add.sprite(100, 650, 'chinchilla');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

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
    this.coins = this.physics.add.group({ key: 'coin', repeat: 5, setXY: { x: 100, y: 700, stepX: 150 } });
    this.coins.children.iterate((coin) => {
      coin.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      coin.setScale(0.1);
    });
    this.physics.add.collider(this.coins, this.platforms);
    this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
    
    this.supercoins = this.physics.add.group({ key: 'supercoin', repeat: 1, setXY: { x: 500, y: 600, stepX: 300 } });
    this.supercoins.children.iterate((supercoin) => {
      supercoin.setScale(0.1);
    });
    this.physics.add.overlap(this.player, this.supercoins, this.collectSuperCoin, null, this);
  }

  createEnemies() {
    this.enemies = this.physics.add.group();
    this.enemies.create(500, 700, 'fox').setScale(0.2).setCollideWorldBounds(true);
    this.enemies.create(600, 700, 'badger').setScale(0.2).setCollideWorldBounds(true);
    this.enemies.create(800, 700, 'snake').setScale(0.2).setCollideWorldBounds(true);
    
    // Nemici volanti posizionati in alto
    this.enemies.create(300, 220, 'owl').setScale(0.2);
    this.enemies.create(700, 150, 'hawk').setScale(0.2);
    
    this.physics.add.collider(this.enemies, this.platforms);
  }

  createClouds() {
    this.add.image(600, 100, 'cloud').setScale(0.2);
    this.add.image(300, 50, 'cloud').setScale(0.2);
  }

  createSigns() {
    this.add.image(150, 550, 'sign').setScale(0.2);
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





