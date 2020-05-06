# Scratch 3 到 HTML 转换器

## 总览

SB3toHTML通过将一个Scratch项目连同所需的scratch虚拟机打包在一起，将这个项目转换成独立的单个html文件。

相比于分发sb3项目文件，直接分发html文件解决了需要额外安装Scratch编辑器的不便（仍然需要支持HTML5的网页浏览器）；同时也能提高抄袭源码的成本，一定程度上保护您的项目。

![screenshot of the converter running](assets/screenshot.png)

核心代码分叉自Sheep_maker的仓库，本程序把Scratch 3项目（.sb3文件）转换为独立的HTML文件。

我使用NodeJS Electron将此程序打包成Windows/MacOS/Linux执行档，还顺便对原本的用户界面进行了美观性打磨。

## 开发

如果您想自己开发和构建本项目，您需要NodeJS环境和NPM包管理器。遵循以下步骤：

1. 用git克隆这个仓库到本地：

```bash
git clone https://github.com/fengshuo2004/SB3toHTML.git
```

2. NPM安装需要的依赖：

```bash
cd SB3toHTML
npm install
```

3. 启动Electron：

```bash
electron .
```
4. 完成！

## 计划

将来会支持这些新功能（按重要度从大到小排列)

- [ ] 支持拖动文件进窗口作为sb3项目
- [ ] 将分支更新到与SheepTester的Master平行，这会带来如连接到云变量服务器、加载中占位图等新功能