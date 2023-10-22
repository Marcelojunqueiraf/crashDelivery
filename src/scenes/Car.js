import Phaser from "phaser";
import { toRadians } from "../utils/toRadian";

export default class Car extends Phaser.Scene {
  carAcceleration = new Phaser.Math.Vector2(5, 0);
  friction = 0.01;
  counter = 0;
  preload() {
    this.load.image("tiles", "/assets/tilemap.png");
    this.load.tilemapTiledJSON("map", "/assets/map.json");
    this.load.spritesheet("car", "/assets/red-car.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    const map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });
    // Parameters are the name you gave the Tiled Editor and then the key of the tileset image in loadImage
    const tileset = map.addTilesetImage("tiles", "tiles");
    // Parameters: layer name from Tiled Editor, tileset, x, y
    const streetsLayer = map.createLayer("streets", tileset, 0, 0);
    const buildingsLayer = map.createLayer("buildings", tileset, 0, 0);
    const detailsLayer = map.createLayer("details", tileset, 0, 0);

    this.car = this.physics.add.sprite(30, 15, "car");
    this.car.body.setBounce(1, 1);

    buildingsLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.car, buildingsLayer);

    this.cameras.main.startFollow(this.car);

    const totalFrames = 16;
    const frames = [...Array(totalFrames).keys()];

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("car", {
        start: 0,
        end: totalFrames - 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("car", {
        start: totalFrames - 1,
        end: 0,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.car.setSize(50, 32);

    this.car.anims.play("left", true);
    this.car.anims.play("right", true);
    this.car.setFrame(10);
  }
  update() {
    const up = this.input.keyboard.addKey("up");
    const down = this.input.keyboard.addKey("down");
    const left = this.input.keyboard.addKey("left");
    const right = this.input.keyboard.addKey("right");

    // Adjust hitbox
    if ([6, 7, 8, 13, 14, 15].includes(this.car.anims.currentFrame?.index))
      this.car.setSize(32, 32);
    else this.car.setSize(50, 32);

    if (up.isDown) {
      this.carAcceleration.setAngle(toRadians(this.car.body.rotation));
      this.car.body.velocity.add(this.carAcceleration);
    } else if (down.isDown) {
      this.carAcceleration.setAngle(toRadians(this.car.body.rotation));
      this.car.body.velocity.subtract(this.carAcceleration);
    }

    if (left.isDown) {
      //this.car.body.rotation -= 5;
      const currentFrame = this.car.anims.currentFrame;
      this.car.anims.playReverse("left", true);
      this.car.anims.setCurrentFrame(currentFrame);
    } else if (right.isDown) {
      //this.car.body.rotation += 5;
      const currentFrame = this.car.anims.currentFrame;
      this.car.anims.play("right", true);
      this.car.anims.setCurrentFrame(currentFrame);
    } else {
      this.car.anims.stop();
    }

    // Friction
    if (this.car.body.velocity.length() > 0)
      this.car.body.velocity.subtract(
        this.car.body.velocity.clone().scale(this.friction)
      );
  }
}
