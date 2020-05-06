const license = `版权所有 © 2019-2020 冯铄及Pixelworld Studio

特此免费授予获得此软件和相关文档文件（“软件”）副本的任何人无限制使用软件的权利，包括但不限于使用，复制，修改，合并的权利，发布，分发，再许可和/或出售本软件的副本，并允许具备软件的人员这样做，但须满足以下条件：

上述版权声明和此许可声明应包含在本软件的所有副本或大部分内容中。

本软件按“原样”提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性，特定目的的适用性和非侵权性的保证。无论是由于软件，使用或其他方式产生的，与之有关或与之有关的合同，侵权或其他形式的任何索赔，损害或其他责任，作者或版权所有者概不负责。`;

const aboutElectron = `本程序使用了Electron v8.2.5

Electron利用Chromium渲染引擎和NodeJS运行时实现基于JavaScript，HTML和CSS等网页前端技术的跨平台桌面应用并可为其自动生成安装包。

更多信息请见官网 https://www.electronjs.org`;

const electron = require('electron');
const _app = electron.app;
const _BrowserWindow = electron.BrowserWindow;
const _Menu = electron.Menu;

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// ========== Menu Bar ==========
const template = [
    {
        label: "查看(V)",
        submenu: [
            {
                label: "放大",
                accelerator: "CmdOrCtrl+=",
                role: "zoomin"
            },
            {
                label: "缩小",
                accelerator: "CmdOrCtrl+-",
                role: "zoomout"
            },
            {
                label: "重置缩放级别",
                accelerator: "CmdOrCtrl+0",
                role: "resetzoom"
            }
        ]
    },
    {
        label: "帮助(H)",
        submenu: [
            {
                label: "联机帮助文档...",
                click() {
                    electron.shell.openExternal("https://github.com/fengshuo2004/SB3toHTML/wiki");
                }
            }
        ]
    },
    {
        label: "关于(A)",
        submenu: [
            {
                label: "原作者SheepTester...",
                click(){
                    electron.shell.openExternal("https://sheeptester.github.io/");
                }
            },
            {
                label: "Scratch虚拟机...",
                click(){
                    electron.shell.openExternal("https://github.com/LLK/scratch-vm/");
                }
            },
            {
                label: "Electron框架...",
                click() {
                    electron.dialog.showMessageBox(mainWindow, { type: "info", message: aboutElectron, icon: "assets/electron.ico" });
                }
            },
            {
                label: "MIT开源软件许可证...",
                click() {
                    electron.dialog.showMessageBox(mainWindow, { type: "info", message: license, icon: "assets/icon.ico"});
                }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    template.unshift({
        label: app.getName(),
        submenu: [
            {
                label: '退出',
                accelerator: 'CmdOrCtrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    });
}


// 当所有窗口被关闭了，退出。
_app.on('window-all-closed', function () {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform != 'darwin') {
        _app.quit();
    }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
_app.on('ready', function () {
    const appMenu = _Menu.buildFromTemplate(template);
    _Menu.setApplicationMenu(appMenu);
    // 创建浏览器窗口。
    mainWindow = new _BrowserWindow({ width: 750, height: 890 , icon:"assets/icon.ico"});

    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.openDevTools();
    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function () {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
    });

    // Links open in your default browser
    mainWindow.webContents.on('new-window', function (e, url) {
        e.preventDefault();
        electron.shell.openExternal(url);
    });
});