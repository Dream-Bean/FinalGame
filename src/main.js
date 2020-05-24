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
    scene: [Menu, First, Second, Third],
}
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    // movement speeds
    playerVelocityY: 100,
    playerVelocityX: 150,
}

// reserve keyboard variables
let keyQ, keyE, keySPACE, keyR;