class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, Texture) {
    super(scene, 0, 0, Texture);
    scene.physics.add.existing(this);
    this.setOrigin(0.5, 0.5);
    scene.add.existing(this);
    this.InitiateCoins();
  }
  // Initiate Coins
  InitiateCoins() {
    this.setActive(false);
    this.setVisible(false);
    this.CoinState = DEAD_STATE;
  }
  // Spawn Coins
  SpawnCoins(XPosition, YPosition) {
    this.CoinState = ALIVE_STATE;
    this.setPosition(XPosition, YPosition);
    this.setActive(true);
    this.setVisible(true);
    this.enableBody();
    this.yLine = YPosition;
    this.theta = Math.random() * 3.14;
    this.speed = 2;
  }
  // Update Coins
  UpdateCoins() {
    this.y = this.yLine + Math.sin(this.theta) * 100;
    this.x -= this.speed;
    if (this.x < 0) {
      this.setActive(false);
      this.setVisible(false);
      this.disableBody();
      // console.log("Coin Deactivated");
    }
    this.anims.play("Coin", true);
  }
  // Update Player Score
  UpdatePlayerScore() {
    PC_Score = PC_Score + 25;
  }
}
