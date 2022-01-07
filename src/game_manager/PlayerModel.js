class PlayerModel {
    constructor(spawnLocations) {
        this.health = 10
        this.maxHealth = 10
        this.gold = 0
        this.id = `player-${uuid.v4()}`
        this.spawnLocations = spawnLocations
        const {x, y} = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)]
        this.x = x
        this.y = y
    }

    updateGold(gold) {
        this.gold += gold
    }
}