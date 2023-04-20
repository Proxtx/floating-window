const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs/promises");

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    hasShadow: false,
    opacity: 0.3,
    frame: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const page = await fs.readFile("page.txt", "utf-8");

  ipcMain.handle("mouse-enter", () => {
    win.setOpacity(1);
  });

  ipcMain.handle("page", () => {
    return page;
  });

  ipcMain.handle("mouse-leave", () => win.setOpacity(0.3));

  ipcMain.on("set-size", (event, w, h) => {
    win.setSize(w, h);
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process !== "darwin") app.quit();
});
