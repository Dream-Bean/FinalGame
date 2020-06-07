class First extends Phaser.Scene {
    constructor() {
        super("firstScene");
    }

    create() {
        game.settings.sceneTracker = 1;
        game.settings.playerDied = false;

        // define hotkeys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        // add a tile map
        let map = this.add.tilemap("map1");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");
        // layers
        this.wpBot = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'img1').setOrigin(0).setScrollFactor(0);
        this.wpTop = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'img2').setOrigin(0).setScrollFactor(0);
        let topLayer = map.createStaticLayer("top", [terrain], 0, 0);

        this.player = new Player(this, 1000, 3990, 'puffer').setSize(16,16);
        this.cameras.main.startFollow(this.player);

        // colliders
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, topLayer)
        // spikes kill player
        topLayer.setTileIndexCallback([6, 7, 8], () => {
            //this.p1.setAlpha(0);
            game.settings.gameOver = true;
            
        });
        // end of lvl
        topLayer.setTileIndexCallback([25], () => {
            this.scene.start("secondScene");
        });

        // music
        //this.music = this.sound.add('bgmusic');
        //this.music.play({ volume: 0.2, loop: -1 });
        
    }

    update() {
        this.wpBot.tilePositionX = this.cameras.main.scrollX * 0.3;
        this.wpTop.tilePositionX = this.cameras.main.scrollX * 0.5;

        if (game.settings.gameOver == true) {
            if (game.settings.playerDied == false) {
                game.settings.playerDied = true;
                this.sound.play('deathSound', { volume: 1 });
                this.player.anims.play('puffDeath');
            }
            //this.music.stop();
            //add some gravity?
            this.sceneSwapTimer = this.time.delayedCall(1000, () => {
                this.scene.start("endScene");
            }, null, this);
        }

        if (game.settings.gameOver == false) {
            this.player.update();
            if (game.settings.puffSoundTrigger == true) {
                this.sound.play('puffSound', { volume: 1 });
            }
        }
        



        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("secondScene");
            game.settings.deathSoundPlayed = false;
        }
    }
}