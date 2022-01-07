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
        this.setOrigin(0, 0)
        this.createHealthBar()
    }

    createHealthBar() {
        // create the health bar
        this.healthBar = this.scene.add.graphics()
        this.updateHealthBar()
    }

    updateHealthBar() {
        this.healthBar.clear()
        this.healthBar.fillStyle(0xffffff, 1)
        this.healthBar.fillRect(this.x, this.y - 10, this.width * 2, 5)
        this.healthBar.fillGradientStyle(0xff0000, 0xffffff, 4)
        this.healthBar.fillRect(this.x, this.y - 10, this.width * 2 * this.health / this.maxHealth, 5)
    }

    updateHealth(health) {
        this.health = health
        this.updateHealthBar()
    }

    makeInactive() {
        this.setActive(false)
        this.setVisible(false)

        // disable collision
        this.body.checkCollision.none = true
        this.healthBar.clear()
        
    }
    
    makeActive() {
        this.setActive(true)
        this.setVisible(true)
        this.body.checkCollision.none = false
        this.updateHealthBar()
    }
}