class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('puffer', './assets/pufferfish.png');
        this.load.image('skeleton', './assets/skeletonfish.png');
        this.load.image('tempWall', './assets/SeaFloorTop.png');
        
        //this.load.image("terrain", "./assets/terrain_atlas.png");
        //this.load.tilemapTiledJSON("map", "./assets/practice3.json");    // Tiled JSON file


    }

    create() {
        //this.cameras.main.setBackgroundColor("#FFFF00");

        // add a tile map
        //let map = this.add.tilemap("map");
        //let terrain = map.addTilesetImage("terrain_atlas", "terrain");
        
        //layers
        //let botLayer = map.createStaticLayer("Tile Layer 1", [terrain], 0, 0); //.setDepth(-1);
        //let topLayer = map.createStaticLayer("Tile Layer 2", [terrain], 0, 0);

        // set camera bounds
        //this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // players
        this.p1 = new Player(this, 500, 400, 'puffer').setScale(1);
        this.e1 = new Enemy(this, 700, 400, 'skeleton').setScale(1);
        //x
        this.b1 = new Border(this, 0, 15, 'tempWall').setScale(40, 1);
        this.b2 = new Border(this, 100, 500, 'tempWall').setScale(65, 1);
        //y
        this.b3 = new Border(this, 15, 15, 'tempWall').setScale(1, 40);
        this.b4 = new Border(this, 1010, 15, 'tempWall').setScale(1, 40);

        // define keyboard keys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // colliders
        //this.physics.add.collider(this.p1, this.p2);
        //this.physics.add.collider(this.p1, topLayer);
        //p1 with borders
        this.physics.add.collider(this.p1, this.e1);
        this.physics.add.collider(this.p1, this.b1);
        this.physics.add.collider(this.p1, this.b2);

    }

    update() {


        // player updates
        this.p1.update();

        // if r pressed restart scene

    }

    // helper functions:

}