class Chest extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)
        this.scene = scene
        this.coins = 100

        this.scene.physics.world.enable(this)
        // add the chest to the scene
        this.scene.add.existing(this)
    }
}