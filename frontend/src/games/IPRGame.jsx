import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

export default function IPRGame({ onGameOver }) {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: 'phaser-game-container',
      width: 800,
      height: 600,
      backgroundColor: '#0f1021', // cyber-dark
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    let player;
    let items;
    let cursors;
    let score = 0;
    let scoreText;
    let timeRemaining = 30;
    let timerText;
    let timerEvent;

    // We store the game instance so we can destroy it when the component unmounts
    const game = new Phaser.Game(config);
    gameRef.current = game;

    function preload() {
      // In a real app we'd load images. Here we generate some simple graphics.
      const graphics = this.add.graphics();
      
      // Player (Cyber Agent)
      graphics.fillStyle(0x00f5d4, 1); // cyan
      graphics.fillRect(0, 0, 32, 48);
      graphics.generateTexture('player', 32, 48);
      graphics.clear();

      // Good item (Copyright symbol equivalent)
      graphics.fillStyle(0x9d4edd, 1); // purple
      graphics.fillCircle(16, 16, 16);
      graphics.generateTexture('good_item', 32, 32);
      graphics.clear();

      // Bad item (Pirate/Infringement)
      graphics.fillStyle(0xff006e, 1); // pink
      graphics.fillRect(0, 0, 32, 32);
      graphics.generateTexture('bad_item', 32, 32);
      graphics.clear();
      
      // Platform
      graphics.fillStyle(0x3a86ff, 1); // blue
      graphics.fillRect(0, 0, 400, 32);
      graphics.generateTexture('platform', 400, 32);
      graphics.clear();
    }

    function create() {
      // Create ground
      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 584, 'platform').setScale(2).refreshBody();

      // Create player
      player = this.physics.add.sprite(100, 450, 'player');
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      this.physics.add.collider(player, platforms);

      // Create falling items
      items = this.physics.add.group();
      
      this.time.addEvent({
        delay: 1000,
        callback: dropItem,
        callbackScope: this,
        loop: true
      });

      this.physics.add.collider(items, platforms, destroyItem, null, this);
      this.physics.add.overlap(player, items, collectItem, null, this);

      cursors = this.input.keyboard.createCursorKeys();

      scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#00f5d4' });
      timerText = this.add.text(600, 16, 'Time: 30', { fontSize: '32px', fill: '#ff006e' });

      timerEvent = this.time.addEvent({ delay: 1000, callback: updateTimer, callbackScope: this, loop: true });
    }

    function update() {
      if (timeRemaining <= 0) return;

      if (cursors.left.isDown) {
        player.setVelocityX(-400);
      } else if (cursors.right.isDown) {
        player.setVelocityX(400);
      } else {
        player.setVelocityX(0);
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }
    }

    function dropItem() {
      if (timeRemaining <= 0) return;
      const x = Phaser.Math.Between(50, 750);
      const isGood = Phaser.Math.Between(0, 1) === 0;
      const itemType = isGood ? 'good_item' : 'bad_item';
      
      const item = items.create(x, 0, itemType);
      item.setData('isGood', isGood);
      item.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    }

    function destroyItem(item, platform) {
      item.destroy();
    }

    function collectItem(player, item) {
      const isGood = item.getData('isGood');
      if (isGood) {
        score += 10;
        // Float text up
        const floatText = this.add.text(item.x, item.y, '+10', { fontSize: '20px', fill: '#00f5d4' });
        this.tweens.add({ targets: floatText, y: item.y - 50, alpha: 0, duration: 1000, onComplete: () => floatText.destroy() });
      } else {
        score = Math.max(0, score - 5);
        const floatText = this.add.text(item.x, item.y, '-5', { fontSize: '20px', fill: '#ff006e' });
        this.tweens.add({ targets: floatText, y: item.y - 50, alpha: 0, duration: 1000, onComplete: () => floatText.destroy() });
      }
      
      scoreText.setText('Score: ' + score);
      item.destroy();
    }

    function updateTimer() {
      timeRemaining--;
      timerText.setText('Time: ' + timeRemaining);
      if (timeRemaining <= 0) {
        this.physics.pause();
        player.setTint(0xff0000);
        timerEvent.remove();
        
        const gameOverText = this.add.text(400, 300, 'GAME OVER', { fontSize: '64px', fill: '#fff' });
        gameOverText.setOrigin(0.5);
        
        setTimeout(() => {
          if (onGameOver) onGameOver(score);
        }, 2000);
      }
    }

    return () => {
      game.destroy(true);
    };
  }, [onGameOver]);

  return <div id="phaser-game-container" className="rounded-2xl overflow-hidden shadow-game-glow"></div>;
}
