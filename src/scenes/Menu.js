class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

    }

    create() {
        game.settings.sceneTracker = 0;

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(game.config.width / 2, game.config.height / 2, "Press Space To Play").setOrigin(0.5);


    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("firstScene");
        }
    }
}