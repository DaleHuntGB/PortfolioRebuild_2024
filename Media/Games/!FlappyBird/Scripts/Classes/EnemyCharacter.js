class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, Texture) {
    super(scene, 0, 0, Texture);
    this.setOrigin(0.5, 0.5);
    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.InitiateEnemy();
  }
  // Initiate Enemy
  InitiateEnemy() {
    this.setActive(false);
    this.setVisible(false);
    this.EnemyState = DEAD_STATE;
    this.flipX = true;
  }
  //Spawn Enemy
  SpawnEnemy(XPosition, YPosition) {
    this.EnemyState = ALIVE_STATE;
    this.setPosition(XPosition, YPosition);
    this.setActive(true);
    this.setVisible(true);
    this.enableBody();
    this.yLine = YPosition;
    this.theta = Math.random() * 3.14;
    this.speed = 2.5;
  }
  // Update Enemy
  UpdateEnemy() {
    this.y = this.yLine + Math.sin(this.theta) * 100;
    this.theta += 0.0;
    this.x -= this.speed;
    console.log(this.speed);
    if (this.x < 0) {
      this.setActive(false);
      this.setVisible(false);
      this.disableBody();
    }
    this.anims.play("Enemy", true);
  }
}
