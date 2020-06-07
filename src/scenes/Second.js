class Second extends Phaser.Scene {
    constructor() {
        super("secondScene");
    }

    create() {
        game.settings.playerDied = false;
        game.settings.gameOver = false;
        game.settings.checkpoint = 0; // 0 1 2

        // define hotkeys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        // add a tile map
        let map = this.add.tilemap("map2");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");
        // layers
        //this.wpBot = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1').setOrigin(0).setScrollFactor(0);
        //this.wpTop = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2').setOrigin(0).setScrollFactor(0);
        //this.wpBlack = this.add.tileSprite(-585, 5, 4166, 5183, 'bgBlack').setOrigin(0); //-70, -5
        let topLayer = map.createStaticLayer("top", [terrain], 0, 0);

        //248VM108 Second.js:99 1177 921.5
        this.player = new Player(this, 1175, 920, 'puffer').setSize(16, 16); // 525, 3990 --- 1820, 3580 --- 1560, 3000
        this.cameras.main.startFollow(this.player);

        //1793.2499999999998 3577.5
        //825 3961.5
        this.t1 = new Turret(this, 1795, 3555, 'undead').setScale(1).setDepth(1);
        this.blast1 = new Bubble(this, this.t1.x, this.t1.y, 'bubble').setScale(1);

        // colliders
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, topLayer)
        //this.physics.add.collider(this.player, this.blast1)
        this.physics.add.collider(this.blast1, topLayer);
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
        // parallax scrolling
        //this.wpBot.tilePositionX = this.cameras.main.scrollX * 0.15;
        //this.wpTop.tilePositionX = this.cameras.main.scrollX * 0.3;

        // game over
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

        // player update
        if (game.settings.gameOver == false) {
            this.player.update();
            console.log(this.player.x, this.player.y);
            if (game.settings.puffSoundTrigger == true) {
                this.sound.play('puffSound', { volume: 1 });
            }
        }

        // turrets shooting
        if (this.physics.overlap(this.player, this.blast1)) {
            game.settings.gameOver = true;
        }
        if (this.blast1.body.velocity.x == 0) {
            this.reload(this.t1, this.blast1, 'left');
        }



        // scene skip
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("secondScene");
            game.settings.deathSoundPlayed = false;
        }
    }

    reload(turret, bubble, direction) {
        // add direction with a left/right param?
        bubble.x = turret.x;
        bubble.y = turret.y;
        if (direction == 'left') {
            bubble.setVelocityX(-100);
        } else if (direction == 'right') {
            bubble.setVelocityX(100);
        }
        turret.anims.play('skeleBlast');
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