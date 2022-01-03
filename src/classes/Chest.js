class Chest extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame, coins, id) {
        super(scene, x, y, key, frame)
        this.scene = scene
        this.coins = coins
        this.id = id

        this.scene.physics.world.enable(this)
        // add the chest to the scene
        this.scene.add.existing(this)

        // scale the chest
        this.setScale(2)
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