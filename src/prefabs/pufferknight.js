class Pufferknight extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // physics conditions
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setDrag(game.settings.playerDrag);
        this.setDebug(true, true, 0xFACADE);

        scene.add.existing(this);
    }

    update() {
        // pufferfish selected
        if (game.settings.playerSelection == 1 && game.settings.p1ActionAvailable == true) {
            // player motion ↑↓←→
            if (Phaser.Input.Keyboard.JustDown(keyUP)) {
                this.setVelocityY(-game.settings.playerVelocity);
                this.setVelocityX(0); // x velocity = 0 to stop diagnolization of movement
                // also need to fix the continuous movement aspect
                game.settings.p1ActionAvailable = false;
            } else if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                this.setVelocityY(game.settings.playerVelocity);
                this.setVelocityX(0);
                game.settings.p1ActionAvailable = false;
            } else if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.setVelocityX(-game.settings.playerVelocity);
                this.setVelocityY(0);
                game.settings.p1ActionAvailable = false;
            } else if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                this.setVelocityX(game.settings.playerVelocity);
                this.setVelocityY(0);
                game.settings.p1ActionAvailable = false;
            }
        }
    }

}