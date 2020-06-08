class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        this.add.text(game.config.width / 2, game.config.height / 2 - 50, "Press Space To Play").setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 50, "Press T For Tutorial").setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("firstScene");
        } else if (Phaser.Input.Keyboard.JustDown(keyT)) {
            this.scene.start("tutorialScene");
        }
    }
}