import Phaser from "phaser";

export default class Game extends Phaser.Scene {
  paddleLeft;
  paddleRight;
  ball;

  preload() {}
  create() {
    const x = 400;
    const y = 300;
    this.ball = this.add.circle(x, y, 10, 0xffffff);
    this.physics.add.existing(this.ball);
    // random velocity x, y
    this.ball.body.setVelocity(200, -200);

    this.ball.body.setBounce(1, 1);
    this.ball.body.setCollideWorldBounds(true);

    this.paddleLeft = this.add.rectangle(50, y, 20, 100, 0xffffff);
    this.physics.add.existing(this.paddleLeft);
    this.paddleLeft.body.setImmovable(true);

    this.physics.add.collider(this.ball, this.paddleLeft);

    this.paddleRight = this.add.rectangle(750, y, 20, 100, 0xffffff);
    this.physics.add.existing(this.paddleRight);
    this.paddleRight.body.setImmovable(true);

    this.physics.add.collider(this.ball, this.paddleRight);
  }
  update() {
    // check for input
    const up = this.input.keyboard.addKey("up");
    const down = this.input.keyboard.addKey("down");
    const lUp = this.input.keyboard.addKey("w");
    const lDown = this.input.keyboard.addKey("s");

    // move paddle
    const speed = 10;
    if (up.isDown && this.paddleRight.y > 50) {
      this.paddleRight.y -= speed;
    } else if (down.isDown && this.paddleRight.y < 550) {
      this.paddleRight.y += speed;
    }

    if (lUp.isDown && this.paddleLeft.y > 50) {
      this.paddleLeft.y -= speed;
    } else if (lDown.isDown && this.paddleLeft.y < 550) {
      this.paddleLeft.y += speed;
    }

    // check for win
    if (this.ball.x <= 10 || this.ball.x >= 790) {
      this.scene.start("TitleScene");
    }
  }
}
