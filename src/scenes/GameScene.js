class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        const wall = this.physics.add.image(100, 100, 'button1')
        this.add.image(300, 100, 'button1')
        const box = new Chest(this, 300, 200, 'items')
        this.player = new Player(this, 32, 32, 'characters', 14)

        const goldSound = this.sound.add('goldSound',  { loop: false, volume: 0.5 })

        wall.setImmovable()

        this.physics.add.collider(this.player, wall)
        this.physics.add.overlap(this.player, box, (player, chest) => {
            chest.destroy()
            goldSound.play()
        })

        this.cursor = this.input.keyboard.createCursorKeys()

    }

    update() {
        this.player.update(this.cursor)
    }
}