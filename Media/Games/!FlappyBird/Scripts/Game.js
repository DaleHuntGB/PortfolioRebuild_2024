// Constants
// Game
const GAME_WIDTH = 720;
const GAME_HEIGHT = 640;
const DEAD_STATE = 0;
const ALIVE_STATE = 1;
// Objects & Enemies
const NUM_OF_ENEMIES = 3;
const NUM_OF_COINS = 5;
const NUM_OF_TREES = 5;
const NUM_OF_INSECTS = 1;
const NUM_OF_HEALTH = 1;
// Player Spawn Position
const DEFAULT_POSITION_X = 120;
const DEFAULT_POSITION_Y = GAME_HEIGHT / 2; // Middle
// Fonts
const GAME_FONT = "Poppins";

let GameConfig = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 0,
      },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let Game = new Phaser.Game(GameConfig);

// Variables
// Game Variables
let GamePlaying = false;
let GameTimer = 0;
let SplashScreenText = " ";
let ScoreText = " ";
let HighScoreText = " ";
let ResetHighScoreText = " ";
let GameTimerText = " ";
let GameTimer_Interval = 0;

// Player Related Variables
let PC_Input;
let PC_Score = 0;
let PC_Lives = 3;
var PC_HighScore = localStorage.getItem("PC_HighScore");
var PC_LongestTimePlayed = localStorage.getItem("PC_LongestTimePlayed");
let PC_Scale = 0.1;
let PC_Score_Interval = 0;

// Groups of Objects
let NPC_Group = [];
let Coin_Group = [];
let Tree_Group = [];
let Insect_Group = [];
let Health_Group = [];

function preload() {
  // Images & Objects
  // Load Start Screen
  this.load.image("StartScreen", "/Media/Games/!FlappyBird/Assets/Images/StartScreen.png");
  // Load Background
  this.load.image("Background", "/Media/Games/!FlappyBird/Assets/Images/Background.png");
  // Load Player Character Model
  this.load.spritesheet("PC", "/Media/Games/!FlappyBird/Assets/Images/PlayerCharacter.png", {
    frameWidth: 716,
    frameHeight: 632,
  });
  // Load Enemy Character Model
  this.load.spritesheet("Enemy", "/Media/Games/!FlappyBird/Assets/Images/Enemy.png", {
    frameWidth: 712,
    frameHeight: 520,
  });
  // Load Coin Object
  this.load.spritesheet("Coin", "/Media/Games/!FlappyBird/Assets/Images/Coin.png", {
    frameWidth: 494,
    frameHeight: 496,
  });
  // Load Insect Model
  this.load.spritesheet("Insect", "/Media/Games/!FlappyBird/Assets/Images/Insect.png", {
    frameWidth: 610,
    frameHeight: 511,
  });
  // Load Health Object
  this.load.spritesheet("Health", "/Media/Games/!FlappyBird/Assets/Images/Health.png", {
    frameWidth: 494,
    frameHeight: 443,
  });
  // Load Tree Model
  this.load.image("Tree", "/Media/Games/!FlappyBird/Assets/Images/Tree.png");
  // Audio
  // Load Game Music
  this.load.audio("GameMusic", ["/Media/Games/!FlappyBird/Assets/Sounds/Powerwalking - Future Joust - Game Music.mp3"]);
  // Load PC Bird Flying Sound
  this.load.audio("Flying", ["/Media/Games/!FlappyBird/Assets/Sounds/Bird Flying.mp3"]);
  // Load PC Hurt Sound
  this.load.audio("Hurt", ["/Media/Games/!FlappyBird/Assets/Sounds/Bird Hurt.mp3"]);
  // Load Insect Eaten Sound
  this.load.audio("InsectEaten", ["/Media/Games/!FlappyBird/Assets/Sounds/Insect Eaten.mp3"]);
  // Load Coin Collected Sound
  this.load.audio("CoinCollected", ["/Media/Games/!FlappyBird/Assets/Sounds/Coin Collected.mp3"]);
  // Load Health Collect Sound
  this.load.audio("HealthCollected", ["/Media/Games/!FlappyBird/Assets/Sounds/Health Collected.mp3"]);
}

