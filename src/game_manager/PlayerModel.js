class PlayerModel {
    constructor(spawnLocations) {
        this.health = 3
        this.maxHealth = 3
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

    updateHealth(health) {
        this.health += health
    }

    respawn() {
        this.health = this.maxHealth
        const {x, y} = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)]
        this.x = x
        this.y = y
    }
}