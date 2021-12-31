class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.scene.launch('UI')
        this.maxNumberOfChests = 3
        this.chestPositions = [
            [100, 100],
            [300, 100],
            [500, 100],
            [100, 300],
            [300, 300],
            [500, 300]
        ]
        this.score = 0
    }

    create() {
        this.wall = this.physics.add.image(100, 400, 'button1')
        this.add.image(300, 100, 'button1')
        this.player = new Player(this, 32, 32, 'characters', 14)
        this.createChests()

        this.goldSound = this.sound.add('goldSound', {
            loop: false,
            volume: 0.5
        })

        this.wall.setImmovable()

        this.cursor = this.input.keyboard.createCursorKeys()

        this.setupColliders()

    }

    update() {
        this.player.update(this.cursor)
    }

    collectChest(player, chest) {
        // play gold pickup sound
        this.goldSound.play()
        // update our score
        this.score += chest.coins;
        // update score in the ui
        this.events.emit('updateScore', this.score);
        // make chest game object inactive
        chest.makeInactive();
        // spawn a new chest
        this.time.delayedCall(1000, this.spawnChest, [], this);
    }

    createChests() {
        this.chests = this.physics.add.group()
        for (let i = 0; i < this.maxNumberOfChests; i++) {
            this.spawnChest()
        }
    }

    spawnChest() {
        const [x, y] = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)];

        let chest = this.chests.getFirstDead();

        if (!chest) {
            const chest = new Chest(this, x, y, 'items', 0);
            // add chest to chests group
            this.chests.add(chest);
        } else {
            chest.setPosition(x, y);
            chest.makeActive();
        }
    }

    setupColliders() {
        this.physics.add.collider(this.player, this.wall)
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this)
    }
}