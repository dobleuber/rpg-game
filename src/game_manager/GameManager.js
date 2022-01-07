class GameManager {
    constructor(scene, mapData) {
        this.scene = scene
        this.mapData = mapData

        this.spawners = {}
        this.chests = {}
        this.monsters = {}
        this.players = {}
        this.playerLocations = []
        this.chestLocation = {}
        this.monsterLocation = {}
    }

    setup() {
        this.parseMapData()
        this.setupEventListeners()
        this.setupSpawners()
        this.spawnPlayer()
    }

    parseMapData() {
        const playersLocations = this.mapData.find( map => map.name === 'player_locations')
        this.playerLocations = playersLocations.objects.map( ({x, y}) => ({x, y}))

        const chestLocations = this.mapData.find( map => map.name === 'chest_locations')

        chestLocations.objects.forEach( ({x, y, properties : {spawner}}) => {
            if (this.chestLocation[spawner]) {
                this.chestLocation[spawner].push({x, y})
            } else {
                this.chestLocation[spawner] = [{x, y}]
            }
        })

        const monsterLocations = this.mapData.find( map => map.name === 'monster_locations')
        
        monsterLocations.objects.forEach( ({x, y, properties : {spawner}}) => {
            if (this.monsterLocation[spawner]) {
                this.monsterLocation[spawner].push({x, y})
            } else {
                this.monsterLocation[spawner] = [{x, y}]
            }
        })
    }

    setupEventListeners() {
        this.scene.events.on('pickupChest', (chestId, playerId) => {
            // update spawner
            if (this.chests[chestId]) {
                const chest = this.chests[chestId]
                const player = this.players[playerId]
                const {gold} = chest
                player.updateGold(gold)
                this.spawners[chest.spawnerId].removeObject(chestId)
                this.scene.events.emit('updateScore', player.gold)
                this.scene.events.emit('chestRemoved', chestId)
            }
        })

        this.scene.events.on('monsterAttacked', monsterId => {
            const monster = this.monsters[monsterId]
            // update spawner
            if (monster) {
                // subtract health from monster
                monster.loseHealth()

                if (monster.health <= 0) {
                    this.spawners[monster.spawnerId].removeObject(monsterId)
                    this.scene.events.emit('monsterRemoved', monsterId)
                } else {
                    this.scene.events.emit('monsterHealthChanged', monsterId, monster.health)
                }
            }
        })

    }

    setupSpawners() {
        // setup chest spawners
        const config = {
            spawnInterval: 3000,
            limit: 3,
        }
       
        Object.keys(this.chestLocation).forEach( id => {
            const chestConfig = {
                ...config,
                id: `chest_${id}`,
                objectType: SpawnerType.Chest,
            }

            const spawner = new Spawner(
                chestConfig,
                this.chestLocation[id],
                this.addChest.bind(this),
                this.deleteChest.bind(this)
            )

            this.spawners[spawner.id] = spawner
        })

        // setup monster spawners
        Object.keys(this.monsterLocation).forEach( id => {
            const monsterConfig = {
                ...config,
                id: `monster_${id}`,
                objectType: SpawnerType.Monster,
            }

            const spawner = new Spawner(
                monsterConfig,
                this.monsterLocation[id],
                this.addMonster.bind(this),
                this.deleteMonster.bind(this)
            )

            this.spawners[spawner.id] = spawner
        })
    }

    spawnPlayer() {
        const player = new PlayerModel(this.playerLocations)
        this.players[player.id] = player

        this.scene.events.emit('spawnPlayer', player)
    }

    addChest(chest) {
        this.chests[chest.id] = chest
        this.scene.events.emit('chestSpawned', chest)
    }

    deleteChest(chestId) {
        delete this.chests[chestId]
    }

    addMonster(monster) {
        this.monsters[monster.id] = monster
        this.scene.events.emit('monsterSpawned', monster)
    }

    deleteMonster(monsterId) {
        delete this.monsters[monsterId]
    }
}