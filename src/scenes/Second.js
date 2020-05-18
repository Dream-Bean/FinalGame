class Second extends Phaser.Scene {
    constructor() {
        super("secondScene");
    }

    preload() {


    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2, "Second Scene").setOrigin(0.5);

    }

}