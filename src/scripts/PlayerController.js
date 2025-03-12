export function addTouchControls(scene, player) {
    scene.input.on('pointerdown', (pointer) => {
      if (pointer.x < scene.game.config.width / 2) {
        player.setVelocityX(-160);
      } else {
        player.setVelocityX(160);
      }
      if (player.body.touching.down) {
        player.setVelocityY(-330);
      }
    });
  
    scene.input.on('pointerup', () => {
      player.setVelocityX(0);
    });
  }
  