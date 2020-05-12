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
    playerSelection: 1, // 1 = puffer, 2 = sword
    playerVelocity: 100,
    playerDrag: 75,
}

// reserve keyboard variables
let key1, key2, keyUP, keyDOWN, keyLEFT, keyRIGHT;