function create() {
  // Create Models & Objects
  // These are created in this specific order for layering. The later they get loaded, the higher the layer.
  // Background - Eighth Layer
  Background = this.add.sprite(GAME_WIDTH, 0, "Background").setOrigin(0.5, 0);
  // Start Screen - Seventh Layer
  StartScreen = this.add.image(GAME_WIDTH, 0, "StartScreen").setOrigin(1, 0);
  // Trees - Sixth Layer
  for (let i = 0; i < NUM_OF_TREES; i++) {
    Tree_Group[i] = new Tree(this, "Tree").setOrigin(0.5).setScale(0.4);
    console.log("Trees Created");
  }
  // Coins - Fifth Layer
  for (let i = 0; i < NUM_OF_COINS; i++) {
    Coin_Group[i] = new Coin(this, "Coin").setScale(0.08);
    console.log("Coins Created");
  }
  // Enemies - Fourth Layer
  for (let i = 0; i < NUM_OF_ENEMIES; i++) {
    NPC_Group[i] = new Enemy(this, "Enemy").setScale(0.09);
    console.log("Enemies Created");
  }
  // Insects - Third Layer
  for (let i = 0; i < NUM_OF_INSECTS; i++) {
    Insect_Group[i] = new Insect(this, "Insect").setScale(0.09);
    console.log("Insects Created");
  }
  // Health - Second Layer
  for (let i = 0; i < NUM_OF_HEALTH; i++) {
    Health_Group[i] = new Health(this, "Health").setScale(0.09);
    console.log("Health Created");
  }
  // Player - Top Layer
  PC = new Player(this, DEFAULT_POSITION_X, DEFAULT_POSITION_Y, "PC").setScale(PC_Scale);
  // Player Input Controls
  PC_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  PC_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  PC_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  PC_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  PC_RestartGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  PC_ResetHighScore = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
  PC_DecreaseVolume = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  PC_IncreaseVolume = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  // Player Animation
  this.anims.create({
    key: "PC",
    frames: this.anims.generateFrameNumbers("PC", {
      start: 0,
      end: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  // Enemy Animation
  this.anims.create({
    key: "Enemy",
    frames: this.anims.generateFrameNumbers("Enemy", {
      start: 0,
      end: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  // Coin Animation
  this.anims.create({
    key: "Coin",
    frames: this.anims.generateFrameNumbers("Coin", {
      start: 0,
      end: 9,
    }),
    frameRate: 15,
    repeat: -1,
  });
  // Insect Animation
  this.anims.create({
    key: "Insect",
    frames: this.anims.generateFrameNumbers("Insect", {
      start: 0,
      end: 1,
    }),
    frameRate: 10,
    repeat: -1,
  });
  // Health Animation
  this.anims.create({
    key: "Health",
    frames: this.anims.generateFrameNumbers("Health", {
      start: 0,
      end: 7,
    }),
    frameRate: 15,
    repeat: -1,
  });

  // Create Text
  // Score Text
  ScoreText = this.add.text(10, 10, " ", {
    fontFamily: GAME_FONT,
    fontSize: "24px",
    fill: "#000",
    fontWeight: 400,
  });
  ScoreText.setOrigin(0, 0);
  ScoreText.text = PC_Score;
  ScoreText.visible = false;
  // Player Lives Text
  PlayerLivesText = this.add.text(10, 50, " ", {
    fontFamily: GAME_FONT,
    fontSize: "24px",
    fill: "#000",
    fontWeight: 400,
  });
  PlayerLivesText.setOrigin(0, 0);
  PlayerLivesText.text = "Lives: " + PC_Lives;
  PlayerLivesText.visible = false;
  // High Score Text
  HighScoreText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 150, " ", {
    fontFamily: GAME_FONT,
    fontSize: "24px",
    fill: "#000",
    fontWeight: 400,
  });
  HighScoreText.setOrigin(0.5, 0.5);
  HighScoreText.text = "High Score: " + PC_HighScore;
  HighScoreText.visible = false;
  // Longest Played Time Text
  LongestTimePlayedText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100, " ", {
    fontFamily: GAME_FONT,
    fontSize: "24px",
    fill: "#000",
    fontWeight: 400,
  });
  LongestTimePlayedText.setOrigin(0.5, 0.5);
  LongestTimePlayedText.text = "Longest Time Played: " + PC_LongestTimePlayed + "s";
  LongestTimePlayedText.visible = false;
  // Reset High Score Text
  ResetHighScoreText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 150, " ", {
    fontFamily: GAME_FONT,
    fontSize: "24px",
    fill: "#000",
    fontWeight: 400,
  });
  ResetHighScoreText.setOrigin(0.5, 0.5);
  ResetHighScoreText.text = "Press X To Reset High Score";
  ResetHighScoreText.visible = false;
  // Splash Screen Text
  SplashScreenText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, " ", {
    fontFamily: GAME_FONT,
    fontSize: "32px",
    fill: "#000",
    fontWeight: 400,
  });
  SplashScreenText.setOrigin(0.5, 0.5);
  SplashScreenText.visible = false;
  // Game Timer Text
  GameTimerText = this.add.text(GAME_WIDTH / 2, 30, " ", {
    fontFamily: GAME_FONT,
    fontSize: "32px",
    fill: "#000",
    fontWeight: 400,
  });
  GameTimerText.setOrigin(0.5, 0.5);
  GameTimerText.visible = false;
  // Add EventListener to look for Pointer Down Event.
  this.input.addListener("pointerdown", StartGame, this);
  // Deactivate Player until Game Starts
  PC.setVisible(false);
  PC.setActive(false);
  // Generate Physics Colliders & Overlaps
  this.physics.add.overlap(PC, Coin_Group, DestroyCoin, null, this);
  this.physics.add.overlap(PC, NPC_Group, DecreasePlayerLife, null, this);
  this.physics.add.overlap(PC, Insect_Group, IncreasePlayerScale, null, this);
  this.physics.add.overlap(PC, Health_Group, IncreasePlayerLives, null, this);
  // Audio
  GameMusic = this.sound.add("GameMusic");
  Flying = this.sound.add("Flying");
  Hurt = this.sound.add("Hurt");
  InsectEaten = this.sound.add("InsectEaten");
  CoinCollected = this.sound.add("CoinCollected");
  HealthCollected = this.sound.add("HealthCollected");
}

function update() {
  if (GamePlaying) {
    // Check Player Movement Input
    PC.UpdatePCMovement();
    // Update Sound During Game Being Played
    PC.ChangeVolume();
    // Player Difficulty Increases As The Game Continues.
    if (GameTimer > 15) {
      for (let NPC of NPC_Group) {
        NPC.speed = 3;
      }
      if (GameTimer > 30) {
        for (let NPC of NPC_Group) {
          NPC.speed = 3.5;
        }
        if (GameTimer > 45) {
          for (let NPC of NPC_Group) {
            NPC.speed = 4;
          }
        }
        if (GameTimer > 60) {
          for (let NPC of NPC_Group) {
            NPC.speed += 0.05;
            NPC.theta += 0.02;
          }
        }
      }
    }
    // Move The Background
    Background.x -= 1;
    if (Background.x <= 0) {
      Background.x = GAME_WIDTH;
    }
    // Check If Player Has Collided With The Floor or The Roof
    if (PC.y >= GAME_HEIGHT - 400 * 0.09 || PC.y <= Math.floor(40)) {
      GamePlaying = false;
      GameOver();
    }
    // Update Player Score Every 1s
    // This will create a PC_Score_Interval variable to be updated
    if (!PC_Score_Interval) {
      PC_Score_Update();
    }
    // Update Player Score Every 1s
    // This will create a GameTimer_Interval variable to be updated
    if (!GameTimer_Interval) {
      Game_Timer_Update();
    }
    // Update Enemies & Objects
    // Update Enemies
    for (let NPC of NPC_Group) {
      NPC.UpdateEnemy();
    }
    // Update Coins
    for (let Coin of Coin_Group) {
      Coin.UpdateCoins();
    }
    // Update Trees
    for (let Tree of Tree_Group) {
      Tree.UpdateTrees();
    }
    // Update Insects
    for (let Insect of Insect_Group) {
      Insect.UpdateInsects();
    }
    // Update Health
    for (let Health of Health_Group) {
      Health.UpdateHealth();
    }
    // Update Score Text
    ScoreText.text = "Score: " + PC_Score;
    // Update Game Time Text
    GameTimerText.text = GameTimer + "s";
    // Update Player Lives Text
    PC_Lives.text = "Lives" + PC_Lives;
  }

  if (!GamePlaying) {
    // Stop The Intervals
    clearInterval(PC_Score_Interval);
    clearInterval(GameTimer_Interval);
    // Wait For The Player To Decide What Next. R -> Restart. X -> Reset.
    PC.WaitForPlayer();
  }
}
// Function Declarations
// Starts The Game.
function StartGame() {
  this.input.removeListener("pointerdown", StartGame);
  // Destroy The Start Screen
  StartScreen.destroy();
  // Start The Game
  GamePlaying = true;
  // Start Music & Sound Effects
  GameMusic.play();
  GameMusic.volume = 0.05;
  GameMusic.setLoop(true);
  Flying.play();
  Flying.volume = 0.35;
  Flying.setLoop(true);
  // Player Model Visible & Active
  PC.setVisible(true);
  PC.setActive(true);
  // Hide Splash Screen Text
  SplashScreenText.visible = false;
  // Display Score Text
  ScoreText.visible = true;
  // Display Player Lives Text
  PlayerLivesText.visible = true;
  // Display Game Timer Text
  GameTimerText.visible = true;
  // Start Spawning Enemies & Objects
  StartSpawningCoins(this);
  StartSpawningEnemies(this);
  StartSpawningTrees(this);
  StartSpawningInsects(this);
  StartSpawningHealth(this);
}

function GameOver() {
  // End The Game
  GamePlaying = false;
  // Disable All Enemies & Objects
  PC.setVisible(false);
  PC.setActive(false);
  // Enemies Deactivated
  for (let i = 0; i < NUM_OF_ENEMIES; i++) {
    NPC_Group[i].setVisible(false);
    NPC_Group[i].setActive(false);
  }
  // Coins Deactivated
  for (let j = 0; j < NUM_OF_COINS; j++) {
    Coin_Group[j].setVisible(false);
    Coin_Group[j].setActive(false);
  }
  // Trees Deactivated
  for (let k = 0; k < NUM_OF_TREES; k++) {
    Tree_Group[k].setActive(false);
    Tree_Group[k].setVisible(false);
  }
  // Insects Deactivated
  for (let l = 0; l < NUM_OF_INSECTS; l++) {
    Insect_Group[l].setActive(false);
    Insect_Group[l].setVisible(false);
  }
  // Health Deactivated
  for (let m = 0; m < NUM_OF_HEALTH; m++) {
    Health_Group[m].setActive(false);
    Health_Group[m].setVisible(false);
  }
  // Display Splash Screen Text
  SplashScreenText.visible = true;
  SplashScreenText.text = "Press R To Restart";
  ResetHighScoreText.visible = true;
  // Update High Score on Local Storage
  if (PC_Score > localStorage.getItem("PC_HighScore")) {
    localStorage.setItem("PC_HighScore", PC_Score);
  }
  // Update Game Timer on Local Storage
  if (GameTimer > localStorage.getItem("PC_LongestTimePlayed")) {
    localStorage.setItem("PC_LongestTimePlayed", GameTimer);
  }
  // Display High Score
  HighScoreText.text = "High Score: " + localStorage.getItem("PC_HighScore");
  HighScoreText.visible = true;
  // Display Current Game Time
  LongestTimePlayedText.text = "Longest Time Played: " + localStorage.getItem("PC_LongestTimePlayed") + "s";
  LongestTimePlayedText.visible = true;
  // Stop Audio
  Flying.stop();
}

function StartSpawningEnemies(CurrentScene) {
  // Check if NUM_OF_ENEMIES are required and then run if the game is playing.
  if (NUM_OF_ENEMIES > 0 && GamePlaying == true) {
    let XPosition = Phaser.Math.RND.integerInRange(800, 950);
    // Duration Between The Next Spawn
    let EnemiesNextDelay = 250;
    for (let i = 0; i <= 3; i++) {
      // Get The First !Active NPC and spawn it.
      let NPC = Phaser.Actions.GetFirst(NPC_Group, {
        active: false,
      });
      if (NPC) {
        // If Spawned, SpawnEnemy accordingly.
        NPC.SpawnEnemy(XPosition, Phaser.Math.RND.integerInRange(100, 500));
        XPosition -= 150;
      }
    }
    CurrentScene.time.delayedCall(EnemiesNextDelay, StartSpawningEnemies, [CurrentScene]);
  }
}

function StartSpawningTrees(CurrentScene) {
  // Check if NUM_OF_TREES are required and then run if the game is playing.
  if (NUM_OF_TREES > 0 && GamePlaying == true) {
    let XPosition = Phaser.Math.RND.integerInRange(800, 950);
    // Duration Between The Next Spawn
    let TreesNextDelay = 250;
    for (let k = 0; k <= 3; k++) {
      // Get The First !Active Tree and spawn it.
      let Tree = Phaser.Actions.GetFirst(Tree_Group, {
        active: false,
      });
      if (Tree) {
        // If Spawned, SpawnTrees accordingly.
        Tree.SpawnTrees(XPosition, 475);
        XPosition += 175;
      }
    }
    CurrentScene.time.delayedCall(TreesNextDelay, StartSpawningTrees, [CurrentScene]);
  }
}

function StartSpawningCoins(CurrentScene) {
  // Check if NUM_OF_COINS are required and then run if the game is playing.
  if (NUM_OF_COINS > 0 && GamePlaying == true) {
    let XPosition = Phaser.Math.RND.integerInRange(800, 950);
    // Duration Between The Next Spawn
    let CoinsNextDelay = 600;
    for (let j = 0; j <= 3; j++) {
      // Get The First !Active Coin and spawn it.
      let Coin = Phaser.Actions.GetFirst(Coin_Group, {
        active: false,
      });
      if (Coin) {
        // If Spawned, SpawnCoins accordingly.
        Coin.SpawnCoins(XPosition, Phaser.Math.RND.integerInRange(50, 500));
        XPosition += 100;
      }
    }
    CurrentScene.time.delayedCall(CoinsNextDelay, StartSpawningCoins, [CurrentScene]);
  }
}

function StartSpawningInsects(CurrentScene) {
  // Check if NUM_OF_INSECTS are required and then run if the game is playing.
  if (NUM_OF_INSECTS > 0 && GamePlaying == true) {
    let XPosition = Phaser.Math.RND.integerInRange(800, 950);
    // Duration Between The Next Spawn - Randomised this spawn duration so that they are less frequent.
    let InsectsNextDelay = Phaser.Math.RND.integerInRange(10000, 200000);
    for (let i = 0; i <= 3; i++) {
      // Get The First !Active Insect and spawn it.
      let Insect = Phaser.Actions.GetFirst(Insect_Group, {
        active: false,
      });
      if (Insect) {
        // If Spawned, SpawnInsects accordingly.
        Insect.SpawnInsects(XPosition, Phaser.Math.RND.integerInRange(75, 475));
        XPosition -= 375;
      }
    }
    CurrentScene.time.delayedCall(InsectsNextDelay, StartSpawningInsects, [CurrentScene]);
  }
}

function StartSpawningHealth(CurrentScene) {
  // Check if NUM_OF_HEALTH are required and then run if the game is playing.
  if (NUM_OF_HEALTH > 0 && GamePlaying == true) {
    let XPosition = Phaser.Math.RND.integerInRange(800, 950);
    // Duration Between The Next Spawn - Randomised this spawn duration so that they are less frequent.
    let HealthNextDelay = Phaser.Math.RND.integerInRange(7500, 12500);
    for (let i = 0; i <= 3; i++) {
      // Get The First !Active Health and spawn it.
      let Health = Phaser.Actions.GetFirst(Health_Group, {
        active: false,
      });
      if (Health) {
        // If Spawned, SpawnHealth accordingly.
        Health.SpawnHealth(XPosition, Phaser.Math.RND.integerInRange(75, 475));
        XPosition -= 150;
      }
    }
    CurrentScene.time.delayedCall(HealthNextDelay, StartSpawningHealth, [CurrentScene]);
  }
}
// Fires the function every 1.5s - The function will update Player Score.
function PC_Score_Update() {
  PC_Score_Interval = setInterval(function () {
    PC_Score = PC_Score + 10;
  }, 1500);
}
// Fires the function every 1s - The function will update Game Timer.
function Game_Timer_Update() {
  GameTimer_Interval = setInterval(function () {
    GameTimer = GameTimer + 1;
  }, 1000);
}
// If PC & Coin Collided and Game Playing is true, then set coin to inactive (allowing respawn), disable the body (ignores collisions), update the player score and play sound effect.
function DestroyCoin(PC, Coin) {
  if (GamePlaying) {
    Coin.setActive(false);
    Coin.setVisible(false);
    Coin.disableBody();
    Coin.UpdatePlayerScore();
    CoinCollected.play();
    CoinCollected.volume = 0.1;
  }
}
// If PC & NPC Collided and Game Playing is true, then set NPC to inactive (allowing respawn), disable the body (ignores collisions), update the player lives and play sound effect.
function DecreasePlayerLife(PC, NPC) {
  if (GamePlaying) {
    NPC.setActive(false);
    NPC.setVisible(false);
    NPC.disableBody();
    Hurt.play();
    Hurt.volume = 0.1;
    PC_Lives = PC_Lives - 1;
    PlayerLivesText.text = "Lives: " + PC_Lives;
    if (PC_Lives == 0) {
      GameOver();
    }
  }
}
// If PC & Insect Collided and Game Playing is true, then set insect to inactive (allowing respawn), disable the body (ignores collisions), update the player score, player scale and play sound effect.
function IncreasePlayerScale(PC, Insect) {
  if (GamePlaying) {
    Insect.setActive(false);
    Insect.setVisible(false);
    Insect.disableBody(true);
    InsectEaten.play();
    InsectEaten.volume = 0.1;
    PC_Scale = PC_Scale + 0.01;
    PC.setScale(PC_Scale);
    PC_Score = PC_Score + 250;
  }
}
// If PC & Health Collided and Game Playing is true, then set health to inactive (allowing respawn), disable the body (ignores collisions), update the player lives and play sound effect.
function IncreasePlayerLives(PC, Health) {
  if (GamePlaying) {
    Health.setActive(false);
    Health.setVisible(false);
    Health.disableBody(true);
    HealthCollected.play();
    HealthCollected.volume = 0.2;
    PC_Lives = PC_Lives + 1;
    PlayerLivesText.text = "Lives: " + PC_Lives;
    if (PC_Lives >= 5) {
      let HealthNextDelay = Phaser.Math.RND.integerInRange(20000, 30000);
    }
  }
}
