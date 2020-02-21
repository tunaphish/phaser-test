import 'phaser';
import BootScene from './scenes/bootScene';
import WorldScene from './scenes/worldScene';
import TitleScene from './scenes/titleScene';
import UiScene from './scenes/uiScene';
import MenuScene from './scenes/menuScene';

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
    width: 600,
    height: 800,
    type: Phaser.AUTO,
    parent: 'game',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [BootScene, WorldScene, TitleScene, UiScene, MenuScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        },
    },
};

// game class
export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.addEventListener('load', () => {
    const game = new Game(config);
});
