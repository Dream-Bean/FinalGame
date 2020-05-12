// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    physics: {
        default: "arcade",
            debug: true,
            gravity: {
                x: 0,
                y: 0,
            },
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

}

// reserve keyboard variables