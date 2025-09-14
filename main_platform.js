// 猫咪小游戏平台主界面逻辑
const readline = require('readline');
const fs = require('fs');

// 启用keypress事件（仅在支持的环境中）
if (process.stdin.isTTY && typeof process.stdin.setRawMode === 'function') {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
}

// 导入各个游戏的逻辑
const FishCatchGame = require('./games/FishCatch/fish_catch_logic.js');
const RunningCatGame = require('./games/RunningCat/running_cat_logic.js');
const PuzzleGame = require('./games/Puzzle/puzzle_logic.js');
const MemoryCardsGame = require('./games/MemoryCards/memory_cards_logic.js');

class GamePlatform {
  constructor() {
    this.currentGame = null;
    this.currentGameType = null;
    this.gamesList = [
      {name: "猫咪接小鱼干", id: "fishCatch"},
      {name: "猫咪跑酷", id: "runningCat"},
      {name: "猫咪拼图", id: "puzzle"},
      {name: "猫咪记忆翻牌", id: "memoryCards"}
    ];
    
    // 创建readline接口
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // 初始化平台
  init() {
    console.log("欢迎来到猫咪小游戏平台！");
    console.log("请选择一个游戏开始玩耍：");
    
    // 显示游戏列表
    this.displayGamesList();
    
    // 等待用户输入
    this.waitForInput();
  }

  // 显示游戏列表
  displayGamesList() {
    console.log("\n=== 游戏列表 ===");
    for (let i = 0; i < this.gamesList.length; i++) {
      console.log((i + 1) + ". " + this.gamesList[i].name);
    }
    console.log("0. 退出游戏平台");
    console.log("================\n");
  }

  // 等待用户输入
  waitForInput() {
    this.rl.question("请输入您的选择: ", (answer) => {
      this.handleUserInput(answer);
    });
  }

  // 处理用户输入
  handleUserInput(input) {
    const choice = parseInt(input);
    
    // 检查输入是否有效
    if (isNaN(choice)) {
      console.log("请输入有效的数字！");
      this.waitForInput();
      return;
    }
    
    // 处理用户选择
    if (choice === 0) {
      console.log("感谢游玩猫咪小游戏平台，再见！");
      this.rl.close();
      return;
    }
    
    if (choice >= 1 && choice <= this.gamesList.length) {
      const selectedGame = this.gamesList[choice - 1];
      this.launchGame(selectedGame.id);
    } else {
      console.log("无效的选择，请重新输入！");
      this.waitForInput();
    }
  }

  // 启动选定的游戏
  launchGame(gameId) {
    console.log("正在启动 " + this.gamesList.find(g => g.id === gameId).name + "...");
    
    switch (gameId) {
      case "fishCatch":
        this.currentGame = new FishCatchGame();
        this.currentGameType = "fishCatch";
        this.playFishCatchGame();
        break;
      case "runningCat":
        this.currentGame = new RunningCatGame();
        this.currentGameType = "runningCat";
        this.playRunningCatGame();
        break;
      case "puzzle":
        this.currentGame = new PuzzleGame();
        this.currentGameType = "puzzle";
        this.playPuzzleGame();
        break;
      case "memoryCards":
        this.currentGame = new MemoryCardsGame();
        this.currentGameType = "memoryCards";
        this.playMemoryCardsGame();
        break;
      default:
        console.log("无效的游戏选择！");
        this.returnToMainMenu();
        break;
    }
  }

  // 玩猫咪接小鱼干游戏
  playFishCatchGame() {
    console.log("\n=== 猫咪接小鱼干游戏 ===");
    console.log("游戏规则：");
    console.log("- 使用 a 键向左移动，d 键向右移动");
    console.log("- 接住小鱼干得分，接到骨头扣生命值");
    console.log("- 生命值为0时游戏结束");
    console.log("- 按 q 键退出游戏\n");
    
    this.currentGame.startGame();
    
    // 等待用户输入
    this.rl.question("按任意键开始游戏，或输入 q 退出: ", (answer) => {
      if (answer.toLowerCase() === 'q') {
        this.currentGame.gameRunning = false;
        this.returnToMainMenu();
        return;
      }
      
      // 开始监听游戏操作
      this.handleFishCatchInput();
    });
  }
  
  // 处理猫咪接小鱼干游戏操作
  handleFishCatchInput() {
    console.log("游戏开始！输入 a 向左，d 向右，q 退出");
    
    // 检查是否支持keypress事件
    if (process.stdin.isTTY && typeof process.stdin.setRawMode === 'function') {
      // 移除之前的line监听器
      this.rl.removeAllListeners('line');
      
      // 监听keypress事件
      process.stdin.on('keypress', (str, key) => {
        // 检查游戏是否仍在运行
        if (!this.currentGame.gameRunning) {
          process.stdin.removeAllListeners('keypress');
          this.returnToMainMenu();
          return;
        }
        
        // 处理特殊按键
        if (key && key.name) {
          switch (key.name.toLowerCase()) {
            case 'a':
              this.currentGame.moveCat(-1);
              break;
            case 'd':
              this.currentGame.moveCat(1);
              break;
            case 'q':
              this.currentGame.gameRunning = false;
              console.log("\n退出游戏，最终得分: " + this.currentGame.score);
              process.stdin.removeAllListeners('keypress');
              this.returnToMainMenu();
              return;
            case 'c':
              // Ctrl+C 退出
              if (key.ctrl) {
                this.currentGame.gameRunning = false;
                process.stdin.removeAllListeners('keypress');
                this.rl.close();
                console.log("\n游戏已退出");
                process.exit(0);
              }
              break;
          }
        }
      });
    } else {
      // 回退到line事件处理
      this.rl.on('line', (input) => {
        if (!this.currentGame.gameRunning) {
          this.rl.removeAllListeners('line');
          this.returnToMainMenu();
          return;
        }
        
        switch (input.toLowerCase()) {
          case 'a':
            this.currentGame.moveCat(-1);
            break;
          case 'd':
            this.currentGame.moveCat(1);
            break;
          case 'q':
            this.currentGame.gameRunning = false;
            console.log("退出游戏，最终得分: " + this.currentGame.score);
            this.rl.removeAllListeners('line');
            this.returnToMainMenu();
            return;
          default:
            console.log("无效输入！使用 a 向左，d 向右，q 退出");
        }
      });
    }
  }

  // 玩猫咪跑酷游戏
  playRunningCatGame() {
    console.log("\n=== 猫咪跑酷游戏 ===");
    console.log("游戏规则：");
    console.log("- 按空格键或 j 键让猫咪跳跃");
    console.log("- 跳过骨头障碍，接住小鱼干得分");
    console.log("- 按 q 键退出游戏\n");
    
    this.currentGame.startGame();
    
    // 等待用户输入
    this.rl.question("按任意键开始游戏，或输入 q 退出: ", (answer) => {
      if (answer.toLowerCase() === 'q') {
        this.currentGame.gameRunning = false;
        this.returnToMainMenu();
        return;
      }
      
      // 开始监听游戏操作
      this.handleRunningCatInput();
    });
  }
  
  // 处理猫咪跑酷游戏操作
  handleRunningCatInput() {
    console.log("游戏开始！按空格键或 j 跳跃，q 退出");
    
    // 检查是否支持keypress事件
    if (process.stdin.isTTY && typeof process.stdin.setRawMode === 'function') {
      // 移除之前的line监听器
      this.rl.removeAllListeners('line');
      
      // 监听keypress事件
      process.stdin.on('keypress', (str, key) => {
        // 检查游戏是否仍在运行
        if (!this.currentGame.gameRunning) {
          process.stdin.removeAllListeners('keypress');
          this.returnToMainMenu();
          return;
        }
        
        // 处理特殊按键
        if (key && key.name) {
          switch (key.name.toLowerCase()) {
            case 'space':
            case 'j':
              this.currentGame.jump();
              break;
            case 'q':
              this.currentGame.gameRunning = false;
              console.log("\n退出游戏，最终得分: " + this.currentGame.score);
              process.stdin.removeAllListeners('keypress');
              this.returnToMainMenu();
              return;
            case 'c':
              // Ctrl+C 退出
              if (key.ctrl) {
                this.currentGame.gameRunning = false;
                process.stdin.removeAllListeners('keypress');
                this.rl.close();
                console.log("\n游戏已退出");
                process.exit(0);
              }
              break;
          }
        }
      });
    } else {
      // 回退到line事件处理
      this.rl.on('line', (input) => {
        if (!this.currentGame.gameRunning) {
          this.rl.removeAllListeners('line');
          this.returnToMainMenu();
          return;
        }
        
        switch (input.toLowerCase()) {
          case ' ':
          case 'j':
            this.currentGame.jump();
            break;
          case 'q':
            this.currentGame.gameRunning = false;
            console.log("退出游戏，最终得分: " + this.currentGame.score);
            this.rl.removeAllListeners('line');
            this.returnToMainMenu();
            return;
          default:
            console.log("按空格键或 j 跳跃，q 退出");
        }
      });
    }
  }

  // 玩猫咪拼图游戏
  playPuzzleGame() {
    console.log("\n=== 猫咪拼图游戏 ===");
    console.log("游戏规则：");
    console.log("- 输入数字 0-8 来移动对应的拼图块");
    console.log("- 将拼图块按顺序排列完成拼图");
    console.log("- 按 q 键退出游戏\n");
    
    this.currentGame.initGame();
    
    // 等待用户输入
    this.rl.question("按任意键开始游戏，或输入 q 退出: ", (answer) => {
      if (answer.toLowerCase() === 'q') {
        this.returnToMainMenu();
        return;
      }
      
      // 开始监听游戏操作
      this.handlePuzzleInput();
    });
  }
  
  // 处理猫咪拼图游戏操作
  handlePuzzleInput() {
    console.log("请输入要移动的拼图块编号 (0-8)，或输入 q 退出:");
    
    // 检查是否支持keypress事件
    if (process.stdin.isTTY && typeof process.stdin.setRawMode === 'function') {
      // 移除之前的line监听器
      this.rl.removeAllListeners('line');
      
      // 监听keypress事件
      process.stdin.on('keypress', (str, key) => {
        // 检查游戏是否已完成
        if (this.currentGame.gameCompleted) {
          process.stdin.removeAllListeners('keypress');
          setTimeout(() => {
            this.returnToMainMenu();
          }, 2000);
          return;
        }
        
        // 处理特殊按键
        if (key && key.name) {
          // 处理 q 键退出
          if (key.name.toLowerCase() === 'q') {
            process.stdin.removeAllListeners('keypress');
            this.returnToMainMenu();
            return;
          }
          
          // 处理 Ctrl+C 退出
          if (key.name.toLowerCase() === 'c' && key.ctrl) {
            process.stdin.removeAllListeners('keypress');
            this.rl.close();
            console.log("\n游戏已退出");
            process.exit(0);
          }
          
          // 处理数字输入
          const numericKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
          if (numericKeys.includes(key.name)) {
            const position = parseInt(key.name);
            const success = this.currentGame.moveTile(position);
            if (!success) {
              console.log("无法移动该拼图块，请重新选择");
            }
            
            if (this.currentGame.gameCompleted) {
              console.log("恭喜完成拼图！");
              process.stdin.removeAllListeners('keypress');
              setTimeout(() => {
                this.returnToMainMenu();
              }, 2000);
            }
          }
        }
      });
    } else {
      // 回退到line事件处理
      this.rl.on('line', (input) => {
        if (this.currentGame.gameCompleted) {
          this.rl.removeAllListeners('line');
          this.returnToMainMenu();
          return;
        }
        
        if (input.toLowerCase() === 'q') {
          this.rl.removeAllListeners('line');
          this.returnToMainMenu();
          return;
        }
        
        const position = parseInt(input);
        if (isNaN(position)) {
          console.log("请输入有效的数字 (0-8)，或输入 q 退出");
          return;
        }
        
        const success = this.currentGame.moveTile(position);
        if (!success) {
          console.log("无法移动该拼图块，请重新选择");
        }
        
        if (this.currentGame.gameCompleted) {
          console.log("恭喜完成拼图！");
          this.rl.removeAllListeners('line');
          setTimeout(() => {
            this.returnToMainMenu();
          }, 2000);
        } else {
          console.log("请输入要移动的拼图块编号 (0-8)，或输入 q 退出:");
        }
      });
    }
  }

  // 玩猫咪记忆翻牌游戏
  playMemoryCardsGame() {
    console.log("\n=== 猫咪记忆翻牌游戏 ===");
    console.log("游戏规则：");
    console.log("- 输入数字 0-15 来翻开对应的卡片");
    console.log("- 找到两张相同图案的卡片完成匹配");
    console.log("- 完成所有匹配赢得游戏");
    console.log("- 按 q 键退出游戏\n");
    
    this.currentGame.initGame();
    
    // 等待用户输入
    this.rl.question("按任意键开始游戏，或输入 q 退出: ", (answer) => {
      if (answer.toLowerCase() === 'q') {
        this.returnToMainMenu();
        return;
      }
      
      // 开始监听游戏操作
      this.handleMemoryCardsInput();
    });
  }
  
  // 处理猫咪记忆翻牌游戏操作
  handleMemoryCardsInput() {
    console.log("请输入要翻开的卡片编号 (0-15)，或输入 q 退出:");
    
    // 检查是否支持keypress事件
    if (process.stdin.isTTY && typeof process.stdin.setRawMode === 'function') {
      // 移除之前的line监听器
      this.rl.removeAllListeners('line');
      
      // 监听keypress事件
      process.stdin.on('keypress', (str, key) => {
        // 检查游戏是否已完成
        if (this.currentGame.gameCompleted) {
          process.stdin.removeAllListeners('keypress');
          setTimeout(() => {
            this.returnToMainMenu();
          }, 2000);
          return;
        }
        
        // 处理特殊按键
        if (key && key.name) {
          // 处理 q 键退出
          if (key.name.toLowerCase() === 'q') {
            process.stdin.removeAllListeners('keypress');
            this.returnToMainMenu();
            return;
          }
          
          // 处理 Ctrl+C 退出
          if (key.name.toLowerCase() === 'c' && key.ctrl) {
            process.stdin.removeAllListeners('keypress');
            this.rl.close();
            console.log("\n游戏已退出");
            process.exit(0);
          }
          
          // 处理数字输入
          const numericKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
          if (numericKeys.includes(key.name)) {
            const index = parseInt(key.name);
            // 对于10-15的数字，需要特殊处理
            if (key.name === '1') {
              // 等待下一位数字
              console.log("请输入下一位数字 (0-5) 或按其他键取消:");
              const handleSecondDigit = (str2, key2) => {
                if (key2 && key2.name && numericKeys.includes(key2.name) && parseInt(key2.name) <= 5) {
                  const secondDigit = parseInt(key2.name);
                  const fullIndex = 10 + secondDigit;
                  this.currentGame.flipCard(fullIndex);
                } else {
                  console.log("无效输入，请重新输入卡片编号 (0-15)");
                }
                // 移除临时监听器
                process.stdin.removeListener('keypress', handleSecondDigit);
                console.log("请输入要翻开的卡片编号 (0-15)，或输入 q 退出:");
              };
              process.stdin.once('keypress', handleSecondDigit);
              return;
            }
            
            this.currentGame.flipCard(index);
            
            if (this.currentGame.gameCompleted) {
              console.log("恭喜完成游戏！");
              process.stdin.removeAllListeners('keypress');
              setTimeout(() => {
                this.returnToMainMenu();
              }, 2000);
            }
          }
        }
      });
    } else {
      // 回退到line事件处理
      this.rl.on('line', (input) => {
        if (this.currentGame.gameCompleted) {
          this.rl.removeAllListeners('line');
          this.returnToMainMenu();
          return;
        }
        
        if (input.toLowerCase() === 'q') {
          this.rl.removeAllListeners('line');
          this.returnToMainMenu();
          return;
        }
        
        const index = parseInt(input);
        if (isNaN(index)) {
          console.log("请输入有效的数字 (0-15)，或输入 q 退出");
          return;
        }
        
        this.currentGame.flipCard(index);
        
        if (this.currentGame.gameCompleted) {
          console.log("恭喜完成游戏！");
          this.rl.removeAllListeners('line');
          setTimeout(() => {
            this.returnToMainMenu();
          }, 2000);
        } else {
          console.log("请输入要翻开的卡片编号 (0-15)，或输入 q 退出:");
        }
      });
    }
  }

  // 返回主菜单
  returnToMainMenu() {
    this.currentGame = null;
    this.currentGameType = null;
    console.log("\n返回游戏平台主菜单...");
    this.displayGamesList();
    this.waitForInput();
  }
}

// 初始化游戏平台
const platform = new GamePlatform();
platform.init();