const { app, Menu, BrowserWindow } = require("electron")

const path = require("path")
const isDev = require("electron-is-dev")
const url = require("url")

const isMac = process.platform === "darwin"

let appWindow

function windowApp() {
    
    appWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        simpleFullscreen: true,
        center: true,
        show: true,
        tabbingIdentifier: "Todaap",
        icon: isMac ? "icon.icns" : "icon.png",
        webPreferences: {
            nodeIntegration: true
        }
    })

    if( isDev )
        appWindow.loadURL( 
            isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}` 
        )

    if( isDev ) appWindow.webContents.openDevTools()

    appWindow.on( "closed", () => appWindow = null )

}

app.on( "ready", windowApp )

app.on( "window-all-closed", () => {

    if( process.platform !== "darwin" ) app.quit()

})

app.on( "activate", () => {

    if( windowApp === null ) windowApp()

})
