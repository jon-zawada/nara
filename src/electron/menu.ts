import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from "electron";
import { ipcWebContentsSend, isDev } from "./util.js";

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
      {
        label: "View",
        submenu: [
          {
            label: "CPU",
            click: () => ipcWebContentsSend("changeView", mainWindow.webContents, 'CPU')
          },
          {
            label: "RAM",
            click: () => ipcWebContentsSend("changeView", mainWindow.webContents, 'RAM')
          },
          {
            label: "STORAGE",
            click: () => ipcWebContentsSend("changeView", mainWindow.webContents, 'STORAGE')
          },
        ]
      }
    ]
    
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}
