class GameManager {
    constructor(scene, mapData) {
        this.scene = scene
        this.mapData = mapData

        this.spawners = {}
        this.chests = {}
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

    }

    setupSpawners() {
        // setup chest spawners
       
        Object.keys(this.chestLocation).forEach( id => {
            const config = {
                id: `chest_${id}`,
                spawnInterval: 3000,
                limit: 3,
                objectType: SpawnerType.Chest,
            }

            const spawner = new Spawner(
                config,
                this.chestLocation[id],
                this.addChest.bind(this),
                this.deleteChest.bind(this)
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
}