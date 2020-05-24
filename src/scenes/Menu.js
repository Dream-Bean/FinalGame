class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('puffer', './assets/pufferfish.png');
        this.load.image('skeleton', './assets/skeletonfish.png');
        this.load.image('tempWall', './assets/SeaFloorTop.png');
        this.load.image('tempPortal', './assets/SeaFloorBottom.png');
        this.load.spritesheet('puffanim', './assets/puff_spritesheet.png', { frameWidth: 50, frameHeight: 40, startFrame: 0, endFrame: 3 });

        this.load.audio('bgmusic', './assets/bgmusic.mp3');

        this.load.image("terrain", "./assets/terrain_atlas.png");
        this.load.tilemapTiledJSON("map1", "./assets/level1.json");
        this.load.tilemapTiledJSON("map2", "./assets/level2.json");



    }

    create() {
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(game.config.width / 2, game.config.height / 2, "Press Space To Play").setOrigin(0.5);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("firstScene");
        }
    }
}