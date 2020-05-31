class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('puffer', './assets/pufferfish.png');
        this.load.image('skeleton', './assets/skeletonfish.png');
        this.load.image('bubble', './assets/bubble.png');

        this.load.spritesheet('puffanim', './assets/puff_spritesheet.png', { frameWidth: 50, frameHeight: 40, startFrame: 0, endFrame: 4 });
        this.load.spritesheet('blastanim', './assets/skeletonfish_spritesheet.png', { frameWidth: 56, frameHeight: 58, startFrame: 0, endFrame: 8 });

        this.load.audio('bgmusic', './assets/bgmusic.mp3');

        this.load.image('img1', './assets/img1.png');
        this.load.image('img2', './assets/img2.png');
        this.load.image("terrain", "./assets/terrain_atlas.png");
        this.load.tilemapTiledJSON("map1", "./assets/lvl1.json");
        this.load.tilemapTiledJSON("map2", "./assets/level2.json");
        this.load.tilemapTiledJSON("map3", "./assets/level3.json");



    }

    create() {
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(game.config.width / 2, game.config.height / 2, "Press Space To Play").setOrigin(0.5);

        // Player animation
        this.anims.create({
            key: 'puffup',
            frames: this.anims.generateFrameNumbers('puffanim', { start: 0, end: 3, first: 0 }),
            frameRate: 12,
            repeat: 0,
        });

        // Turret animation
        this.anims.create({
            key: 'skeleblast',
            frames: this.anims.generateFrameNumbers('blastanim', { start: 0, end: 7, first: 0 }),
            frameRate: 21,
            repeat: 0,
        });

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("firstScene");
        }
    }
}