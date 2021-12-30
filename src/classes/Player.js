class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)
        this.scene = scene
        this.velocity = 100

        this.scene.physics.world.enable(this)
        this.setImmovable(false)

        this.setScale(2)
        this.setCollideWorldBounds(true)

        // add the player to the scene
        this.scene.add.existing(this)
    }

    update(cursor) {
        this.body.setVelocity(0)

        if (cursor.left.isDown) {
            this.body.setVelocityX(-this.velocity)
        } else if (cursor.right.isDown) {
            this.body.setVelocityX(this.velocity)
        }

        if (cursor.up.isDown) {
            this.body.setVelocityY(-this.velocity)
        } else if (cursor.down.isDown) {
            this.body.setVelocityY(this.velocity)
        }
    }
}