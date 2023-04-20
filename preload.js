const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  mouseEnter: () => ipcRenderer.invoke("mouse-enter"),
  mouseLeave: () => ipcRenderer.invoke("mouse-leave"),
  page: () => ipcRenderer.invoke("page"),
  setSize: (w, h) => ipcRenderer.send("set-size", w, h),
});
