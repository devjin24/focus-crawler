const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow

function createWindow() {
  // 브라우저 윈도우 생성
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // 보안상의 이유로 false로 설정
      contextIsolation: true, // 컨텍스트 격리 활성화
      preload: path.join(__dirname, "preload.js"), // 프리로드 스크립트 설정
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    // 프로덕션 모드에서는 빌드된 파일을 로드
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  // 윈도우가 닫힐 때 발생하는 이벤트
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// Electron이 준비되면 윈도우 생성
app.whenReady().then(() => {
  createWindow();

  app.on("active", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 모든 윈도우가 닫히면 앱 종료 (Windows & Linux)
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
