class Map {
    constructor(scene, key, tileSetName, backgroundLayerName, blockedLayerName) {
        this.scene = scene
        this.key = key
        this.tileSetName = tileSetName
        this.backgroundLayerName = backgroundLayerName
        this.blockedLayerName = blockedLayerName
        this.createMap()
    }

    createMap() {
        // create the map
        this.map = this.scene.make.tilemap({ key: this.key });

        // create the tileset image to use with the map
        this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2);

        // create the background image to use with the map
        this.backgroundLayer = this.map.createLayer(this.backgroundLayerName, this.tiles, 0, 0);
        this.backgroundLayer.setDepth(-10)
        this.backgroundLayer.setScale(2)

        // create the blocked layer
        this.blockedLayer = this.map.createLayer(this.blockedLayerName, this.tiles, 0, 0);
        this.blockedLayer.setCollisionByExclusion([-1]);
        this.blockedLayer.setDepth(-5)
        this.blockedLayer.setScale(2)

        // update the world bounds to match the blocked layer
        this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
        this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;

        // limit camera to map
        this.scene.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2);
    }
}