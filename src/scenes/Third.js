class Third extends Phaser.Scene {
    constructor() {
        super("thirdScene");
    }

    create() {
        // define hotkeys
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // add a tile map
        let map = this.add.tilemap("map3");
        let terrain = map.addTilesetImage("terrain_atlas", "terrain");

        // layers
        let topLayer = map.createStaticLayer("top", [terrain], 0, 0);

        this.p1 = new Player(this, 380, 630, 'puffer').setScale(1); // x=180
        this.t1 = new Turret(this, 650, 620, 'skeleton').setScale(1);
        this.blast = new Bubble(this, this.t1.x, this.t1.y, 'bubble').setScale(1).setAlpha(0);
        
        

        // colliders
        topLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.p1, topLayer)
        this.physics.add.collider(this.blast, topLayer)

        /*
        topLayer.setTileIndexCallback([1], () => {
            this.blast.alpha = 0;
            this.blast.setVelocityX(0);
            console.log('uwu');
            //set game over
        });
        */

    }

    update() {

        if (this.physics.overlap(this.p1, this.blast)) {
            this.p1.setAlpha(0);
        }
        //if (this.blast.velocityX


        this.fire(this.t1, this.blast);

        this.p1.update();
    }

    // Fire bubbles from skeleton fish
    fire(turret, bubble) {
        if (game.settings.isBubbleTimer == false) { // works here.
            game.settings.isBubbleTimer = true;
            this.bubbleTimer = this.time.delayedCall(5000, () => {
                turret.anims.play('skeleblast');
                game.settings.isBubbleTimer = false;
                bubble.setVelocityX(-100);
                bubble.setAlpha(1);
                this.reset(turret, bubble);
            }, null, this);
        }
    }

    reset(turret, bubble) {
        bubble.x = turret.x;
        bubble.y = turret.y;
    }

}