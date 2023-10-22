var loop;
var playingGroup;
function preload() {
  game.load.spritesheet("rpsLeft", "assets/rps-left.png", 92, 86);
}
function dynamicSprite(x, key) {
  loop = game.add.sprite(x, game.world.centerY - 35, key);
  loop.animations.add("play", [0, 1, 2]);
  loop.animations.play("play", 20, true);
  loop.smoothed = false;
  playingGroup.create(loop);
}
btn = game.add.button(
  game.world.centerX - 70,
  game.world.centerY + 105,
  "rockSprite",
  this.btnRock,
  this,
  1,
  0,
  2,
  0
);
btn.input.useHandCursor = true;
function btnRock() {
  // here
}
