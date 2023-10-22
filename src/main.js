import Phaser from "phaser";
import TitleScene from "./scenes/TitleScene";
import Game from "./scenes/Game";
import Car from "./scenes/Car";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);

// add scenes
game.scene.add("TitleScene", TitleScene);
game.scene.add("Game", Game);
game.scene.add("Car", Car);

game.scene.start("Car");
