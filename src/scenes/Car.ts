import Phaser from "phaser";

export default class Car extends Phaser.Scene {
  speed = 0.1;
  angle = 0;
  airResist = 0.005;
  car;//: Phaser.GameObjects.Rectangle;
  wall;//: Phaser.GameObjects.Rectangle;
  preload() {}
  create() {
    this.car = this.add.rectangle(400, 300, 30, 15, 0xff5555);
    this.physics.add.existing(this.car);
    this.car.body.setCollideWorldBounds(true);
    this.car.body.setBounce(1, 1);

    this.wall = this.add.rectangle(50, 400, 20, 100, 0xffffff);
    this.physics.add.existing(this.wall);
    this.wall.body.setImmovable(true);
  }
  update() {
    const up = this.input.keyboard.addKey("up");
    const down = this.input.keyboard.addKey("down");
    const left = this.input.keyboard.addKey("left");
    const right = this.input.keyboard.addKey("right");

    if (up.isDown) {
      this.speed += 0.1;
    } else if (down.isDown) {
      this.speed -= 0.1;
    }

    if (left.isDown) {
      this.angle -= 0.01 * this.speed;
    } else if (right.isDown) {
      this.angle += 0.01 * this.speed;
    }

    this.car.setRotation(this.angle);
    // move car using speed and angle
    this.car.x += Math.cos(this.angle) * this.speed;
    this.car.y += Math.sin(this.angle) * this.speed;

    if (this.speed > 0) {
      this.speed -= this.airResist * this.speed * this.speed;
      this.speed -= 0.001;
    } else {
      this.speed += this.airResist * this.speed * this.speed;
      this.speed += 0.001;
    }
  }
}
