export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MenuScene',
        });
    }

    create() {
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor('#000000');
        const menuItem: Phaser.GameObjects.Text = this.make
            .text({
                x: 0,
                y: 0,
                text: 'c o n t i n u e',
                style: {
                    font: '36px VT323',
                    fill: '#ffffff',
                },
            })
            .setInteractive();
        menuItem.on('pointerup', () => {
            this.sound.play('select');
            this.scene.stop('MenuScene');
            this.scene.resume('WorldScene');
            this.scene.resume('UiScene');
        });
    }
}
