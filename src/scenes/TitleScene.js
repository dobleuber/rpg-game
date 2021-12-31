class TitleScene extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    create() {
        // create title text
        const { width, height } = this.sys.game.config
        const title = this.add.text(width / 2, height / 2, 'My MMORPGame', {
            fontSize: '64px',
        })
        title.setOrigin(0.5)

        this.startGameButton = new UiButton(this, width / 2, height / 2 + 64, 'button1', 'button2', 'Start Game', () => {
            this.scene.start('Game')
        })
    }
}