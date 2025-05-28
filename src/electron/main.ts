import { app, BrowserWindow, Tray } from "electron";
import { ipcMainHandle, isDev } from "./util.js";
import { getStaticData, pollResources } from "./resourceManager.js";
import { getAssetPath, getPreloadPath, getUIPath } from "./pathResolver.js";
import path from "path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      //runs this script before the window/ui
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }
  pollResources(mainWindow);
  ipcMainHandle("getStaticData", () => {
    return getStaticData();
  });
  new Tray(path.join(getAssetPath(), process.platform === "darwin" ? "naraTemplate@4x.png" : "nara@4x.png"));
});
