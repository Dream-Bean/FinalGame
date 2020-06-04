class First extends Phaser.Scene {
    constructor() {
        super("firstScene");
    }

    create() {
        game.settings.sceneTracker = 1;
        game.settings.deathSoundPlayed = false;

        // define hotkeys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        // add a tile map
        let map = this.add.tilemap("map1");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");
        
        //layers
        this.wpBot = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'img1').setOrigin(0).setScrollFactor(0);
        this.wpTop = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'img2').setOrigin(0).setScrollFactor(0);
        let topLayer = map.createStaticLayer("top", [terrain], 0, 0);
        
        // set camera bounds
        //this.cameras.main.setBounds(0, 0, 200, 200);

        
        this.p1 = new Player(this, 550, 3450, 'puffer').setScale(1).setSize(16,16); //120, 610 //reduce size of player?
        this.cameras.main.startFollow(this.p1);

        // set camera bounds
        //this.cameras.main.setBounds(0, 0, 200, 200);
        //this.cameras.main.startFollow(this.p1);

        // colliders
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.p1, topLayer)

        // spikes kill player
        topLayer.setTileIndexCallback([6, 7, 8], () => {
            this.p1.setAlpha(0);
            game.settings.gameOver = true;
            if (game.settings.deathSoundPlayed == false) {
                game.settings.deathSoundPlayed = true;
                this.sound.play('deathSound', { volume: 1 });
            }
        });

        topLayer.setTileIndexCallback([25], () => {
            this.scene.start("secondScene");
        });

        // Play music & sounds
        this.music = this.sound.add('bgmusic');
        this.music.play({ volume: 0.2, loop: -1 });
    }

    update() {
        this.wpBot.tilePositionX = this.cameras.main.scrollX * 0.3;
        this.wpBot.tilePositionX = this.cameras.main.scrollY * 0.3;
        this.wpTop.tilePositionX = this.cameras.main.scrollX * 0.5;
        this.wpTop.tilePositionX = this.cameras.main.scrollY * 0.5;

        if (game.settings.gameOver == true) {
            this.music.stop();
            this.sceneSwapTimer = this.time.delayedCall(750, () => {
                this.scene.start("endScene");
            }, null, this);
        }

        this.p1.update();

        if (game.settings.puffSoundTrigger == true) {
            this.sound.play('puffSound', { volume: 1 });
        }
        

        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("secondScene");
            game.settings.deathSoundPlayed = false;
        }

    }
}