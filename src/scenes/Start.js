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
        this.load.tilemapTiledJSON("map", "./assets/level1.json");


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

        this.portal = new Portal(this, 1025, -10).setScale(8, 1);
        //this.b2 = new Border(this, 0, 655).setScale(80, 1);
        //this.bgArt = this.add.tileSprite(0, 0, 0, 0, 'lvl1').setScale(2).setOrigin(0);

        // define hotkeys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Play music
        this.music = this.sound.add('bgmusic');
        this.music.play({ volume: 0.2, loop: -1 });

        
        //this.b1 = new Border(this, 0, 15, 'tempWall').setScale(65, 1);
        
       // this.b3 = new Border(this, 15, 15, 'tempWall').setScale(1, 50);
        //this.b4 = new Border(this, 1265, 15, 'tempWall').setScale(1, 50);
        //this.b4 = new Border(this, 1265, 15, 'tempWall').setScale(1, 50);
        this.e1 = new Enemy(this, 800, 400, 'skeleton').setScale(1);
        this.p1 = new Player(this, 600, 400, 'puffer').setScale(2);


        // colliders
        //this.physics.add.collider(this.p1, this.p2);
        //this.physics.add.collider(this.p1, topLayer);
        this.physics.add.collider(this.p1, this.e1);
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.p1, topLayer)
        //this.physics.add.collider(this.p1, this.b1);
        //this.physics.add.collider(this.p1, this.b2);
       // this.physics.add.collider(this.p1, this.b3);
        //this.physics.add.collider(this.p1, this.b4);

    }

    update() {
        if(this.physics.overlap(this.p1, this.portal)) {
            this.scene.start("secondScene");
        }
        
        this.p1.update();

        
        // if r pressed restart scene
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("secondScene");
        }
    }

    // helper functions:

}