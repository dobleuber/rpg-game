class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.scene.launch('UI')
    }

    create() {
        this.createMap()

        this.createGroups()

        this.goldSound = this.sound.add('goldSound', {
            loop: false,
            volume: 0.5
        })

        this.cursor = this.input.keyboard.createCursorKeys()

        this.createGameManager()
    }

    update() {
        if (this.player) {
            this.player.update(this.cursor)
        }
    }

    collectChest(player, chest) {
        // play gold pickup sound
        this.goldSound.play()

        this.events.emit('pickupChest', chest.id, player.id)
    }

    enemyOverlap(player, monster) {
        if (this.player.playerAttacking && !this.player.swordHit) {
            this.player.swordHit = true
            this.events.emit('monsterAttacked', monster.id)
        }
    }

    createGroups() {
        this.chests = this.physics.add.group()
        this.monsters = this.physics.add.group()
    }

    spawnChest(chestObject) {

        let chest = this.chests.getFirstDead();
        const {
            x,
            y,
            gold,
            id
        } = chestObject

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

    spawnMonster(monsterObject) {
        let monster = this.monsters.getFirstDead();
        const {
            x,
            y,
            id,
            frame,
            health
        } = monsterObject

        if (!monster) {
            const monster = new Monster(this,
                x * 2,
                y * 2,
                'monsters',
                frame,
                id,
                health
            );
            // add chest to chests group
            this.monsters.add(monster);
        } else {
            monster.id = id
            monster.health = health
            monster.maxHealth = health
            monster.setPosition(x * 2, y * 2)
            monster.setTexture('monsters', frame)
            monster.makeActive()
        }
    }

    setupColliders() {
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this)
        this.physics.add.collider(this.player, this.map.blockedLayer)
        this.physics.add.collider(this.monsters, this.map.blockedLayer)
        this.physics.add.overlap(this.player.weapon, this.monsters, this.enemyOverlap, null, this)

    }

    createMap() {
        // create the map
        this.map = new Map(this, 'map', 'background', 'background', 'blocked')
    }

    createGameManager() {
        this.events.on('spawnPlayer', ({
            x,
            y,
            health,
            id
        }) => {
            this.player = new PlayerContainer(this, x * 2, y * 2, 'characters', 14, health, id)
            this.setupColliders()
        })

        this.events.on('chestSpawned', chest => {
            this.spawnChest(chest)
        })

        this.events.on('monsterSpawned', monster => {
            this.spawnMonster(monster)
        })

        this.events.on('monsterRemoved', monsterId => {
            this.monsters.getChildren().forEach(monster => {
                if (monster.id === monsterId) {
                    monster.makeInactive()
                }
            })
        })

        this.events.on('chestRemoved', chestId => {
            this.chests.getChildren().forEach(chest => {
                if (chest.id === chestId) {
                    chest.makeInactive()
                }
            })
        })

        this.events.on('monsterHealthChanged', (monsterId, monsterHealth) => {
            this.monsters.getChildren().forEach(monster => {
                if (monster.id === monsterId) {
                    monster.updateHealth(monsterHealth)
                }
            })
        })

        this.gameManager = new GameManager(this, this.map.map.objects)
        this.gameManager.setup()
    }
}