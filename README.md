# Scratch 3 到 HTML 转换器

![license](https://img.shields.io/github/license/fengshuo2004/SB3toHTML?style=flat-square) ![version](https://img.shields.io/github/package-json/v/fengshuo2004/SB3toHTML?style=flat-square)

## 总览

Scratch3-Packager通过将一个Scratch项目连同所需的scratch虚拟机打包在一起，将这个项目转换成独立的单个html文件。

相比于分发sb3项目文件，直接分发html文件解决了需要额外安装Scratch编辑器的不便（仍然需要支持HTML5的网页浏览器）；同时也能提高抄袭源码的成本，一定程度上保护您的项目。

您可以使用我开发的Scratch3-Wrapper进一步把HTML转换成Windows可执行文件（exe），彻底去除任何依赖直接在系统内运行。

![screenshot of the converter running](assets/screenshot.png)

核心代码分叉自Sheep_maker的仓库，本程序把Scratch 3项目（.sb3文件）转换为独立的HTML文件。

我使用NodeJS Electron将此程序打包成Windows/MacOS/Linux执行档，还顺便对原本的用户界面进行了美观性打磨。

## 构建

### Scratch3-Packager

> ⚠ 由于一些文件的引用方式，您必须先**构建**再调试！

需要<u>NodeJS环境</u>和<u>NPM包管理器</u>。遵循以下步骤：

1. 用git克隆这个仓库到本地：

```bash
git clone https://github.com/fengshuo2004/SB3toHTML.git
cd SB3toHTML
```

2. NPM安装需要的依赖：

```bash
npm install
```

3. 根据您的平台构建二进制：

```bash
npm run dist
```

4. Electron-builder会在本目录下创建一个名为`dist`的文件夹，在里面构建二进制文件。不同系统会生成不同的目录，Windows系统是这样的：

```
📂 SB3toHTML (本目录)
 → 📂 dist
    → 📂 win-unpacked
       → 📄 scratch3-packager.exe
```

5. 运行这个可执行文件即运行主程序

### Scratch3-Wrapper

需要<u>Powershell</u>版本≥3、<u>Python 3</u>、其自带的<u>Tkinter模块</u>和<u>PyInstaller</u>

1. Github对文件大小的限制不得不使我gitignore一些二进制文件，您需要运行脚本下载它们

## 计划

将来会支持这些新功能（按优先级从大到小排列)

- [ ] 📦 为MacOS和Linux构建
- [ ] 🔗 更好地衔接EXE转换器
- [ ] 🌳 将分支更新到与SheepTester的Master平行，这会带来如连接到云变量服务器、“加载中”占位图等新功能
- [ ] 🌏 多语言
- [ ] 👆 支持拖动文件进窗口作为sb3项目
- [ ] 🏅 给Windows安装程序添加签名
