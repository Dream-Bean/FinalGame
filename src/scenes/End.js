class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    create() {
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        game.settings.gameOver = false;

        this.gameText = this.add.text(game.config.width / 2, game.config.height / 2 - 150, "GAME OVER").setScale(10).setOrigin(0.5);
        this.gameText = this.add.text(game.config.width / 2, game.config.height / 2 + 100, "Press R to Restart Level").setScale(2).setOrigin(0.5);
        this.gameText = this.add.text(game.config.width / 2, game.config.height / 2 + 150, "Press M to Return to Menu Screen").setScale(2).setOrigin(0.5);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            if (game.settings.sceneTracker == 1) {
                this.scene.start("firstScene");
            } else if (game.settings.sceneTracker == 2) {
                this.scene.start("secondScene");
            }
        }
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }
    }
}
