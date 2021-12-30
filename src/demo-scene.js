class Scene extends Phaser.Scene {
    preload() {
    }

    create() {
       
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Scene],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 },
        }
    }
};

const game = new Phaser.Game(config)