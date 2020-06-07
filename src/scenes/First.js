class First extends Phaser.Scene {
    constructor() {
        super("firstScene");
    }

    create() {
        game.settings.playerDied = false;
        game.settings.checkpoint = 0; // 0 1 2

        // define hotkeys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        // add a tile map
        let map = this.add.tilemap("map1");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");
        // layers
        this.wpBot = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1').setOrigin(0).setScrollFactor(0);
        this.wpTop = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2').setOrigin(0).setScrollFactor(0);
        this.wpBlack = this.add.tileSprite(-585, 2, 4166, 5183, 'bgBlack').setOrigin(0); //-70, -5
        let topLayer = map.createStaticLayer("top", [terrain], 0, 0);

        this.player = new Player(this, 525, 3990, 'puffer').setSize(16,16); // 1000,3990
        this.cameras.main.startFollow(this.player);

        // colliders
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, topLayer)
        // spikes kill
        topLayer.setTileIndexCallback([6, 7, 8], () => {
            game.settings.gameOver = true;
        });
        /*
        // checkpoint
        topLayer.setTileIndexCallback([?], () => {
            //checkpoint stuff -> maybe so setalpha to 0?
            //also make it matchup with the restarts and stuff
            game.settings.checkpoint = 1; //add condition to move it to checkpoint 2 if it already = 1? idk be careful
            this.backDrop.delete();
            this.playerGhost.delete()
            this.endScreenTextTop.delete();
            this.endScreenTextBot.delete();
            //new location
        });
        */
        // level transition
        topLayer.setTileIndexCallback([25], () => {
            this.scene.start("secondScene");
        });

        // music
        this.music = this.sound.add('bgMusic');
        this.music.play({ volume: 0.2, loop: -1 });
    }

    update() {
        this.wpBot.tilePositionX = this.cameras.main.scrollX * 0.3;
        this.wpTop.tilePositionX = this.cameras.main.scrollX * 0.5;

        if (game.settings.gameOver == true) {
            if (game.settings.playerDied == false) {
                game.settings.playerDied = true;
                this.sound.play('deathSound', { volume: 1 });
                this.music.stop();
                this.player.setAlpha(0);
                this.player.setGravity(0);
                this.player.setVelocity(0);
                this.cameras.main.stopFollow(this.player);
                this.endTimer = this.time.delayedCall(100, () => {
                    this.EndGame();
                }, null, this);
            }
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.start("firstScene");
                game.settings.gameOver = false;
            } else if (Phaser.Input.Keyboard.JustDown(keyM)) {
                this.scene.start("menuScene");
                game.settings.gameOver = false;
            }
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

    EndGame() {
        this.backDrop = this.add.tileSprite(this.player.x, this.player.y, 1050, 600, 'blackSquare').setOrigin(0.5).setAlpha(0.5);
        this.playerGhost = new Player(this, this.player.x, this.player.y - 15, 'puffer').setScale(5).setOrigin(0.5);
        this.playerGhost.anims.play('puffDeath');
        this.playerGhost.setGravity(0);
        this.playerGhost.setVelocity(0);
        this.endScreenTextTop = this.add.tileSprite(this.player.x, this.player.y - 175, 424, 57, 'endTextTop').setOrigin(0.5);
        this.endScreenTextBot = this.add.tileSprite(this.player.x, this.player.y + 175, 363, 95, 'endTextBot').setOrigin(0.5);
    }
}