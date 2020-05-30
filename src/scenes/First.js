class First extends Phaser.Scene {
    constructor() {
        super("firstScene");
    }

    create() {
        //this.cameras.main.setBackgroundColor("#FFFF00");

        // define hotkeys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        // add a tile map
        let map = this.add.tilemap("map1");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");
        
        //layers
        let botLayer = map.createStaticLayer("background", [terrain], 0, 0); //.setDepth(-1);
        let topLayer = map.createStaticLayer("borders", [terrain], 0, 0);
        
        // set camera bounds
        //this.cameras.main.setBounds(0, 0, 200, 200);

        // Play music
        this.music = this.sound.add('bgmusic');
        this.music.play({ volume: 0.2, loop: -1 });

        

        this.portal = new Portal(this, 1115, -10).setScale(6, 1);
        this.p1 = new Player(this, 120, 610, 'puffer').setScale(1);

        // set camera bounds
        //this.cameras.main.setBounds(0, 0, 200, 200);
        this.cameras.main.startFollow(this.p1);

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
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("secondScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyTWO)) {
            this.scene.start("thirdScene");
        }
    }

    // helper functions:

}