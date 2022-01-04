class Spawner {
    constructor(config, spawnLocations, addObject, deleteObject) {
        const {
            id,
            spawnInterval,
            limit,
            objectType,
        } = config
        this.id = id
        this.spawnInterval = spawnInterval
        this.limit = limit
        this.objectType = objectType

        this.spawnLocations = spawnLocations
        this.addObject = addObject
        this.deleteObject = deleteObject

        this.objectsCreated = []

        this.start()
    }

    start() {
        this.spawnIntervalId = setInterval(() => {
            if (this.objectsCreated.length < this.limit) {
                this.spawnObject()
            }
        }, this.spawnInterval)
    }

    spawnObject() {
        if (this.objectType === SpawnerType.Chest) {
            this.spawnChest()
        } else if (this.objectType === SpawnerType.Monster) {
            this.spawnMonster()
        }
    }

    spawnChest() {
        // pick a random location
        const {x, y} = this.pickRandomLocation()
        // create chest
        const chest = new ChestModel(this.id, x, y, randomInt(10, 20))

        this.objectsCreated.push(chest)
        // add chest to game
        this.addObject(chest)
    }

    spawnMonster() {
        // pick a random location
        const {x, y} = this.pickRandomLocation()
        // create monster
        const monster = new MonsterModel(
            this.id,
            x, y,
            randomInt(10, 20),
            randomInt(0, 19),
            randomInt(3, 5),
            1
        )

        this.objectsCreated.push(monster)
        // add monster to game
        this.addObject(monster)
    }

    pickRandomLocation() {
        const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)]
        const invalidLocation = this.objectsCreated.some(({x, y}) => x === location.x && y === location.y)
        if (invalidLocation) {
            return this.pickRandomLocation()
        }
        return location
    }

    removeObject(id) {
        const index = this.objectsCreated.findIndex(object => object.id === id)
        this.objectsCreated.splice(index, 1)
        this.deleteObject(id)
    }
}