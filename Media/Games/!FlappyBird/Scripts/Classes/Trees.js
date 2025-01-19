class Tree extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, Texture) {
    super(scene, 0, 0, Texture);
    scene.physics.add.existing(this);
    this.setOrigin(0, 0);
    scene.add.existing(this);
    this.InitiateTrees();
  }
  // Iniatate Tree
  InitiateTrees() {
    this.setActive(false);
    this.setVisible(false);
    this.TreeState = DEAD_STATE;
  }
  // Spawn Tree
  SpawnTrees(XPosition, YPosition) {
    this.TreeState = ALIVE_STATE;
    this.setPosition(XPosition, YPosition);
    this.setActive(true);
    this.setVisible(true);
    this.enableBody();
    this.yLine = YPosition;
    this.speed = 2;
  }
  // Update Tree
  UpdateTrees() {
    this.y = this.yLine;
    this.x -= this.speed;
    if (this.x < -50) {
      this.setActive(false);
      this.setVisible(false);
      this.disableBody();
    }
  }
}
