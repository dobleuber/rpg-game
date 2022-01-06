class GameManager {
    constructor(scene, mapData) {
        this.scene = scene
        this.mapData = mapData

        this.spawners = {}
        this.chests = {}
        this.monsters = {}
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
        this.scene.events.on('pickupChest', chestId => {
            // update spawner
            if (this.chests[chestId]) {
                this.spawners[this.chests[chestId].spawnerId].removeObject(chestId)
            }
        })

        this.scene.events.on('monsterAttacked', monsterId => {
            // update spawner
            if (this.monsters[monsterId]) {
                // subtract health from monster
                this.monsters[monsterId].loseHealth()

                if (this.monsters[monsterId].health <= 0) {
                    this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId)
                    this.scene.events.emit('monsterRemoved', monsterId)
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
        const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)]

        this.scene.events.emit('spawnPlayer', location)
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