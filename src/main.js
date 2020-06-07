"use strict";

// game configuration
let config = {
    type: Phaser.CANVAS,
    pixelArt: true,
    width: 1024,
    height: 576, //or 768? or back to 1280x720
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
    scene: [Storage, Menu, First, Second],
}
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    // movement speeds
    playerVelocityY: 100,
    playerVelocityX: 150,
    isBubbleTimer1: false,
    isBubbleTimer2: false,
    gameOver: false,
    playerDied: false,
    puffSoundTrigger: false,
    sceneTracker: 0,
}

// reserve keyboard variables
let keyA, keyD, keySPACE, keyR, keyM, keyONE, keyTWO;