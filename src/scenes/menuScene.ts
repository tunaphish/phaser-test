export default class MenuScene extends Phaser.Scene {
  private MENU_ITEMS;
  
  constructor() {
    super({
      key: "MenuScene"
    });
    this.MENU_ITEMS = [
      {
        name: "Start",
        scene: "MainScene"
      },
      {
        name: "Credits",
        scene: "CreditsScene"
      }
    ];
  }

  create() {
    this.MENU_ITEMS.forEach((item, idx) => {
      let itemText = this.make
        .text({
          x: 0,
          y: 0 + idx * 50,
          text: item.name,
          style: {
            font: "36px VT323",
            fill: "#ffffff"
          }
        })
        .setInteractive();
      itemText.on("pointerover", () => {
        this.sound.play("hover");
        itemText.setFill("#3a003a");
      });
      itemText.on("pointerout", () => {
        itemText.setFill("#ffffff");
      });
      itemText.on("pointerup", () => {
        this.sound.play("select");
        this.scene.start(item.scene);
      });
    });
  }

  update(time, delta) {}
}
