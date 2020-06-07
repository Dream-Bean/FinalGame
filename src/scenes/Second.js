class Second extends Phaser.Scene {
    constructor() {
        super("secondScene");
    }

    create() {
        // define hotkeys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // add a tile map
        let map = this.add.tilemap("map2");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");

        //layers
        this.wpBot = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'img1').setOrigin(0).setScrollFactor(0);
        this.wpTop = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'img2').setOrigin(0).setScrollFactor(0);
        let topLayer = map.createStaticLayer("top", [terrain], 0, 0);
        let extraLayer = map.createStaticLayer("extra", [terrain], 0, 0);


        this.p1 = new Player(this, 760, 650, 'puffer').setScale(1);
        this.cameras.main.startFollow(this.p1);

        this.t1 = new Turret(this, 250, 425, 'undead').setScale(1).setFlipX(true).setDepth(1);
        this.t2 = new Turret(this, 250, 525, 'undead').setScale(1).setFlipX(true).setDepth(1);
        this.blast1 = new Bubble(this, this.t1.x, this.t1.y, 'bubble').setScale(1);
        this.blast2 = new Bubble(this, this.t2.x, this.t2.y, 'bubble').setScale(1);

        // colliders
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.p1, topLayer);
        this.physics.add.collider(this.blast1, topLayer);
        this.physics.add.collider(this.blast2, topLayer);

        // spikes kill player
        topLayer.setTileIndexCallback([6, 7, 8], () => {
            this.p1.setAlpha(0);
            game.settings.gameOver = true; //switch to true
            //set game over
        });

        /*
        extraLayer.setCollisionByProperty({ collides: true});
        this.physics.add.collider(this.blast1, extraLayer);
        this.physics.add.collider(this.blast2, extraLayer);
        topLayer.setTileIndexCallback([1, 2, 3, 4, 6, 7, 8, 11, 12, 13, ], () => {
            this.p1.setAlpha(0);
            game.settings.gameOver = true; //switch to true
            //set game over
        });
        */

        //this.blast1.onCollide.add(this.reset(this.t1, this.blast1), this); //fix these monka
        //this.blast2.onCollide.add(this.reset(this.t2, this.blast2), this);

        topLayer.setTileIndexCallback([25], () => {
            this.scene.start("thirdScene");
        });

        this.gameText = this.add.text(game.config.width / 2, game.config.height / 2, "Press R to Restart").setScale(2).setOrigin(0.5);
        this.gameText.setVisible(false);
        

    }

    update() {
        this.wpBot.tilePositionX = this.cameras.main.scrollX * 0.3;
        this.wpTop.tilePositionX = this.cameras.main.scrollX * 0.5;

        if (game.settings.gameOver == true) {
            this.gameText.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                game.settings.gameOver = false;
                this.gameText.setVisible(false);
                this.scene.restart();
            }
        }

        if (this.physics.overlap(this.p1, this.blast1)) {
            this.p1.setAlpha(0);
            game.settings.gameOver = true;
            
        }
        if (this.physics.overlap(this.p1, this.blast2)) {
            this.p1.setAlpha(0);
            game.settings.gameOver = true;
        }

        if (this.blast1.body.velocity.x == 0) {
            this.reload(this.t1, this.blast1);
        }
        if (this.blast2.body.velocity.x == 0) {
            this.reload(this.t2, this.blast2);
        }

        this.p1.update();
        //console.log(this.blast1.body.velocity.x);
    }


    reload(turret, bubble) {
        bubble.x = turret.x;
        bubble.y = turret.y;
        bubble.setVelocityX(100);
        turret.anims.play('skeleblast');
    }
}