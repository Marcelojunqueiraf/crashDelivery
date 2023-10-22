import Phaser from "phaser";
import { toRadians } from "../utils/toRadians";

export default class Car extends Phaser.Scene {
  carAcceleration = new Phaser.Math.Vector2(10, 0);
  friction = 0.015;
  carRotation = 0;
  maxSpeed = 300;
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
    this.car.body.setBounce(0.5, 0.5);

    buildingsLayer.setCollisionByExclusion([-1]);
    this.physics.add.collider(this.car, buildingsLayer);

    this.cameras.main.startFollow(this.car);
  }
  update() {
    const up = this.input.keyboard.addKey("up");
    const down = this.input.keyboard.addKey("down");
    const left = this.input.keyboard.addKey("left");
    const right = this.input.keyboard.addKey("right");

    // Adjust hitbox
    // if ([6, 7, 8, 13, 14, 15].includes(this.car.anims.currentFrame?.index))
    this.car.setSize(32, 32);
    // else this.car.setSize(50, 32);

    if (up.isDown && this.car.body.velocity.length() < this.maxSpeed) {
      this.carAcceleration.setAngle(toRadians(this.carRotation));
      this.car.body.velocity.add(this.carAcceleration);
    } else if (down.isDown && this.car.body.velocity.length() > 0) {
      this.carAcceleration.setAngle(toRadians(this.carRotation));
      this.car.body.velocity.subtract(this.carAcceleration);
    }

    if (left.isDown) {
      this.carRotation = (this.carRotation - 5) % 360;
    } else if (right.isDown) {
      this.carRotation = (this.carRotation + 5) % 360;
    }

    // calculate frame using rotation 16 frames
    const rotation =
      this.carRotation > 0 ? this.carRotation : 360 + this.carRotation;
    const frame = (Math.round((16 * rotation) / 360) + 10) % 16;
    this.car.setFrame(frame);

    this.car.body.velocity.setAngle(toRadians(this.carRotation));

    // Friction;
    if (this.car.body.velocity.length() > 0)
      this.car.body.velocity.subtract(
        this.car.body.velocity.clone().scale(this.friction)
      );
  }
}
