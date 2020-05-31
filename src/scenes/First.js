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
        this.wpBot = this.add.tileSprite(0, 0, 1280, 704, 'img1').setOrigin(0);
        this.wpTop = this.add.tileSprite(0, 0, 1280, 704, 'img2').setOrigin(0);
        let topLayer = map.createStaticLayer("top", [terrain], 0, 0);
        
        // set camera bounds
        //this.cameras.main.setBounds(0, 0, 200, 200);

        
        this.p1 = new Player(this, 120, 610, 'puffer').setScale(1);

        // set camera bounds
        //this.cameras.main.setBounds(0, 0, 200, 200);
        //this.cameras.main.startFollow(this.p1);

        // colliders
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.p1, topLayer)

        // spikes kill player
        topLayer.setTileIndexCallback([6, 7, 8], () => {
            this.p1.setAlpha(0);
            game.settings.gameOver = true; //switch to true
            //set game over
        });

        topLayer.setTileIndexCallback([25], () => {
            this.scene.start("secondScene");
        });

        this.gameText = this.add.text(game.config.width / 2, game.config.height / 2, "Press R to Restart").setScale(2).setOrigin(0.5);
        this.gameText.setVisible(false);

    }

    update() {
        if (game.settings.gameOver == true) {
            this.gameText.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                game.settings.gameOver = false;
                this.gameText.setVisible(false);
                this.scene.restart();
            }
        }

        this.p1.update();

        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("secondScene");
        }

    }

}