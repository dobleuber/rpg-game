class UiButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, hoverKey, text, targetCallback) {
        super(scene, x, y)
        this.scene = scene

        this.x = x
        this.y = y
        this.key = key // image key
        this.hoverKey = hoverKey // image hover key
        this.text = text
        this.targetCallback = targetCallback

        this.createButton()

        this.scene.add.existing(this)
    }

    createButton() {
        this.button = this.scene.add.image(0, 0, this.key)

        this.button.setInteractive()
        this.buttonText = this.scene.add.text(0, 0, this.text, {
            fontSize: '24px',
        })

        Phaser.Display.Align.In.Center(this.buttonText, this.button)

        // add the object to this container
        this.add(this.button)
        this.add(this.buttonText)

        this.button.on('pointerdown', this.targetCallback)
        
        this.button.on('pointerover', () => {
            this.button.setTexture(this.hoverKey)
        })

        this.button.on('pointerout', () => {
            this.button.setTexture(this.key)
        })
    }
}