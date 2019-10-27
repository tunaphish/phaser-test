import Player from "../objects/player";

export default class MainScene extends Phaser.Scene {
  private player: Player;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  create() {
    this.scene.launch("UiScene");

    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    worldLayer.setCollisionByProperty({ collides: true });
    aboveLayer.setDepth(10);

    // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
    // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
    const spawnPoint: any = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );

    this.player = new Player(this, spawnPoint.x, spawnPoint.y).setScale(2);

    this.physics.add.collider(this.player, worldLayer);

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update(time, delta) {
    this.player.update(time, delta);
  }
}
