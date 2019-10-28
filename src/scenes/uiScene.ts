import utility from '../utility';

export default class UiScene extends Phaser.Scene {
    private ANGLE_OFFSET: number;
    private joystick: any;
    private pointer: any;

    constructor() {
        super({
            key: 'UiScene',
        });

        this.ANGLE_OFFSET = 100;
    }

    create() {
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
            if (!this.joystick.visible) {
                this.joystick.setVisible(true).setPosition(pointer.x, pointer.y);
            }
            if (!this.pointer.visible) {
                this.pointer.setVisible(true);
            }
        });

        this.input.on('pointerup', pointer => {
            this.joystick.setVisible(false);
            this.pointer.setVisible(false);
        });
    }
}
