class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, XPosition, YPosition, Texture) {
    super(scene, XPosition, YPosition, Texture);
    scene.physics.add.existing(this);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    scene.add.existing(this);
  }
  // Check For Player Input
  UpdatePCMovement(PC_Input) {
    if (PC_UP.isDown) {
      this.setVelocityY(-150);
      this.anims.play("PC", true);
    } else if (PC_DOWN.isDown) {
      this.setVelocityY(150);
      this.anims.play("PC", true);
    } else if (PC_RIGHT.isDown) {
      this.setVelocityX(150);
      this.anims.play("PC", true);
    } else if (PC_LEFT.isDown) {
      this.setVelocityX(-150);
      this.anims.play("PC", true);
    } else {
      // No Input is detected, force the player to fall off screen -> Game Over invoked.
      this.setVelocityY(75);
      this.setVelocityX(0);
      this.anims.play("PC", true);
    }
  }
  // Check For Player Changing Volume
  ChangeVolume() {
    // Lower Volume if volume is greater than 0%
    if (PC_DecreaseVolume.isDown && GameMusic.volume > 0) {
      GameMusic.volume -= 0.01; // 1% decrease
    } // Increase Volume if volume is less than 100%
    else if (PC_IncreaseVolume.isDown && GameMusic.volume <= 1) {
      GameMusic.volume += 0.01; // 1% increase
    }
  }
  // Game Over - Wait For Player Decision. R -> Restart. X -> Reset.
  WaitForPlayer() {
    if (PC_RestartGame.isDown && !GamePlaying) {
      // this.scene.restart() was causing way too many problems
      // .reload() is a native JavaScript function that will reload the current window
      // This will only fire if the corresponding button is down and the game is not currently being played
      location.reload();
    }

    if (PC_ResetHighScore.isDown) {
      localStorage.setItem("PC_HighScore", 0);
      HighScoreText.text = "High Score Reset.";

      localStorage.setItem("PC_LongestTimePlayed", 0);
      LongestTimePlayedText.text = "Longest Time Played Reset.";
    }
  }
}
