class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // physics conditions
        scene.physics.add.existing(this);
        //this.setCollideWorldBounds(true);
        this.setGravity(0, 200);
        this.setDragX(50);
        this.setDebug(true, true, 0xFACADE);

        scene.add.existing(this);
    }

    update() {
        // player motion
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            this.setVelocityY(-game.settings.playerVelocityY);
            this.setVelocityX(-game.settings.playerVelocityX);
            this.setFlipX(true);
        } else if (Phaser.Input.Keyboard.JustDown(keyE)) {
            this.setVelocityY(-game.settings.playerVelocityY);
            this.setVelocityX(game.settings.playerVelocityX);
            this.setFlipX(false);
        }
    }
}