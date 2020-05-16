class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('pufferfish', './assets/puffer.png'); //26w 30h
        this.load.image('swordfish', './assets/sword.png'); //20w 33h


    }

    create() {
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(game.config.width / 2, game.config.height / 2, "Press Space To Play").setOrigin(0.5);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("playScene");
        }
    }
}