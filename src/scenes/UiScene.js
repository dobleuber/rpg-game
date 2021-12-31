class UiScene extends Phaser.Scene {
    constructor() {
        super('UI');
    }

    init() {
        this.gameScene = this.scene.get('Game')
    }

    create() {
        this.setupUiElements()
        this.setupEvents()
    }

    setupUiElements() {
        this.scoreText = this.add.text(32, 8, 'Coins: 0', {
            fontSize: '16px',
        })

        this.coinIcon = this.add.image(16, 16, 'items', 3)
    }

    setupEvents() {
        this.gameScene.events.on('updateScore', score => {
            this.scoreText.text = `Coins: ${score}`
        })
    }
}