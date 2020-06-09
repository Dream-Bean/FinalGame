class Storage extends Phaser.Scene {
    constructor() {
        super("storageScene");
    }

    preload() {
        // sprites
        this.load.image('puffer', './assets/sprites/pufferfish.png');
        this.load.image('undead', './assets/sprites/undeadfish.png');
        this.load.image('bubble', './assets/sprites/bubble.png');
        this.load.spritesheet('puffAnim', './assets/sprites/puff_spritesheet.png', { frameWidth: 50, frameHeight: 40, startFrame: 0, endFrame: 4 });
        this.load.spritesheet('deathAnim', './assets/sprites/death_spritesheet.png', { frameWidth: 43, frameHeight: 42, startFrame: 0, endFrame: 7 });
        this.load.spritesheet('blastAnim', './assets/sprites/skeletonfish_spritesheet.png', { frameWidth: 52, frameHeight: 59, startFrame: 0, endFrame: 6 });

        // main menu
        this.load.image('title', './assets/miscellaneous/title.png');
        this.load.image('titleTextBot', './assets/miscellaneous/title_bottom_text.png');

        // tutorial
        this.load.image('tutorial', './assets/miscellaneous/tutorial.png');

        // end screen
        this.load.image('blackSquare', './assets/miscellaneous/black_square.png');
        this.load.image('endTextTop', './assets/miscellaneous/gameover_text.png');
        this.load.image('endTextBot', './assets/miscellaneous/death_bottom_text.png');

        // win screen
        this.load.image('win', './assets/miscellaneous/win.png');
        this.load.image('thanks', './assets/miscellaneous/thanks.png');
        this.load.image('credits', './assets/miscellaneous/credits.png');

        // sounds
        this.load.audio('bgMusic', './assets/sounds/bgmusic.mp3');
        this.load.audio('puffSound', './assets/sounds/puff.mp3');
        this.load.audio('deathSound', './assets/sounds/death.mp3');

        // levels + aesthetics
        this.load.image('bgBlack1', './assets/levels/blackbg1.png');
        //this.load.image('bgBlack2', './assets/levels/blackbg2.png');
        this.load.image('bg1', './assets/levels/img1.png');
        this.load.image('bg2', './assets/levels/img2.png');
        this.load.image("terrain", "./assets/levels/terrain_atlas.png");
        this.load.tilemapTiledJSON("map1", "./assets/levels/lvl1.json");
        this.load.tilemapTiledJSON("map2", "./assets/levels/lvl2.json");
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
            frames: this.anims.generateFrameNumbers('blastAnim', { start: 0, end: 5, first: 0 }),
            frameRate: 15,
            repeat: 0,
        });

        this.scene.start("menuScene");
    }
}