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
        this.createMap()
        
        this.createChestGroup()

        this.goldSound = this.sound.add('goldSound', {
            loop: false,
            volume: 0.5
        })

        this.cursor = this.input.keyboard.createCursorKeys()

        this.createGameManager()
    }

    update() {
        if(this.player) {
            this.player.update(this.cursor)
        }
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

        this.events.emit('pickupChest', chest.id)
    }

    createChestGroup() {
        this.chests = this.physics.add.group()
    }

    spawnChest(chestObject) {
        
        let chest = this.chests.getFirstDead();
        const {x, y, gold, id} = chestObject

        if (!chest) {
            const chest = new Chest(this, x * 2, y * 2, 'items', 0, gold, id);
            // add chest to chests group
            this.chests.add(chest);
        } else {
            chest.id = id
            chest.coins = gold
            chest.setPosition(x * 2, y * 2);
            chest.makeActive();
        }
    }

    setupColliders() {
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this)
        this.physics.add.collider(this.player, this.map.blockedLayer)
    }

    createMap() {
        // create the map
        this.map = new Map(this, 'map', 'background', 'background', 'blocked')
    }

    createGameManager() {
        this.events.on('spawnPlayer', ({x, y}) => {
            this.player = new Player(this, x * 2, y * 2, 'characters', 14)
            this.setupColliders()
        })

        this.events.on('chestSpawned', chest => {
            this.spawnChest(chest)
        })


        this.gameManager = new GameManager(this, this.map.map.objects)
        this.gameManager.setup()
    }
}