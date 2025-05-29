import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";
import { isDev } from "./util.js";

export function createMenu(mainWindow: BrowserWindow) {
  const template: MenuItemConstructorOptions[] = [
      {
        label: app.name,
        submenu: [
          {
            label: "Quit",
            click: app.quit,
          },
          {
            label: "DevTools",
            click: () => mainWindow.webContents.openDevTools(),
            visible: isDev()
          }
        ],
      },
    ]
    
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}
