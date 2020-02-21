import utility from '../utility';

export default class UiScene extends Phaser.Scene {
    private ANGLE_OFFSET: number;
    private joystick: any;
    private pointer: any;

    constructor() {
        super({
            key: 'UiScene',
        });

        this.ANGLE_OFFSET = 110;
    }

    create() {
        this.add
            .image(this.cameras.main.width - 30, 30, 'grid')
            .setTintFill(0xffffff)
            .setScale(2)
            .setInteractive()
            .on('pointerup', () => {
                this.sound.play('select');
                this.scene.pause('UiScene');
                this.scene.pause('WorldScene');
                this.scene.run('MenuScene');
            });

        this.joystick = this.add.image(0, 0, 'compass').setVisible(false);

        this.pointer = this.add
            .image(0, 0, 'pointer')
            .setScale(0.05)
            .setVisible(false);
    }

    update(time, delta) {
        this.updateJoystick();
    }

    updateJoystick() {
        const pointer = this.input.activePointer;

        this.pointer
            .setPosition(pointer.x, pointer.y)
            .setAngle(utility.radiansToDegrees(pointer.getAngle()) + this.ANGLE_OFFSET);

        this.input.on('pointerdown', pointer => {
            this.joystick.setVisible(true).setPosition(pointer.x, pointer.y);
            this.pointer.setVisible(true);
        });

        this.input.on('pointerup', pointer => {
            this.joystick.setVisible(false);
            this.pointer.setVisible(false);
        });
    }
}
