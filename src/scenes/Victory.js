class Victory extends Phaser.Scene {
    constructor() {
        super("victoryScene");
    }

    create() {
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        this.win = this.add.tileSprite(game.config.width / 2, game.config.height / 2 - 150, 410, 65, 'win').setOrigin(0.5);
        this.thanks = this.add.tileSprite(game.config.width / 2, game.config.height / 2, 416, 41, 'thanks').setOrigin(0.5);
        this.credits = this.add.tileSprite(game.config.width / 2, game.config.height / 2 + 250, 712, 30, 'credits').setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }
    }
}