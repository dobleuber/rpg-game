const MAX_HEALTH = 10;
class PlayerModel {
    constructor(spawnLocations) {
        this.health = MAX_HEALTH
        this.maxHealth = MAX_HEALTH
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
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth
        }
    }

    respawn() {
        this.health = this.maxHealth
        const {x, y} = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)]
        this.x = x
        this.y = y
    }
}