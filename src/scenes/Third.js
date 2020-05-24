class Third extends Phaser.Scene {
    constructor() {
        super("thirdScene");
    }

    create() {
        // define hotkeys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // add a tile map
        let map = this.add.tilemap("map2");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");

        //layers
        let botLayer = map.createStaticLayer("background", [terrain], 0, 0); //.setDepth(-1);
        let topLayer = map.createStaticLayer("borders", [terrain], 0, 0);

        this.p1 = new Player(this, 1180, 630, 'puffer').setScale(1);

        // colliders
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.p1, topLayer)

        topLayer.setCollisionByProperty({ collides: true });
        topLayer.setCollisionByProperty({ kills: true });
        this.physics.add.collider(this.p1, topLayer)
    }

    update() {


        this.p1.update();
    }

}