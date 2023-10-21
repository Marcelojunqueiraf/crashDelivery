import Phaser from "phaser";
import { toRadians } from "../utils/toRadian";

export default class Car extends Phaser.Scene {

  carAcceleration = new Phaser.Math.Vector2(5, 0)
  friction = 0.01
  
  preload() {
    this.load.image("tiles", "/assets/tilemap.png");
    this.load.tilemapTiledJSON("map", "/assets/map.json");
  }

  create() {

    const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
    // Parameters are the name you gave the Tiled Editor and then the key of the tileset image in loadImage
    const tileset = map.addTilesetImage("tiles1", "tiles");
    // Parameters: layer name from Tiled Editor, tileset, x, y
    const layer = map.createLayer("street", tileset, 0, 0)

    this.car = this.add.rectangle(400, 300, 30, 15, 0xff5555);
    this.physics.add.existing(this.car);
    //this.car.body.setCollideWorldBounds(true);
    this.car.body.setBounce(1, 1);

    this.wall = this.add.rectangle(50, 400, 20, 100, 0xffffff);
    this.physics.add.existing(this.wall);
    this.wall.body.setImmovable(true);

    this.physics.add.collider(this.car, this.wall);

    this.cameras.main.startFollow(this.car);

    
  }
  update() {
    const up = this.input.keyboard.addKey("up");
    const down = this.input.keyboard.addKey("down");
    const left = this.input.keyboard.addKey("left");
    const right = this.input.keyboard.addKey("right");


    if (up.isDown) {
      this.carAcceleration.setAngle(toRadians(this.car.body.rotation))
      this.car.body.velocity.add(this.carAcceleration)
    } else if (down.isDown) {
      this.carAcceleration.setAngle(toRadians(this.car.body.rotation))
      this.car.body.velocity.subtract(this.carAcceleration)
    } 

    if (left.isDown) {
      this.car.body.rotation -= 5;
    } else if (right.isDown) {
      this.car.body.rotation += 5;
    }

    // Friction
    if (this.car.body.velocity.length() > 0) 
      this.car.body.velocity.subtract(this.car.body.velocity.clone().scale(this.friction))
  }

}
