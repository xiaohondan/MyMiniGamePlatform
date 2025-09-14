// 猫咪拼图游戏逻辑
class PuzzleGame {
  constructor() {
    this.boardSize = 3; // 3x3拼图
    this.tiles = [];
    this.emptyPosition = 8; // 空格位置(0-8)
    this.moves = 0; // 移动次数
    this.gameCompleted = false;
  }

  // 初始化游戏
  initGame() {
    // 创建顺序排列的拼图块
    this.tiles = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // 0代表空格
    this.emptyPosition = 8;
    this.moves = 0;
    this.gameCompleted = false;
    
    // 随机打乱拼图
    this.shuffle();
    
    console.log("拼图游戏初始化完成！");
    this.displayBoard();
  }

  // 随机打乱拼图
  shuffle() {
    // 进行1000次随机移动来打乱拼图
    for (let i = 0; i < 1000; i++) {
      const possibleMoves = this.getPossibleMoves();
      if (possibleMoves.length > 0) {
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        this.moveTile(randomMove);
      }
    }
    
    // 重置移动次数
    this.moves = 0;
  }

  // 获取可移动的拼图块位置
  getPossibleMoves() {
    const row = Math.floor(this.emptyPosition / this.boardSize);
    const col = this.emptyPosition % this.boardSize;
    const moves = [];

    // 检查四个方向是否有拼图块可以移动
    if (row > 0) moves.push(this.emptyPosition - this.boardSize); // 上
    if (row < this.boardSize - 1) moves.push(this.emptyPosition + this.boardSize); // 下
    if (col > 0) moves.push(this.emptyPosition - 1); // 左
    if (col < this.boardSize - 1) moves.push(this.emptyPosition + 1); // 右

    return moves;
  }

  // 移动拼图块
  moveTile(position) {
    // 检查是否可以移动
    const possibleMoves = this.getPossibleMoves();
    if (possibleMoves.includes(position)) {
      // 交换空格和指定位置的拼图块
      [this.tiles[this.emptyPosition], this.tiles[position]] = 
      [this.tiles[position], this.tiles[this.emptyPosition]];
      
      // 更新空格位置
      this.emptyPosition = position;
      
      // 增加移动次数
      this.moves++;
      
      // 检查是否完成拼图
      this.checkCompletion();
      
      // 显示当前状态
      this.displayBoard();
      
      return true;
    }
    return false;
  }

  // 检查拼图是否完成
  checkCompletion() {
    // 检查拼图是否按顺序排列
    for (let i = 0; i < this.tiles.length - 1; i++) {
      if (this.tiles[i] !== i + 1) {
        return false;
      }
    }
    
    // 最后一个位置应该是空格
    if (this.tiles[this.tiles.length - 1] === 0) {
      this.gameCompleted = true;
      console.log("恭喜！拼图完成！总移动次数: " + this.moves);
      return true;
    }
    
    return false;
  }

  // 显示拼图板
  displayBoard() {
    console.clear();
    console.log("=== 猫咪拼图游戏 ===");
    console.log("目标：将拼图块按数字顺序排列");
    console.log("移动次数: " + this.moves);
    console.log("");
    
    let board = "";
    for (let i = 0; i < this.boardSize; i++) {
      board += "| ";
      for (let j = 0; j < this.boardSize; j++) {
        const value = this.tiles[i * this.boardSize + j];
        if (value === 0) {
          board += "   | ";  // 空格显示为空白
        } else {
          board += " " + value + " | ";  // 数字两侧加空格使其居中
        }
      }
      board += "\n";
      
      // 添加分隔线
      if (i === 0) {
        board += "-------------\n";
      }
    }
    console.log(board);
    console.log("操作说明：输入数字0-8来移动对应的拼图块到空格位置，q退出游戏");
  }

  // 重新开始游戏
  restart() {
    this.initGame();
  }
}

// 导出游戏类
module.exports = PuzzleGame;