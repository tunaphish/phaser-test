import utility from '../utility';

export default class Player extends Phaser.GameObjects.Sprite {
    static readonly SPEED = 350;
    static readonly DEAD_ZONE = 20;

    constructor(scene, x, y) {
        super(scene, x, y, 'atlas', 'shizuka-idle-bottom/move-shizuka-00.png');

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }

    update(time, delta) {
        this.updateMovement(time, delta);
    }

    updateMovement(time, delta) {
        let velocityX = 0;
        let velocityY = 0;
        const pointer = this.scene.input.activePointer;

        if (pointer.isDown && pointer.getDistance() > this.DEAD_ZONE) {
            const totalDistance = pointer.getDistanceX() + pointer.getDistanceY();
            velocityX = (SPEED * (pointer.x - pointer.downX)) / totalDistance;
            velocityY = (SPEED * (pointer.y - pointer.downY)) / totalDistance;

            const angle = utility.radiansToDegrees(pointer.getAngle());

            this.setFlipX(pointer.x - pointer.downX < 0);

            //Set animations
            if (-22.5 < angle && angle <= 22.5) {
                this.anims.play('shizuka-run-right', true);
            } else if (-67.5 < angle && angle <= -22.5) {
                this.anims.play('shizuka-run-top-right', true);
            } else if (-112.5 < angle && angle <= -67.5) {
                this.anims.play('shizuka-run-top', true);
            } else if (-157.5 < angle && angle <= -112.5) {
                this.anims.play('shizuka-run-top-right', true);
            } else if (112.5 < angle && angle <= 157.5) {
                this.anims.play('shizuka-run-bottom-right', true);
            } else if (67.5 < angle && angle <= 112.5) {
                this.anims.play('shizuka-run-bottom', true);
            } else if (22.5 < angle && angle <= 67.5) {
                this.anims.play('shizuka-run-bottom-right', true);
            } else if (-157.5 < angle || angle <= 157.5) {
                this.anims.play('shizuka-run-right', true);
            }
        } else {
            this.anims.stop();
            this.setTexture('atlas', 'shizuka-idle-bottom/move-shizuka-00.png');
        }

        this.body.setVelocity(velocityX, velocityY);
    }
}
