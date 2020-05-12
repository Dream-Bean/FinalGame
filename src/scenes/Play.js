class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('pufferfish', './assets/puffer.png'); 
        this.load.image('swordfish', './assets/sword.png');


    }

    create() {
        //this.cameras.main.setBackgroundColor("#FFFF00");

        this.p1 = new Pufferknight(this, 200, 200, 'pufferfish').setSize(100,100);
        this.p1.setCollideWorldBounds(true);
        this.p1.setDebug(true, true, 0x00FF00)
        //this.p1.setDebugBodyColor(0xFF00FF);
        
        this.p2 = new Swordknight(this, 500, 100, 'swordfish');
        this.p2.setCollideWorldBounds(true);
        this.p2.setDebugBodyColor(0xFF00FF);

    }

    update() {

    }

    // helper functions:

}