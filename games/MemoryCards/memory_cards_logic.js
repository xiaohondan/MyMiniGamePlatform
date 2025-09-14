// 猫咪记忆翻牌游戏逻辑
class MemoryCardsGame {
  constructor() {
    this.cards = [];
    this.flippedCards = []; // 已翻开的卡片
    this.matchedPairs = 0; // 已匹配的对数
    this.totalPairs = 8; // 总共8对卡片
    this.moves = 0; // 翻牌次数
    this.gameCompleted = false;
  }

  // 初始化游戏
  initGame() {
    // 创建卡片对
    const cardValues = ["🐟", "🐠", "🐡", "🐙", "🦑", "🦀", "🐬", "🐱"];
    this.cards = [];
    
    // 每种卡片创建两个实例
    for (let value of cardValues) {
      this.cards.push({value: value, flipped: false, matched: false});
      this.cards.push({value: value, flipped: false, matched: false});
    }
    
    // 随机打乱卡片顺序
    this.shuffleCards();
    
    // 重置游戏状态
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.gameCompleted = false;
    
    console.log("记忆翻牌游戏初始化完成！");
    this.displayBoard();
  }

  // 随机打乱卡片顺序
  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // 翻开卡片
  flipCard(index) {
    // 检查索引是否有效
    if (index < 0 || index >= this.cards.length) {
      console.log("无效的卡片索引！");
      return false;
    }
    
    const card = this.cards[index];
    
    // 检查卡片是否已经翻开或已匹配
    if (card.flipped || card.matched) {
      console.log("这张卡片已经翻开或已匹配！");
      return false;
    }
    
    // 翻开卡片
    card.flipped = true;
    this.flippedCards.push({index: index, card: card});
    
    console.log("翻开卡片 " + index + ": " + card.value);
    this.displayBoard();
    
    // 检查是否翻开两张卡片
    if (this.flippedCards.length === 2) {
      this.moves++;
      this.checkMatch();
    }
    
    return true;
  }

  // 检查两张卡片是否匹配
  checkMatch() {
    const card1 = this.flippedCards[0];
    const card2 = this.flippedCards[1];
    
    // 如果两张卡片值相同，则匹配成功
    if (card1.card.value === card2.card.value) {
      console.log("匹配成功！");
      card1.card.matched = true;
      card2.card.matched = true;
      this.matchedPairs++;
      
      // 检查游戏是否完成
      if (this.matchedPairs === this.totalPairs) {
        this.gameCompleted = true;
        console.log("恭喜！游戏完成！总翻牌次数: " + this.moves);
      }
    } else {
      console.log("不匹配，卡片将被翻回");
      // 1秒后将卡片翻回
      setTimeout(() => {
        card1.card.flipped = false;
        card2.card.flipped = false;
        this.displayBoard();
      }, 1000);
    }
    
    // 清空已翻开卡片列表
    this.flippedCards = [];
  }

  // 显示游戏板
  displayBoard() {
    console.clear();
    console.log("=== 猫咪记忆翻牌游戏 ===");
    console.log("目标：找到所有相同的卡片对");
    console.log("已匹配对数: " + this.matchedPairs + "/" + this.totalPairs + " | 翻牌次数: " + this.moves);
    console.log("");
    
    let board = "";
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      // 每4个换行
      if (i % 4 === 0 && i !== 0) board += "\n---+---+---+---\n";
      
      // 显示卡片
      if (card.matched) {
        board += " " + card.value + " ";
      } else if (card.flipped) {
        board += " " + card.value + " ";
      } else {
        board += " * ";
      }
      
      // 添加分隔符（除了每行最后一个）
      if (i % 4 !== 3) {
        board += "|";
      }
    }
    board += "\n";
    console.log(board);
    console.log("操作说明：输入数字0-15来翻开对应的卡片，q退出游戏");
  }

  // 重新开始游戏
  restart() {
    this.initGame();
  }
}

// 导出游戏类
module.exports = MemoryCardsGame;