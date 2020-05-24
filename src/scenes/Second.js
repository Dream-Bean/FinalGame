class Second extends Phaser.Scene {
    constructor() {
        super("secondScene");
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
        let airLayer = map.createStaticLayer("air", [terrain], 0, 0); //.setDepth(-1);
        let wallLayer = map.createStaticLayer("walls", [terrain], 0, 0);
        

        this.portal = new Portal(this, 160, -10).setScale(6, 1);
        this.p1 = new Player(this, 1140, 650, 'puffer').setScale(1);

        // colliders
        wallLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.p1, wallLayer)

        // spikes kill player
        wallLayer.setTileIndexCallback([4, 5, 6], () => {
            this.p1.alpha = 0;
            //set game over
        });

    }

    update() {
        if (this.physics.overlap(this.p1, this.portal)) {
            this.scene.start("thirdScene");
        }

        this.p1.update();
    }

    msg() {
        console.log("pog");
    }

}