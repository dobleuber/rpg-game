class MonsterModel {
    constructor(spawnerId, x, y, gold, frame, health, attack) {
        this.id = uuid.v4()
        this.spawnerId = spawnerId
        this.x = x * 2
        this.y = y * 2
        this.gold = gold
        this.frame = frame
        this.health = health
        this.maxHealth = health
        this.attack = attack
        this.monterSpeed = 64
    }

    loseHealth() {
        this.health -= 1
    }

    move() {
        const randomPosition = randomInt(1, 8)
        switch (randomPosition) {
            case 1:
                this.x += this.monterSpeed
                break
            case 2:
                this.x -= this.monterSpeed
                break            
            case 3:
                this.y += this.monterSpeed
                break            
            case 4:
                this.y -= this.monterSpeed
                break
            case 5:
                this.x += this.monterSpeed
                this.y += this.monterSpeed
                break
            case 6:
                this.x -= this.monterSpeed
                this.y += this.monterSpeed
                break
            case 7:
                this.x += this.monterSpeed
                this.y -= this.monterSpeed
                break
            case 8:
                this.x -= this.monterSpeed
                this.y -= this.monterSpeed
                break
            default:
                break
        }
    }
}