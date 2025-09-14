// 猫咪跑酷游戏逻辑
class RunningCatGame {
  constructor() {
    this.score = 0;
    this.distance = 0;
    this.catPosition = 0; // 猫咪位置 (0地面, 1跳跃)
    this.obstacles = []; // 障碍物列表
    this.gameRunning = false;
    this.gameSpeed = 2;
  }

  // 开始游戏
  startGame() {
    this.gameRunning = true;
    this.score = 0;
    this.distance = 0;
    this.catPosition = 0;
    this.obstacles = [];
    console.log("猫咪跑酷游戏开始！");
    this.gameLoop();
  }

  // 游戏主循环
  gameLoop() {
    if (!this.gameRunning) return;

    // 生成新的障碍物
    this.generateObstacle();

    // 更新障碍物位置
    this.updateObstacles();

    // 更新距离和得分
    this.updateDistance();

    // 检查碰撞
    this.checkCollisions();

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
    console.log("=== 猫咪跑酷游戏 ===");
    console.log("得分: " + this.score + " | 距离: " + Math.floor(this.distance) + "米");
    console.log("");
    
    // 创建游戏区域 (5行 x 20列)
    const gameArea = [];
    for (let i = 0; i < 5; i++) {
      gameArea[i] = Array(20).fill(" ");
    }
    
    // 放置障碍物和奖励
    for (let obstacle of this.obstacles) {
      const col = Math.floor(obstacle.xPosition);
      if (col >= 0 && col < 20) {
        // 第4行是地面，第3行是空中
        const row = obstacle.type === "bone" ? 3 : 2;
        gameArea[row][col] = obstacle.type === "bone" ? "☠️" : "🐟";
      }
    }
    
    // 放置猫咪
    const catRow = this.catPosition === 0 ? 4 : 3; // 地面是第4行，跳跃时是第3行
    const catCol = 2; // 猫咪固定在第3列
    gameArea[catRow][catCol] = "🐱";
    
    // 显示游戏区域
    for (let i = 0; i < 5; i++) {
      console.log(gameArea[i].join(" "));
    }
    console.log("====================");
    console.log("操作说明: 空格键或j - 跳跃, q - 退出游戏");
  }

  // 生成障碍物
  generateObstacle() {
    // 每隔一段时间生成一个新障碍物
    if (Math.random() < 0.02) {
      const obstacleType = Math.random() < 0.6 ? "bone" : "fish"; // 60%骨头(障碍), 40%小鱼干(得分)
      this.obstacles.push({
        type: obstacleType,
        xPosition: 20 // 起始位置在屏幕右侧外
      });
    }
  }

  // 更新障碍物位置
  updateObstacles() {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obstacle = this.obstacles[i];
      obstacle.xPosition -= this.gameSpeed;

      // 如果障碍物移出屏幕，移除它
      if (obstacle.xPosition < -2) {
        this.obstacles.splice(i, 1);
      }
    }
  }

  // 更新距离和得分
  updateDistance() {
    this.distance += this.gameSpeed / 10;
    this.score = Math.floor(this.distance);
  }

  // 检查碰撞
  checkCollisions() {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obstacle = this.obstacles[i];
      // 简单的碰撞检测：障碍物位置接近猫咪
      if (obstacle.xPosition < 2 && obstacle.xPosition > 0) {
        if (this.catPosition === 0 && obstacle.type === "bone") {
          // 地面遇到骨头，游戏结束
          this.gameOver();
          return;
        } else if (this.catPosition === 1 && obstacle.type === "bone") {
          // 跳跃避开骨头，继续游戏
          this.obstacles.splice(i, 1);
        } else if (this.catPosition === 0 && obstacle.type === "fish") {
          // 地面接到小鱼干，加分
          this.score += 20;
          console.log("接到小鱼干！得分 +20");
          this.obstacles.splice(i, 1);
        } else if (this.catPosition === 1 && obstacle.type === "fish") {
          // 跳跃时接到小鱼干，加分
          this.score += 20;
          console.log("空中接到小鱼干！得分 +20");
          this.obstacles.splice(i, 1);
        }
      }
    }
  }

  // 猫咪跳跃
  jump() {
    if (this.catPosition === 0) {
      this.catPosition = 1;
      console.log("猫咪跳跃！");
      // 0.5秒后落地
      setTimeout(() => {
        this.catPosition = 0;
        console.log("猫咪落地");
      }, 500);
    }
  }

  // 游戏结束
  gameOver() {
    this.gameRunning = false;
    console.log("游戏结束！最终得分: " + this.score);
  }
}

// 导出游戏类
module.exports = RunningCatGame;