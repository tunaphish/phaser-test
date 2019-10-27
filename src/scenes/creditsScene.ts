export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super({
      key: "CreditsScene"
    });
  }

  create() {
    let itemText = this.make.text({
      x: 0,
      y: 0,
      text: "Hi, I'm credits",
      style: {
        font: "36px VT323",
        fill: "#ffffff"
      }
    });
    let returnText = this.make
      .text({
        x: 0,
        y: 50,
        text: "Return to Main Menu",
        style: {
          font: "36px VT323",
          fill: "#ffffff"
        }
      })
      .setInteractive();
    returnText.on("pointerover", () => {
      returnText.setFill("#3a003a");
    });
    returnText.on("pointerout", () => {
      returnText.setFill("#ffffff");
    });
    returnText.on("pointerup", () => {
      this.scene.start("MenuScene");
    });
  }

  update(time, delta) {}
}
