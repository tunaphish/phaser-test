interface MenuItem {
    name: string;
    scene: string;
}

export default class TitleScene extends Phaser.Scene {
    private MENU_ITEMS: MenuItem[];

    constructor() {
        super({
            key: 'TitleScene',
        });
        this.MENU_ITEMS = [
            {
                name: 's t a r t  t h e  g a m e',
                scene: 'WorldScene',
            },
        ];
    }

    create() {
        const centerHeight = this.cameras.main.height / 2;
        const centerWidth = this.cameras.main.width / 2;

        const titleText = this.make
            .text({
                x: centerWidth,
                y: 150,
                text: 'r e a p e r',
                style: {
                    font: '36px VT323, helvetica',
                    fill: '#ffffff',
                },
            })
            .setOrigin(0.5, 0.5);

        const titleImage = this.add
            .image(centerWidth, centerHeight, 'titleImage')
            .setOrigin(0.5, 0.5)
            .setTintFill(0xffffff);

        const startText = this.make
            .text({
                x: centerWidth,
                y: this.cameras.main.height - 200,
                text: 's t a r t  t h e  g a m e',
                style: {
                    font: '24px VT323, helvetica',
                    fill: '#ffffff',
                },
            })
            .setOrigin(0.5, 0.5)
            .setInteractive();
        startText.on('pointerup', () => {
            this.sound.play('select');
            this.scene.start('WorldScene');
        });
    }
}
