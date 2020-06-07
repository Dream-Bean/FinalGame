"use strict";

// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 576, //or 768? or back to 1280x720
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
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
    pixelArt: true,
    scene: [Storage, Menu, First, Second, End],
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
    //scene tracker put here. use as a death screen indicator and allow for scene restarts. therefore we dont need death animation.
}

// reserve keyboard variables
let keyA, keyD, keySPACE, keyR, keyM, keyONE, keyTWO;