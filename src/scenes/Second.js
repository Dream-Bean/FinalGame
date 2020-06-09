class Second extends Phaser.Scene {
    constructor() {
        super("secondScene");
    }

    create() {
        // reset variables
        game.settings.playerDied = false;
        game.settings.gameOver = false;
        game.settings.checkpointNumber = 0;

        // define hotkeys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyONE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        keyTWO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        // music
        if (game.settings.musicIsOn == false) {
            this.music = this.sound.add('bgMusic');
            this.music.play({ volume: 0.2, loop: -1 });
            game.settings.musicIsOn = true;
        }

        // add a tile map
        let map = this.add.tilemap("map2");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");
        // layers
        this.wpBot = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1').setScale(2).setOrigin(0).setScrollFactor(0);
        this.wpTop = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2').setScale(2).setOrigin(0).setScrollFactor(0);
        this.wpBlack = this.add.tileSprite(-255, -46, 2560, 2560, 'bgBlack2').setOrigin(0); //-65
        let topLayer = map.createStaticLayer("top", [terrain], 0, 0);

        // player + cam
        this.player = new Player(this, 1770, 1910, 'puffer').setFlipX(true).setSize(16, 16);
        this.cameras.main.startFollow(this.player);

        // checkpoints
        this.cp1 = new Checkpoint(this, 715, 1880).setSize(48, 48).setOrigin(1);
        this.cp2 = new Checkpoint(this, 1037, 600).setSize(112, 48).setOrigin(1);
        this.cp3 = new Checkpoint(this, 1745, 1460).setSize(48, 48).setOrigin(1);
        
        // turrets
        this.t1 = new Turret(this, 850, 1795, 'undead').setScale(1).setFlipX(true).setDepth(1);
        this.t2 = new Turret(this, 700, 1575, 'undead').setScale(1).setDepth(1);
        this.t3 = new Turret(this, 400, 1500, 'undead').setScale(1).setFlipX(true).setDepth(1);
        this.t4 = new Turret(this, 700, 1390, 'undead').setScale(1).setDepth(1);
        this.t5 = new Turret(this, 400, 1305, 'undead').setScale(1).setFlipX(true).setDepth(1);
        this.t6 = new Turret(this, 700, 1205, 'undead').setScale(1).setDepth(1);
        this.t7 = new Turret(this, 400, 1070, 'undead').setScale(1).setFlipX(true).setDepth(1);
        this.t8 = new Turret(this, 700, 1010, 'undead').setScale(1).setDepth(1);
        this.t9 = new Turret(this, 400, 890, 'undead').setScale(1).setFlipX(true).setDepth(1);
        this.t10 = new Turret(this, 760, 810, 'undead').setScale(1).setDepth(1);
        this.t11 = new Turret(this, 700, 690, 'undead').setScale(1).setDepth(1);
        this.t12 = new Turret(this, 1590, 1445, 'undead').setScale(1).setDepth(1);
        this.t13 = new Turret(this, 1815, 1370, 'undead').setScale(1).setDepth(1);
        this.t14 = new Turret(this, 1890, 1045, 'undead').setScale(1).setDepth(1);

        // bubbles
        this.blast1 = new Bubble(this, this.t1.x, this.t1.y, 'bubble').setScale(1);
        this.blast2 = new Bubble(this, this.t2.x, this.t2.y, 'bubble').setScale(1);
        this.blast3 = new Bubble(this, this.t3.x, this.t3.y, 'bubble').setScale(1);
        this.blast4 = new Bubble(this, this.t4.x, this.t4.y, 'bubble').setScale(1);
        this.blast5 = new Bubble(this, this.t5.x, this.t5.y, 'bubble').setScale(1);
        this.blast6 = new Bubble(this, this.t6.x, this.t6.y, 'bubble').setScale(1);
        this.blast7 = new Bubble(this, this.t7.x, this.t7.y, 'bubble').setScale(1);
        this.blast8 = new Bubble(this, this.t8.x, this.t8.y, 'bubble').setScale(1);
        this.blast9 = new Bubble(this, this.t9.x, this.t9.y, 'bubble').setScale(1);
        this.blast10 = new Bubble(this, this.t10.x, this.t10.y, 'bubble').setScale(1);
        this.blast11 = new Bubble(this, this.t11.x, this.t11.y, 'bubble').setScale(1);
        this.blast12 = new Bubble(this, this.t12.x, this.t12.y, 'bubble').setScale(1);
        this.blast13 = new Bubble(this, this.t13.x, this.t13.y, 'bubble').setScale(1);
        this.blast14 = new Bubble(this, this.t14.x, this.t14.y, 'bubble').setScale(1);
        
        // collisions
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, topLayer);
            // player + skeleton
        this.physics.add.collider(this.player, this.t1);
        this.physics.add.collider(this.player, this.t2);
        this.physics.add.collider(this.player, this.t3);
        this.physics.add.collider(this.player, this.t4);
        this.physics.add.collider(this.player, this.t5);
        this.physics.add.collider(this.player, this.t6);
        this.physics.add.collider(this.player, this.t7);
        this.physics.add.collider(this.player, this.t8);
        this.physics.add.collider(this.player, this.t9);
        this.physics.add.collider(this.player, this.t10);
        this.physics.add.collider(this.player, this.t11);
        this.physics.add.collider(this.player, this.t12);
        this.physics.add.collider(this.player, this.t13);
        this.physics.add.collider(this.player, this.t14);
            // bubble + layer
        this.physics.add.collider(this.blast1, topLayer);
        this.physics.add.collider(this.blast2, topLayer);
        this.physics.add.collider(this.blast3, topLayer);
        this.physics.add.collider(this.blast4, topLayer);
        this.physics.add.collider(this.blast5, topLayer);
        this.physics.add.collider(this.blast6, topLayer);
        this.physics.add.collider(this.blast7, topLayer);
        this.physics.add.collider(this.blast8, topLayer);
        this.physics.add.collider(this.blast9, topLayer);
        this.physics.add.collider(this.blast10, topLayer);
        this.physics.add.collider(this.blast11, topLayer);
        this.physics.add.collider(this.blast12, topLayer);
        this.physics.add.collider(this.blast13, topLayer);
        this.physics.add.collider(this.blast14, topLayer);

        // spikes kill
        topLayer.setTileIndexCallback([13, 14, 15], () => {
            game.settings.gameOver = true;
        });
        // win condition
        topLayer.setTileIndexCallback([16, 17, 22, 23], () => {
            game.settings.checkpointNumber = 0;
            game.settings.musicIsOn = false;
            this.music.stop();
            this.scene.start("victoryScene");
        });
    }

    update() {
        // parallax scrolling
        this.wpBot.tilePositionX = this.cameras.main.scrollX * 0.15;
        this.wpTop.tilePositionX = this.cameras.main.scrollX * 0.3;

        // game over
        if (game.settings.gameOver == true) {
            if (game.settings.playerDied == false) {
                game.settings.playerDied = true;
                this.sound.play('deathSound', { volume: 1 });
                this.player.setAlpha(0);
                this.player.setGravity(0);
                this.player.setVelocity(0);
                this.cameras.main.stopFollow(this.player);
                this.endTimer = this.time.delayedCall(100, () => {
                    this.EndGame();
                }, null, this);
            }
            // restart level
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                game.settings.gameOver = false;
                game.settings.playerDied = false;
                this.player.setAlpha(1);
                this.player.setGravity(0, 250);
                this.cameras.main.startFollow(this.player);
                this.backDrop.destroy();
                this.playerGhost.destroy();
                this.endScreenTextTop.destroy();
                this.endScreenTextBot.destroy();
                // respawn location
                if (game.settings.checkpointNumber == 0) {
                    console.log("bruh wtf");
                    this.player.x = 1770;
                    this.player.y = 1910;
                } else if (game.settings.checkpointNumber == 1) {
                    this.player.x = 690;
                    this.player.y = 1880;
                } else if (game.settings.checkpointNumber == 2) {
                    this.player.x = 1025;
                    this.player.y = 600;
                } else if (game.settings.checkpointNumber == 3) {
                    this.player.x = 1745;
                    this.player.y = 1460;
                }
                // return to menu
            } else if (Phaser.Input.Keyboard.JustDown(keyM)) {
                this.music.stop();
                game.settings.musicIsOn = false;
                game.settings.gameOver = false;
                this.scene.start("menuScene");
            }
        }

        // bubble hit check
        if (this.physics.overlap(this.player, this.blast1)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast2)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast3)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast4)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast5)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast6)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast7)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast8)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast9)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast10)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast11)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast12)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast13)) {
            game.settings.gameOver = true;
        } else if (this.physics.overlap(this.player, this.blast14)) {
            game.settings.gameOver = true;
        }
        
        // turret reload
        if (this.blast1.body.velocity.x == 0) {
            this.reload(this.t1, this.blast1, 'right');
        }
        if (this.blast2.body.velocity.x == 0) {
            this.reload(this.t2, this.blast2, 'left');
        }
        if (this.blast3.body.velocity.x == 0) {
            this.reload(this.t3, this.blast3, 'right');
        }
        if (this.blast4.body.velocity.x == 0) {
            this.reload(this.t4, this.blast4, 'left');
        }
        if (this.blast5.body.velocity.x == 0) {
            this.reload(this.t5, this.blast5, 'right');
        }
        if (this.blast6.body.velocity.x == 0) {
            this.reload(this.t6, this.blast6, 'left');
        }
        if (this.blast7.body.velocity.x == 0) {
            this.reload(this.t7, this.blast7, 'right');
        }
        if (this.blast8.body.velocity.x == 0) {
            this.reload(this.t8, this.blast8, 'left');
        }
        if (this.blast9.body.velocity.x == 0) {
            this.reload(this.t9, this.blast9, 'right');
        }
        if (this.blast10.body.velocity.x == 0) {
            this.reload(this.t10, this.blast10, 'left');
        }
        if (this.blast11.body.velocity.x == 0) {
            this.reload(this.t11, this.blast11, 'left');
        }
        if (this.blast12.body.velocity.x == 0) {
            this.reload(this.t12, this.blast12, 'left');
        }
        if (this.blast13.body.velocity.x == 0) {
            this.reload(this.t13, this.blast13, 'left');
        }
        if (this.blast14.body.velocity.x == 0) {
            this.reload(this.t14, this.blast14, 'left');
        }

        // player update
        if (game.settings.gameOver == false) {
            this.player.update();
            //console.log(this.player.x, this.player.y);
            if (game.settings.puffSoundTrigger == true) {
                this.sound.play('puffSound', { volume: 1 });
            }
        }

        // save location
        if (this.physics.overlap(this.player, this.cp1)) {
            game.settings.checkpointNumber = 1;
        }
        if (this.physics.overlap(this.player, this.cp2)) {
            game.settings.checkpointNumber = 2;
        }
        if (this.physics.overlap(this.player, this.cp3)) {
            game.settings.checkpointNumber = 3;
        }

        // scene skip
        if (Phaser.Input.Keyboard.JustDown(keyONE)) {
            this.scene.start("secondScene");
            game.settings.deathSoundPlayed = false;
        }
        if (Phaser.Input.Keyboard.JustDown(keyTWO)) {
            this.player.x = 1835;
            this.player.y = 1165;
        }
    }

    reload(turret, bubble, direction) {
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
        this.backDrop = this.add.tileSprite(this.player.x, this.player.y, 1050, 600, 'blackSquare').setOrigin(0.5).setDepth(2).setAlpha(0.5);
        this.playerGhost = new Player(this, this.player.x, this.player.y - 25, 'puffer').setScale(5).setOrigin(0.5).setDepth(2);
        this.playerGhost.anims.play('puffDeath');
        this.playerGhost.setGravity(0);
        this.playerGhost.setVelocity(0);
        this.endScreenTextTop = this.add.tileSprite(this.player.x, this.player.y - 200, 508, 64, 'endTextTop').setOrigin(0.5).setDepth(2);
        this.endScreenTextBot = this.add.tileSprite(this.player.x, this.player.y + 200, 384, 95, 'endTextBot').setOrigin(0.5).setDepth(2);
    }  
}




