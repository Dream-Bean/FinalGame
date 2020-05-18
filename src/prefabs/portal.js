class Portal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // physics conditions
        scene.physics.add.existing(this);
        this.setDebug(true, true, 0xFACADE);

        scene.add.existing(this);
    }

}