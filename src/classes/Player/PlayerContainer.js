const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
}

class PlayerContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, frame, health, id, attackAudio) {
        super(scene, x, y)
        this.scene = scene
        this.velocity = 160
        this.currentDirection = Direction.RIGHT
        this.playerAttacking = false
        this.flipX = true
        this.swordHit = false
        this.health = health
        this.maxHealth = health
        this.id = id
        this.attackAudio = attackAudio
        
        // set a size to the container
        this.setSize(64, 64)

        this.scene.physics.world.enable(this)

        this.body.setCollideWorldBounds(true)

        // add the player container to the scene
        this.scene.add.existing(this)

        // camera follows the player
        this.scene.cameras.main.startFollow(this)

        // create a player
        this.player = new Player(this.scene, 0, 0, key, frame)
        this.player.flipX = this.flipX
        this.add(this.player)

        // create a sword
        this.weapon = this.scene.add.sprite(40, 0, 'items', 4)
        this.scene.add.existing(this.weapon)
        this.add(this.weapon)
        this.weapon.setScale(1.5)
        this.scene.physics.world.enable(this.weapon)
        this.weapon.alpha = 0

        // create the health bar
        this.createHealthBar()
    }

    update(cursor) {
        this.body.setVelocity(0)

        if (cursor.up.isDown) {
            this.body.setVelocityY(-this.velocity)
            this.currentDirection = Direction.UP
            this.weapon.setPosition(0, -40)
        } else if (cursor.down.isDown) {
            this.body.setVelocityY(this.velocity)
            this.currentDirection = Direction.DOWN
            this.weapon.setPosition(0, 40)
        }

        if (cursor.left.isDown) {
            this.body.setVelocityX(-this.velocity)
            this.currentDirection = Direction.LEFT
            this.weapon.setPosition(-40, 0)
        } else if (cursor.right.isDown) {
            this.body.setVelocityX(this.velocity)
            this.currentDirection = Direction.RIGHT
            this.weapon.setPosition(40, 0)
        }

        if (Phaser.Input.Keyboard.JustDown(cursor.space) && !this.playerAttacking) {
            this.weapon.setAlpha(1)
            this.playerAttacking = true
            this.attackAudio.play()
            this.scene.time.delayedCall(150, () => {
                this.playerAttacking = false
                this.weapon.setAlpha(0)
                this.swordHit = false
            }, [], this)
        }

        if (this.playerAttacking) {
            if(this.weapon.flipX) {
                this.weapon.angle -= 10
            } else {
                this.weapon.angle += 10
            }
        } else {
            if (this.currentDirection === Direction.DOWN) {
                this.weapon.setAngle(90)
            } else if (this.currentDirection === Direction.UP) {
                this.weapon.setAngle(-90)
            } else {
                this.weapon.setAngle(0)
            }
        }

        this.player.flipX = true
        this.weapon.flipX = false
        if(this.currentDirection === Direction.LEFT) {
            this.player.flipX = false
            this.weapon.flipX = true
        }

        this.updateHealthBar()
    }

    createHealthBar() {
        // create the health bar
        this.healthBar = this.scene.add.graphics()
        this.updateHealthBar()
    }

    updateHealthBar() {
        this.healthBar.clear()
        this.healthBar.fillStyle(0xffffff, 1)
        this.healthBar.fillRect(this.x - 32, this.y - 40, this.width, 5)
        this.healthBar.fillGradientStyle(0xff0000, 0xffffff, 4)
        this.healthBar.fillRect(this.x - 32, this.y - 40, this.width * this.health / this.maxHealth, 5)
    }

    updateHealth(health) {
        this.health = health
        this.updateHealthBar()
    }

    respawn(playerObject) {
        this.health = playerObject.health
        this.setPosition(playerObject.x * 2, playerObject.y * 2)
        this.updateHealthBar()
    }
}