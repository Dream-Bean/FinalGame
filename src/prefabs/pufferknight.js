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
        if (game.settings.playerSelection == 1) {
            // player motion ↑↓
            if (Phaser.Input.Keyboard.JustDown(keyUP)) {
                this.setVelocityY(-game.settings.playerVelocity);
            }
            if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                this.setVelocityY(game.settings.playerVelocity);
            }
            // player motion ←→
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.setVelocityX(-game.settings.playerVelocity);
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                this.setVelocityX(game.settings.playerVelocity);
            }
        }
    
    

    }
}