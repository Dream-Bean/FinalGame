class First extends Phaser.Scene {
    constructor() {
        super("firstScene");
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

        // music
        if (game.settings.musicIsOn == false) {
            this.music = this.sound.add('bgMusic');
            this.music.play({ volume: 0.2, loop: -1 });
            game.settings.musicIsOn = true;
        }

        // add a tile map
        let map = this.add.tilemap("map1");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");
        // layers
        this.wpBot = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1').setScale(2).setOrigin(0).setScrollFactor(0);
        this.wpTop = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2').setScale(2).setOrigin(0).setScrollFactor(0);
        this.wpBlack = this.add.tileSprite(-290, -35, 3200, 4608, 'bgBlack1').setOrigin(0);
        let topLayer = map.createStaticLayer("top", [terrain], 0, 0);
        
        // player + cam
        this.player = new Player(this, 555, 3900, 'puffer').setSize(16, 16);
        this.cameras.main.startFollow(this.player);

        // checkpoints
        this.cp1 = new Checkpoint(this, 2005, 3605).setSize(48, 48).setOrigin(1);
        this.cp2 = new Checkpoint(this, 2325, 2905).setSize(128, 48).setOrigin(1);

        // collisions*overlaps
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, topLayer)
        // spikes kill
        topLayer.setTileIndexCallback([13, 14, 15], () => {
            game.settings.gameOver = true;
        });
        // level transition
        topLayer.setTileIndexCallback([11], () => {
            game.settings.checkpointNumber = 0;
            game.settings.musicIsOn = false;
            this.music.stop();
            this.scene.start("secondScene");
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
                    this.player.x = 555;
                    this.player.y = 3900;
                } else if (game.settings.checkpointNumber == 1) {
                    this.player.x = 2005;
                    this.player.y = 3605;
                } else if (game.settings.checkpointNumber == 2) {
                    this.player.x = 2325;
                    this.player.y = 2895;
                } 
            // return to menu
            } else if (Phaser.Input.Keyboard.JustDown(keyM)) {
                this.music.stop(); 
                game.settings.musicIsOn = false;
                game.settings.gameOver = false;
                this.scene.start("menuScene");
            }
        }

        // save location
        if (this.physics.overlap(this.player, this.cp1)) {
            game.settings.checkpointNumber = 1;
        }
        if (this.physics.overlap(this.player, this.cp2)) {
            game.settings.checkpointNumber = 2;
        }

        // player update
        if (game.settings.gameOver == false) {
            this.player.update();
            //console.log(this.player.x, this.player.y);
            if (game.settings.puffSoundTrigger == true) {
                this.sound.play('puffSound', { volume: 1 });
            }
        }
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