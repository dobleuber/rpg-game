class MonsterModel {
    constructor(spawnerId, x, y, gold, frame, health, attack) {
        this.id = uuid.v4()
        this.spawnerId = spawnerId
        this.x = x
        this.y = y
        this.gold = gold
        this.frame = frame
        this.health = health
        this.maxHealth = health
        this.attack = attack
    }

    loseHealth() {
        this.health -= 1
    }
}