class Victory extends Phaser.Scene {
    constructor() {
        super("victoryScene");
    }

    create() {
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        this.wpBot = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1').setScale(2).setOrigin(0).setScrollFactor(0);
        this.wpTop = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2').setScale(2).setOrigin(0).setScrollFactor(0);

        this.win = this.add.tileSprite(game.config.width / 2, game.config.height / 2 - 125, 410, 65, 'win').setScale(1.5).setOrigin(0.5);
        this.thanks = this.add.tileSprite(game.config.width / 2, game.config.height / 2 + 75, 416, 41, 'thanks').setOrigin(0.5);
        this.credits = this.add.tileSprite(game.config.width / 2, game.config.height / 2 + 250, 712, 30, 'credits').setOrigin(0.5);
        this.return = this.add.tileSprite(game.config.width / 2, game.config.height / 2 + 125, 384, 47, 'menuReturn').setOrigin(0.5);
    }

    update() {
        // parallax scrolling
        this.wpBot.tilePositionX -= 0.5;
        this.wpTop.tilePositionX -= 1;
        
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }
    }
}