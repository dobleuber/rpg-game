class Monster extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame, id, health) {
        super(scene, x, y, key, frame)
        this.scene = scene
        this.id = id
        this.health = health
        this.maxHealth = health
        
        this.scene.physics.world.enable(this)
        this.setImmovable(false)

        this.setScale(2)
        this.setCollideWorldBounds(true)

        // add the monster to the scene
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