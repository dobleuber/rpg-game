class Chest extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)
        this.scene = scene
        this.coins = 10

        this.scene.physics.world.enable(this)
        // add the chest to the scene
        this.scene.add.existing(this)
    }

    makeInactive() {
        this.setActive(false)
        this.setVisible(false)

        // disable collision
        this.body.checkCollision.none = true
        
    }
    
    makeActive() {
        this.setActive(true)
        this.setVisible(true)
        this.body.checkCollision.none = false
    }
}