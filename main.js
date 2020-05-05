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
        label: "视图",
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
        label: "关于",
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
                label: "DownloadJS...",
                click() {
                    electron.shell.openExternal("http://danml.com/download.html");
                }
            },
            {
                label: "Electron...",
                click() {
                    electron.shell.openExternal("https://www.electronjs.org/");
                }
            },
            {
                label: "MIT开源软件许可证...",
                click() {
                    electron.shell.openItem('LICENSE');
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
    mainWindow = new _BrowserWindow({ width: 750, height: 890 , icon:"resources/icon.png"});

    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/index.html');

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