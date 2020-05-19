class Second extends Phaser.Scene {
    constructor() {
        super("secondScene");
    }

    preload() {
        this.load.image('puffer', './assets/pufferfish.png');
        this.load.image('skeleton', './assets/skeletonfish.png');
        this.load.image('top', './assets/SeaFloorTop.png');
        this.load.image('bot', './assets/SeaFloorBottom.png');
        this.load.image('thorn', './assets/thorn.png');
        this.load.image('bubble', './assets/bubble.png');
        this.load.image('air', './assets/backgroundAir.png');

    }

    create() {
        this.add.text(game.config.width / 2, game.config.height / 2, "Second Scene").setOrigin(0.5);

        this.thorn1 = new Border(this, 50, 50, 'thorn').setScale(1);
        this.thorn2 = new Border(this, 50, 150, 'thorn').setScale(2);
        this.air1 = new Border(this, 150, 50, 'air').setScale(1);
        this.air2 = new Border(this, 150, 150, 'air').setScale(2);
        this.top1 = new Border(this, 250, 50, 'top').setScale(1);
        this.top2 = new Border(this, 250, 150, 'top').setScale(2);
        this.bot1 = new Border(this, 350, 50, 'bot').setScale(1);
        this.bot2 = new Border(this, 350, 150, 'bot').setScale(2);
        this.bubble1 = new Border(this, 450, 50, 'bubble').setScale(1);
        this.bubble2 = new Border(this, 450, 150, 'bubble').setScale(2);

        this.e1 = new Enemy(this, 550, 50, 'skeleton').setScale(1);
        this.e2 = new Enemy(this, 550, 150, 'skeleton').setScale(2);
        this.p1 = new Player(this, 650, 50, 'puffer').setScale(1);
        this.p2 = new Player(this, 650, 150, 'puffer').setScale(2);

    }

}