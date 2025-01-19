class Insect extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, Texture) {
    super(scene, 0, 0, Texture);
    this.setOrigin(0.5, 0.5);
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.InitiateInsects();
  }
  // Initiate Insect
  InitiateInsects() {
    this.setActive(false);
    this.setVisible(false);
    this.InsectState = DEAD_STATE;
  }
  // Spawn Insect
  SpawnInsects(XPosition, YPosition) {
    this.InsectState = ALIVE_STATE;
    this.setPosition(XPosition, YPosition);
    this.setActive(true);
    this.setVisible(true);
    this.enableBody();
    this.yLine = YPosition;
    this.theta = Math.random() * 3.14;
    this.speed = 3;
  }
  // Update Insect
  UpdateInsects() {
    this.y = this.yLine + Math.sin(this.theta) * 100;
    // this.theta += 0.05;
    this.x -= this.speed;
    if (this.x < 0) {
      this.setActive(false);
      this.setVisible(false);
      this.disableBody();
    }
    this.anims.play("Insect", true);
  }
}
