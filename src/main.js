"use strict";

// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 1024,
    height: 512,
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
    scene: [Menu, Play],
}
let game = new Phaser.Game(config);

// define game settings
game.settings = {
    // movement speeds
    playerVelocityY: 50,
    playerVelocityX: 100,
}

// reserve keyboard variables
let keyQ, keyE, keySPACE, keyR;