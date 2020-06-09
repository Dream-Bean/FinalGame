class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.title = this.add.tileSprite(game.config.width / 2, game.config.height / 2 - 100, 478, 64, 'title').setOrigin(0.5);
        this.tilleBottomText = this.add.tileSprite(game.config.width / 2, game.config.height / 2 + 100, 382, 98, 'titleTextBot').setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.start("firstScene");
        } else if (Phaser.Input.Keyboard.JustDown(keyT)) {
            this.scene.start("tutorialScene");
        }
        // scene skip victory
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("victoryScene");
        }
    }
}