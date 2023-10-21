import Phaser from "phaser";

export default class TitleScene extends Phaser.Scene {
  preload() {}
  create() {
    const text = this.add.text(380, 290, "Click to start game", {
      fill: "#0f0",
    });
    text.setOrigin(0.5, 0.5);
    this.input.on("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
