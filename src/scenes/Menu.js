class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        this.wpBot = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg1').setScale(2).setOrigin(0).setScrollFactor(0);
        this.wpTop = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'bg2').setScale(2).setOrigin(0).setScrollFactor(0);

        this.title = this.add.tileSprite(game.config.width / 2, game.config.height / 2 - 125, 478, 64, 'title').setScale(1.5).setOrigin(0.5);
        this.tilleBottomText = this.add.tileSprite(game.config.width / 2, game.config.height / 2 + 150, 382, 98, 'titleTextBot').setOrigin(0.5);
    }

    update() {
        // parallax scrolling
        this.wpBot.tilePositionX -= 0.5;
        this.wpTop.tilePositionX -= 1;

        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.scene.start("firstScene");
        } else if (Phaser.Input.Keyboard.JustDown(keyT)) {
            this.scene.start("tutorialScene");
        }
    }
}