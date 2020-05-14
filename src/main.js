"use strict";

// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
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
    scene: [Play],
}
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    playerSelection: 0, // 1 = puffer, 2 = sword
    // movement speeds
    playerVelocity: 100,
    playerDrag: 100,
    // movement triggers
    p1ActionAvailable: true, 
    p2ActionAvailable: true,
    actionTimer: 0,
}

// reserve keyboard variables
let key1, key2, keyUP, keyDOWN, keyLEFT, keyRIGHT;