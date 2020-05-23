class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    preload() {
        this.load.image('puffer', './assets/pufferfish.png');
        this.load.image('skeleton', './assets/skeletonfish.png');
        this.load.image('tempWall', './assets/SeaFloorTop.png');
        this.load.image('tempPortal', './assets/SeaFloorBottom.png');
        this.load.image('lvl1', './assets/lvl1.png');

        this.load.audio('bgmusic', './assets/bgmusic.mp3');
        
        this.load.image("terrain", "./assets/terrain_atlas.png");
        this.load.tilemapTiledJSON("map", "./assets/newlevel1.json");


    }

    create() {
        //this.cameras.main.setBackgroundColor("#FFFF00");

        // add a tile map
        let map = this.add.tilemap("map");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");
        
        //layers
        let botLayer = map.createStaticLayer("background", [terrain], 0, 0); //.setDepth(-1);
        let topLayer = map.createStaticLayer("borders", [terrain], 0, 0);
        
        // set camera bounds
        //this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // define hotkeys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Play music
        this.music = this.sound.add('bgmusic');
        this.music.play({ volume: 0.2, loop: -1 });


        this.portal = new Portal(this, 1115, -10).setScale(6, 1);
        this.p1 = new Player(this, 120, 610, 'puffer').setScale(1);

        // colliders
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.p1, topLayer)

    }

    update() {
        if(this.physics.overlap(this.p1, this.portal)) {
            this.scene.start("secondScene");
        }
        
        this.p1.update();

        
        // if r pressed restart scene
        //if (Phaser.Input.Keyboard.JustDown(keyR)) {
        //    this.scene.start("secondScene");
        //}
    }

    // helper functions:

}