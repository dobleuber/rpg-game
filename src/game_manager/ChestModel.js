class ChestModel {
    constructor(spawnerId, x, y, gold) {
        this.id = uuid.v4()
        this.spawnerId = spawnerId
        this.x = x
        this.y = y
        this.gold = gold
    }
}