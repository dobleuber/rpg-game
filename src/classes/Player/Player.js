class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)
        this.scene = scene

        this.scene.physics.world.enable(this)
        this.setImmovable(false)

        this.setScale(2)

        // add the player to the scene
        this.scene.add.existing(this)
    }
}