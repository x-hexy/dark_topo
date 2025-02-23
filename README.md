# 《Dark》人物关系图

这是一个基于Netflix剧集《Dark》的交互式家族关系图网站，使用HTML、CSS、JavaScript和Vis.js构建。用户可以通过可视化图谱探索剧中四个主要家族（Kahnwald、Nielsen、Doppler、Tiedemann）之间的复杂关系，搭配Dark风格的背景音乐，增强沉浸感。

## 当前特性（版本 9.0）
- **可视化**：角色头像显示、关系连线标注、按时间线（1953、1986、2019）筛选。
- **样式**：阴郁森林背景、三叉符号装饰、暗色调UI（深绿、灰色）。
- **布局**：初次显示无重叠，节点间距500px，加载3秒后固定。
- **音乐**：Dark风格背景音，默认音量30%，可播放/暂停。
- **角色扩展**：覆盖第一季核心角色，共26人。

## 版本历史
以下是开发过程中的主要版本演进：

1. **版本 1.0 - 基础关系图**
   - 功能：展示家族关系，支持时间线筛选。
   - 提交：`Initial commit: Dark family tree website`

2. **版本 2.0 - 美化与Dark风格**
   - 改动：添加森林背景（`winden_forest.jpg`）、三叉符号（`sicmundus.png`）、Roboto字体。
   - 提交：`Added Dark-themed styling with triquetra background`

3. **版本 3.0 - 添加角色图片**
   - 功能：节点显示角色图片（`imgs/角色名.jpg`）。
   - 提交：`Added character images to nodes`、`Fixed image paths`

4. **版本 4.0 - 优化间距与固定布局**
   - 改动：`springLength: 150`，3秒内固定布局。
   - 提交：`Increased node spacing for clearer relationships`、`Fixed node positions after 3 seconds`

5. **版本 5.0 - 自动调节间距**
   - 改动：`springLength: 100`，`centralGravity: 0.5`，自动平衡间距。
   - 提交：`Auto-adjusted node distances and fixed layout in 3 seconds`

6. **版本 6.0 - 尝试边调整（未采用）**
   - 功能：实验用户拖动连线形状（未成功）。
   - 提交：`Added edge adjustment with control points`、`Reverted to stable version without edge adjustment`

7. **版本 7.0 - 优化初次显示**
   - 改动：`springLength: 500`，`gravitationalConstant: -4000`，预计算布局。
   - 提交：`Improved initial spacing with springLength 500 and gravitationalConstant -4000`

8. **版本 8.0 - 添加Dark风格音乐**
   - 功能：嵌入背景音乐（`audio/background-music.mp3`），加播放/暂停按钮。
   - 提交：`Added Dark style background music with play/pause control`

9. **版本 9.0 - 扩展第一季角色**
   - 功能：角色增至26人，覆盖第一季核心人物。
   - 提交：`Expanded to Season 1 core characters (26 total)`

## 文件结构
```
dark-family-tree/
├── index.html              # 主页面
├── script.js               # 图谱逻辑
├── imgs/                 # 角色图片
│   ├── jonas.jpg
│   ├── michael.jpg
│   └── ...
├── audio/                  # 背景音乐
│   └── background-music.mp3
├── winden_forest.jpg   # 森林背景
└── sicmundus.png       # 三叉符号
```

## 使用方法
1. 访问GitHub Pages：[https://x-hexy.github.io/dark_topo/](https://x-hexy.github.io/dark_topo/)
2. 使用顶部时间线下拉菜单筛选角色。
3. 点击右下角按钮控制背景音乐（首次需手动播放）。

## 技术栈
- **前端**：HTML、CSS、JavaScript
- **库**：Vis.js（网络图）、Google Fonts（Roboto）
- **托管**：GitHub Pages

## 如何贡献
1. Fork本仓库。
2. 修改代码（添加角色、优化样式等）。
3. 提交Pull Request，欢迎任何建议！

## 下一步计划
- 添加音量调节滑块。
- 支持英文版切换。
- 扩展第二季角色（分阶段）。

## 注意事项
- 背景音乐需用户首次交互（点击播放）才能生效，因浏览器限制。
- 确保所有图片和音频文件正确上传至仓库对应路径。

---
Created with ❤️ by [x-hexy] and Grok (xAI)

