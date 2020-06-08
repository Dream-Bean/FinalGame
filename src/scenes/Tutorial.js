class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    create() {
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        this.bg = this.add.tileSprite(0, 0, 1024, 576, 'tutorial').setOrigin(0);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
        }
    }
}