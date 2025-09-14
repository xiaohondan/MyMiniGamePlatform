// 猫咪小游戏平台测试脚本

// 测试猫咪接小鱼干游戏
function testFishCatchGame() {
  console.log("=== 测试猫咪接小鱼干游戏 ===");
  
  // 模拟游戏类导入
  const FishCatchGame = require('./games/FishCatch/fish_catch_logic.js');
  const game = new FishCatchGame();
  
  // 测试游戏初始化
  console.log("1. 测试游戏初始化...");
  game.startGame();
  
  // 测试猫咪移动
  console.log("2. 测试猫咪移动...");
  game.moveCat(-1); // 向左移动
  game.moveCat(1);  // 向右移动
  
  // 测试游戏结束条件
  console.log("3. 测试游戏结束条件...");
  game.lives = 0;
  game.gameOver();
  
  console.log("猫咪接小鱼干游戏测试完成\n");
}

// 测试猫咪跑酷游戏
function testRunningCatGame() {
  console.log("=== 测试猫咪跑酷游戏 ===");
  
  // 模拟游戏类导入
  const RunningCatGame = require('./games/RunningCat/running_cat_logic.js');
  const game = new RunningCatGame();
  
  // 测试游戏初始化
  console.log("1. 测试游戏初始化...");
  game.startGame();
  
  // 测试猫咪跳跃
  console.log("2. 测试猫咪跳跃...");
  game.jump();
  
  // 测试游戏结束条件
  console.log("3. 测试游戏结束条件...");
  game.gameOver();
  
  console.log("猫咪跑酷游戏测试完成\n");
}

// 测试猫咪拼图游戏
function testPuzzleGame() {
  console.log("=== 测试猫咪拼图游戏 ===");
  
  // 模拟游戏类导入
  const PuzzleGame = require('./games/Puzzle/puzzle_logic.js');
  const game = new PuzzleGame();
  
  // 测试游戏初始化
  console.log("1. 测试游戏初始化...");
  game.initGame();
  
  // 测试移动拼图块
  console.log("2. 测试移动拼图块...");
  game.moveTile(7); // 移动右下角的拼图块
  
  // 测试重新开始游戏
  console.log("3. 测试重新开始游戏...");
  game.restart();
  
  console.log("猫咪拼图游戏测试完成\n");
}

// 测试猫咪记忆翻牌游戏
function testMemoryCardsGame() {
  console.log("=== 测试猫咪记忆翻牌游戏 ===");
  
  // 模拟游戏类导入
  const MemoryCardsGame = require('./games/MemoryCards/memory_cards_logic.js');
  const game = new MemoryCardsGame();
  
  // 测试游戏初始化
  console.log("1. 测试游戏初始化...");
  game.initGame();
  
  // 测试翻开卡片
  console.log("2. 测试翻开卡片...");
  game.flipCard(0); // 翻开第一张卡片
  game.flipCard(1); // 翻开第二张卡片
  
  // 测试重新开始游戏
  console.log("3. 测试重新开始游戏...");
  game.restart();
  
  console.log("猫咪记忆翻牌游戏测试完成\n");
}

// 运行所有测试
function runAllTests() {
  console.log("开始测试猫咪小游戏平台...\n");
  
  // testFishCatchGame();
  // testRunningCatGame();
  // testPuzzleGame();
  // testMemoryCardsGame();
  
  console.log("所有测试完成！");
}

// 执行测试
runAllTests();