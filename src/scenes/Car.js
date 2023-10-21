import Phaser from "phaser";

export default class Car extends Phaser.Scene {
  speed = 0.1;
  angle = 0;
  airResist = 0.005;
  // car: Phaser.GameObjects.Rectangle;
  // wall: Phaser.GameObjects.Rectangle;
  preload() {}
  create() {
    this.car = this.add.rectangle(400, 300, 30, 15, 0xff5555);
    this.physics.add.existing(this.car);
    this.car.body.setCollideWorldBounds(true);
    this.car.body.setBounce(1, 1);

    this.wall = this.add.rectangle(50, 400, 20, 100, 0xffffff);
    this.physics.add.existing(this.wall);
    this.wall.body.setImmovable(true);

    this.physics.add.collider(this.car, this.wall);
  }
  update() {
    const up = this.input.keyboard.addKey("up");
    const down = this.input.keyboard.addKey("down");
    const left = this.input.keyboard.addKey("left");
    const right = this.input.keyboard.addKey("right");

    if (up.isDown) {
      this.car.body.velocity.x += Math.cos(this.car.body.rotation) * 100;
      this.car.body.velocity.y += Math.sin(this.car.body.rotation) * 100;
    } else if (down.isDown) {
      this.car.body.velocity.x -= Math.cos(this.car.body.rotation) * 100;
      this.car.body.velocity.y -= Math.sin(this.car.body.rotation) * 100;
    }

    this.speed = Math.sqrt(
      this.car.body.velocity.x * this.car.body.velocity.x +
        this.car.body.velocity.y * this.car.body.velocity.y
    );

    if (left.isDown) {
      this.car.body.rotation -= 0.01 * this.speed;
    } else if (right.isDown) {
      this.car.body.rotation += 0.01 * this.speed;
    }

    const acceleration = 0.0 + this.airResist * this.speed * this.speed;
    if (this.speed > 0) {
      this.car.body.velocity.x -=
        Math.cos(this.car.body.rotation) * acceleration;
      this.car.body.velocity.y -=
        Math.sin(this.car.body.rotation) * acceleration;
    } else {
      this.car.body.velocity.x +=
        Math.cos(this.car.body.rotation) * acceleration;
      this.car.body.velocity.y +=
        Math.sin(this.car.body.rotation) * acceleration;
    }
  }
}
