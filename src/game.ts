import "phaser";
import BootScene from "./scenes/bootScene";
import MainScene from "./scenes/mainScene";
import MenuScene from "./scenes/menuScene";
import UiScene from "./scenes/uiScene";
import CreditsScene from "./scenes/creditsScene";

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
  width: 600,
  height: 800,
  type: Phaser.AUTO,
  parent: "game",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, MainScene, MenuScene, UiScene, CreditsScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  }
};

// game class
export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  var game = new Game(config);
});
