class Storage extends Phaser.Scene {
    constructor() {
        super("storageScene");
    }

    preload() {
        this.load.image('puffer', './assets/pufferfish.png');
        this.load.image('undead', './assets/undeadfish.png');
        this.load.image('bubble', './assets/bubble.png');
        this.load.spritesheet('puffAnim', './assets/puff_spritesheet.png', { frameWidth: 50, frameHeight: 40, startFrame: 0, endFrame: 4 });
        this.load.spritesheet('deathAnim', './assets/death_spritesheet.png', { frameWidth: 43, frameHeight: 42, startFrame: 0, endFrame: 7 });
        this.load.spritesheet('blastAnim', './assets/skeletonfish_spritesheet.png', { frameWidth: 52, frameHeight: 59, startFrame: 0, endFrame: 6 });
        
        this.load.image('blackSquare', './assets/black_square.png');
        this.load.image('endTextTop', './assets/gameover_text.png');
        this.load.image('endTextBot', './assets/bottom_text.png');

        this.load.audio('bgMusic', './assets/bgmusic.mp3');
        this.load.audio('puffSound', './assets/puff.mp3');
        this.load.audio('deathSound', './assets/death.mp3');

        this.load.image('bgBlack', './assets/blackbg.png');
        this.load.image('bg1', './assets/img1.png');
        this.load.image('bg2', './assets/img2.png');
        this.load.image("terrain", "./assets/terrain_atlas.png");
        this.load.tilemapTiledJSON("map1", "./assets/level1.json");
        this.load.tilemapTiledJSON("map2", "./assets/lvl2.json");
    }

    create() {
        // Player animation
        this.anims.create({
            key: 'puffUp',
            frames: this.anims.generateFrameNumbers('puffAnim', { start: 0, end: 3, first: 0 }),
            frameRate: 12,
            repeat: 0,
        });
        // Death animation
        this.anims.create({
            key: 'puffDeath',
            frames: this.anims.generateFrameNumbers('deathAnim', { start: 0, end: 6, first: 0 }),
            frameRate: 12,
            repeat: -1,
        });
        // Turret animation
        this.anims.create({
            key: 'skeleBlast',
            frames: this.anims.generateFrameNumbers('blastanim', { start: 0, end: 5, first: 0 }),
            frameRate: 15,
            repeat: 0,
        });

        this.scene.start("menuScene");
    }
}