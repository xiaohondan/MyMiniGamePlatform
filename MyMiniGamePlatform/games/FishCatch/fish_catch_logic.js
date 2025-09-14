// 猫咪接小鱼干游戏逻辑
class FishCatchGame {
  constructor() {
    this.score = 0;
    this.lives = 3;
    this.gameSpeed = 1;
    this.catPosition = 0; // 猫咪位置 (-1 左, 0 中, 1 右)
    this.fallingItems = []; // 掉落物品列表
    this.gameRunning = false;
  }

  // 开始游戏
  startGame() {
    this.gameRunning = true;
    this.score = 0;
    this.lives = 3;
    this.gameSpeed = 1;
    this.catPosition = 0;
    this.fallingItems = [];
    console.log("游戏开始！");
    this.gameLoop();
  }

  // 游戏主循环
  gameLoop() {
    if (!this.gameRunning) return;

    // 生成新的掉落物品
    this.generateFallingItem();

    // 更新物品位置
    this.updateFallingItems();

    // 检查碰撞
    this.checkCollisions();

    // 更新游戏速度
    this.updateGameSpeed();

    // 显示游戏状态
    this.displayGame();

    // 继续循环 (降低频率以提高性能)
    setTimeout(() => this.gameLoop(), 100); // 每100毫秒更新一次
  }

  // 显示游戏状态
  displayGame() {
    // 清屏
    console.clear();
    
    // 显示游戏信息
    console.log("=== 猫咪接小鱼干游戏 ===");
    console.log("得分: " + this.score + " | 生命值: " + this.lives + " | 速度: " + this.gameSpeed.toFixed(1));
    console.log("");
    
    // 创建游戏区域 (10行 x 3列)
    const gameArea = [];
    for (let i = 0; i < 10; i++) {
      gameArea[i] = [" ", " ", " "];
    }
    
    // 放置掉落物品
    for (let item of this.fallingItems) {
      const row = Math.floor(item.yPosition * 9);
      const col = item.lane + 1; // 转换为 0, 1, 2 列
      
      if (row >= 0 && row < 10 && col >= 0 && col < 3) {
        gameArea[row][col] = item.type === "fish" ? "🐟" : "☠️";
      }
    }
    
    // 放置猫咪
    const catRow = 9; // 猫咪在底部
    const catCol = this.catPosition + 1; // 转换为 0, 1, 2 列
    gameArea[catRow][catCol] = "🐱";
    
    // 显示游戏区域
    console.log("  左   中   右");
    for (let i = 0; i < 10; i++) {
      console.log("| " + gameArea[i][0] + " | " + gameArea[i][1] + " | " + gameArea[i][2] + " |");
    }
    console.log("=============");
    console.log("操作说明: a - 向左移动, d - 向右移动, q - 退出游戏");
  }

  // 生成掉落物品
  generateFallingItem() {
    // 每隔一段时间生成一个新物品
    if (Math.random() < 0.02 * this.gameSpeed) {
      const itemType = Math.random() < 0.7 ? "fish" : "bone"; // 70%小鱼干，30%骨头
      const lane = Math.floor(Math.random() * 3) - 1; // -1, 0, 1 三个通道
      this.fallingItems.push({
        type: itemType,
        lane: lane,
        yPosition: 0
      });
    }
  }

  // 更新掉落物品位置
  updateFallingItems() {
    for (let i = this.fallingItems.length - 1; i >= 0; i--) {
      const item = this.fallingItems[i];
      item.yPosition += 0.05 * this.gameSpeed;

      // 如果物品落出屏幕，移除它
      if (item.yPosition > 1) {
        this.fallingItems.splice(i, 1);
        // 如果是小鱼干没接住，减少生命值
        if (item.type === "fish") {
          this.lives--;
          console.log("没接住小鱼干！生命值 -1");
          if (this.lives <= 0) {
            this.gameOver();
          }
        }
      }
    }
  }

  // 检查碰撞
  checkCollisions() {
    for (let i = this.fallingItems.length - 1; i >= 0; i--) {
      const item = this.fallingItems[i];
      // 简单的碰撞检测：物品在同一通道且位置接近底部
      if (item.lane === this.catPosition && item.yPosition > 0.8) {
        if (item.type === "fish") {
          this.score += 10;
          console.log("接住小鱼干！得分 +10");
        } else {
          this.lives--;
          console.log("接到骨头！生命值 -1");
          if (this.lives <= 0) {
            this.gameOver();
          }
        }
        // 移除已接住的物品
        this.fallingItems.splice(i, 1);
      }
    }
  }

  // 更新游戏速度
  updateGameSpeed() {
    // 每100分增加一次速度
    this.gameSpeed = 1 + Math.floor(this.score / 100) * 0.2;
  }

  // 移动猫咪
  moveCat(direction) {
    // -1 左, 1 右
    this.catPosition += direction;
    // 限制在 -1 到 1 之间
    if (this.catPosition < -1) this.catPosition = -1;
    if (this.catPosition > 1) this.catPosition = 1;
    console.log("猫咪移动到位置: " + this.catPosition);
  }

  // 游戏结束
  gameOver() {
    this.gameRunning = false;
    console.log("游戏结束！最终得分: " + this.score);
  }
}

// 导出游戏类
module.exports = FishCatchGame;

// 示例使用方式：
// const game = new FishCatchGame();
// game.startGame();
// game.moveCat(-1); // 向左移动