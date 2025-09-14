# 猫咪小游戏平台

这是一个包含多个猫咪主题小游戏。

## 平台特性
- 支持多个小游戏
- 统一的用户界面
- 简单易用的操作方式

## 包含的小游戏
1. 猫咪接小鱼干
2. 猫咪跑酷
3. 猫咪拼图
4. 猫咪记忆翻牌

## 开发框架
使用Unity引擎开发，支持跨平台部署。

## 项目结构
```
MyMiniGamePlatform/
├── assets/              # 游戏资源文件
│   ├── images/          # 图片资源
│   ├── sounds/          # 音效资源
│   └── fonts/           # 字体资源
├── games/               # 各个游戏的逻辑代码
│   ├── FishCatch/       # 猫咪接小鱼干游戏
│   ├── RunningCat/      # 猫咪跑酷游戏
│   ├── Puzzle/          # 猫咪拼图游戏
│   └── MemoryCards/     # 猫咪记忆翻牌游戏
├── platforms/           # 平台相关代码
├── README.md            # 项目说明文件
├── package.json         # 项目配置文件
├── platform_config.json # 平台配置文件
├── main_platform.js     # 主平台逻辑
├── test_all_games.js    # 测试脚本
└── asset_manifest.json  # 资源清单文件
```

## 安装和运行
1. 确保已安装Node.js环境
2. 在项目根目录运行 `npm install` 安装依赖
3. 运行 `npm start` 启动游戏平台
4. 运行 `npm test` 执行所有游戏的测试

## 开发说明
1. 每个游戏的逻辑代码位于`games/`目录下对应的子目录中
2. 游戏资源文件位于`assets/`目录下
3. 主平台逻辑在`main_platform.js`中实现
4. 平台配置信息在`platform_config.json`中定义

## 测试
运行`npm test`可以执行所有游戏的测试脚本，验证游戏逻辑是否正确。