// game configuration
let config = {
    type: Phaser.CANVAS,
    pixelArt: true,
    width: 1024,
    height: 576,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0,
            },
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true,
    },
    scene: [Storage, Menu, Tutorial, First, Second],
}
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    gameOver: false,
    playerDied: false,
    puffSoundTrigger: false,
    musicIsOn: false,
    playerVelocityY: 100,
    playerVelocityX: 150,
    isBubbleTimer1: false,
    isBubbleTimer2: false,
    checkpoint: 0,
}

// reserve keyboard variables
let keyA, keyD, keyR, keyM, keyT, keySPACE, keyONE;