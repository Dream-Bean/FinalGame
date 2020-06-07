class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // physics conditions
        scene.physics.add.existing(this);
        this.setGravity(0, 250);
        this.setDragX(50);
        this.setDebug(true, true, 0xFACADE);

        scene.add.existing(this);
    }

    update() {
        // player motion
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            this.setVelocityY(-game.settings.playerVelocityY);
            this.setVelocityX(-game.settings.playerVelocityX);
            this.setFlipX(true);
            this.anims.play('puffUp');
            game.settings.puffSoundTrigger = true;
        } else if (Phaser.Input.Keyboard.JustDown(keyD)) {
            this.setVelocityY(-game.settings.playerVelocityY);
            this.setVelocityX(game.settings.playerVelocityX);
            this.setFlipX(false);
            this.anims.play('puffUp');
            game.settings.puffSoundTrigger = true;
        } else {
            game.settings.puffSoundTrigger = false;
        }
    }
}