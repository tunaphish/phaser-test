export default class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene',
        });
    }

    preload() {
        this.handleLoadScreen();
        this.load.image('tiles', './src/assets/tilesets/tuxmon-sample-32px-extruded.png');
        this.load.image('compass', './src/assets/compass.png');
        this.load.image('pointer', './src/assets/pointer.png');
        this.load.image('grid', './src/assets/icons/grid.svg');
        this.load.image('titleImage', './src/assets/phaser.png');

        this.load.tilemapTiledJSON('map', './src/assets/tilemaps/tuxemon-town.json');
        this.load.atlas('atlas', './src/assets/shizuka.png', './src/assets/shizuka.json');
        this.load.audio('hover', './src/assets/sounds/hover.wav');
        this.load.audio('select', './src/assets/sounds/select.wav');
    }

    create() {
        this.createAnimations();
        this.scene.start('TitleScene');
    }

    handleLoadScreen() {
        const centerWidth = this.cameras.main.width / 2;
        const centerHeight = this.cameras.main.height / 2;
        const LOADING_TEXT_OFFSET = 50;
        const PROGRESS_BOX_HEIGHT = 50;
        const PROGRESS_BOX_WIDTH = 320;
        const PROGRESS_BOX_OFFSET = 5;
        const PROGRESS_BAR_HEIGHT = 30;
        const PROGRESS_BAR_WIDTH = 300;

        const loadingText = this.make
            .text({
                x: centerWidth,
                y: centerHeight - LOADING_TEXT_OFFSET,
                text: 'Loading...',
                style: {
                    font: '20px VT323',
                    fill: '#ffffff',
                },
            })
            .setOrigin(0.5, 0.5);

        const progressBar = this.add.graphics();
        const progressBox = this.add
            .graphics()
            .fillStyle(0x222222, 0.8)
            .fillRect(
                centerWidth - PROGRESS_BOX_WIDTH / 2,
                centerHeight - PROGRESS_BOX_OFFSET - PROGRESS_BOX_HEIGHT / 2,
                PROGRESS_BOX_WIDTH,
                PROGRESS_BOX_HEIGHT,
            );

        const percentText = this.make
            .text({
                x: centerWidth,
                y: centerHeight - PROGRESS_BOX_OFFSET,
                text: '0%',
                style: {
                    font: '36px VT323',
                    fill: '#ffffff',
                },
            })
            .setOrigin(0.5, 0.5);

        const assetText = this.make
            .text({
                x: centerWidth,
                y: centerHeight + 50,
                text: '',
                style: {
                    font: '18px VT323',
                    fill: '#ffffff',
                },
            })
            .setOrigin(0.5, 0.5);

        this.load.on('progress', function(value: number) {
            percentText.setText(value * 100 + '%');
            progressBar
                .fillStyle(0xffffff, 1)
                .fillRect(
                    centerWidth - PROGRESS_BAR_WIDTH / 2,
                    centerHeight - PROGRESS_BOX_OFFSET - PROGRESS_BAR_HEIGHT / 2,
                    PROGRESS_BAR_WIDTH * value,
                    PROGRESS_BAR_HEIGHT,
                );
        });

        this.load.on('fileprogress', function(file) {
            assetText.setText('Loading asset: ' + file.key);
        });
    }

    createAnimations() {
        const directions = ['top', 'top-right', 'right', 'bottom-right', 'bottom'];
        directions.forEach(direction => {
            const key = 'shizuka-run-' + direction;
            const prefix = key + '/move-shizuka-';
            this.anims.create({
                key: key,
                frames: this.anims.generateFrameNames('atlas', {
                    prefix: prefix,
                    suffix: '.png',
                    start: 0,
                    end: 5,
                    zeroPad: 2,
                }),
                frameRate: 12,
                repeat: -1,
            });
        });
    }
}
