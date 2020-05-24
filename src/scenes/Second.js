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
        let bgLayer = map.createStaticLayer("background", [terrain], 0, 0); //.setDepth(-1);
        let topLayer = map.createStaticLayer("borders", [terrain], 0, 0);
        let deathLayer = map.createStaticLayer("spikes", [terrain], 0, 0);
        

        this.portal = new Portal(this, 160, -10).setScale(6, 1);
        this.p1 = new Player(this, 1180, 630, 'puffer').setScale(1);

        // colliders
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.p1, topLayer)

        topLayer.setCollisionByProperty({ collides: true });
        //topLayer.setCollisionByProperty({ kills: true });
        this.physics.add.collider(this.p1, topLayer)
        //deathLayer.setTileIndexCallback([3, 4, 5], ()=>{
        //    console.log("pls");
        //});
    }

    update() {
        if (this.physics.overlap(this.p1, this.portal)) {
            this.scene.start("thirdScene");
        }

        //this.physics.overlap(this.p1, this.deathLayer({kills}), this.p1.destroy(), null, this);

        this.p1.update();
    }


}