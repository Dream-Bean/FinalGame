class Second extends Phaser.Scene {
    constructor() {
        super("secondScene");
    }

    create() {
        // define hotkeys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // add a tile map
        let map = this.add.tilemap("map2");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");

        //layers
        this.wpBot = this.add.tileSprite(0, 0, 1280, 704, 'img1').setOrigin(0);
        this.wpTop = this.add.tileSprite(0, 0, 1280, 704, 'img2').setOrigin(0);
        let topLayer = map.createStaticLayer("top", [terrain], 0, 0);

        this.p1 = new Player(this, 760, 650, 'puffer').setScale(1);
        this.t1 = new Turret(this, 250, 425, 'skeleton').setScale(1).setFlipX(true);
        this.t2 = new Turret(this, 250, 525, 'skeleton').setScale(1).setFlipX(true);
        this.blast1 = new Bubble(this, this.t1.x, this.t1.y, 'bubble').setScale(1).setAlpha(0);
        this.blast2 = new Bubble(this, this.t2.x, this.t2.y, 'bubble').setScale(1).setAlpha(0);

        // colliders
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.p1, topLayer)
        this.physics.add.collider(this.blast1, topLayer)
        this.physics.add.collider(this.blast2, topLayer)

        // spikes kill player
        topLayer.setTileIndexCallback([6, 7, 8], () => {
            this.p1.setAlpha(0);
            game.settings.gameOver = true; //switch to true
            //set game over
        });

        //this.blast1.onCollide.add(this.reset(this.t1, this.blast1), this); //fix these monka
        //this.blast2.onCollide.add(this.reset(this.t2, this.blast2), this);

        topLayer.setTileIndexCallback([25], () => {
            this.scene.start("thirdScene");
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

        if (this.physics.overlap(this.p1, this.blast1)) {
            this.p1.setAlpha(0);
            game.settings.gameOver = true;
            
        }
        if (this.physics.overlap(this.p1, this.blast2)) {
            this.p1.setAlpha(0);
            game.settings.gameOver = true;
        }
        this.fire(this.t1, this.blast1, game.settings.isBubbleTimer1);
        this.fire(this.t2, this.blast2, game.settings.isBubbleTimer2);

        this.p1.update();
    }

    // Fire bubbles from skeleton fish
    fire(turret, bubble, timerNumber) {
        if (timerNumber == false) { // works here.
            timerNumber = true;
            this.bubbleTimer = this.time.delayedCall(5000, () => {
                turret.anims.play('skeleblast');
                timerNumber = false;
                bubble.setVelocityX(100);
                bubble.setAlpha(1);
            }, null, this);
        }
    }
    reset(turret, bubble) {
        bubble.x = turret.x;
        bubble.y = turret.y;
    }
}