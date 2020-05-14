class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('pufferfish', './assets/puffer.png'); //26w 30h
        this.load.image('swordfish', './assets/sword.png'); //20w 33h


    }

    create() {
        //this.cameras.main.setBackgroundColor("#FFFF00");

        // players
        this.p1 = new Pufferknight(this, 200, 200, 'pufferfish').setScale(2);
        this.p2 = new Swordknight(this, 500, 100, 'swordfish').setScale(2);

        // define keyboard keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        // colliders
        this.physics.add.collider(this.p1, this.p2);

        this.actionTimer;
        

    }

    update() {
        // character toggle
        if (Phaser.Input.Keyboard.JustDown(key1)) {
            game.settings.playerSelection = 1;
        } else if (Phaser.Input.Keyboard.JustDown(key2)) {
            game.settings.playerSelection = 2;
        }

        // reset actions to available
        if (game.settings.p1ActionAvailable == false && game.settings.p2ActionAvailable == false) {
            game.settings.p1ActionAvailable = true;
            game.settings.p2ActionAvailable = true;

        }
        console.log(game.settings.p1ActionAvailable, game.settings.p2ActionAvailable);

        // player updates
        this.p1.update();
        console.log(game.settings.p1ActionAvailable, game.settings.p2ActionAvailable);
        this.p2.update();
        console.log(game.settings.p1ActionAvailable, game.settings.p2ActionAvailable);

        

    }

    // helper functions:

}