export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'MenuScene',
        });
    }

    create() {
        const itemText = this.make.text({
            x: 0,
            y: 0,
            text: 'fuck off mate',
            style: {
                font: '36px VT323',
                fill: '#ffffff',
            },
        });
    }

    update() {
        this.inputHandler();
    }

    inputHandler() {
        this.input.keyboard.on('keydown_ESC', event => {
            this.scene.resume('WorldScene');
            this.scene.resume('UiScene');
            this.scene.stop('MenuScene');
        });
    }
}
