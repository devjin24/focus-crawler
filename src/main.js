const { app, BrowserWindow } = require("electron");
const path = require("path");

// 전역 변수로 윈도우 객체 관리
// 이렇게 하지 않으면 자동으로 메모리가 정리되어 윈도우가 닫힐 수 있음
let mainWindow;

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

  // index.html 파일 로드
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // 개발자 도구 열기 (개발 중에 유용)
  // mainWindow.webContents.openDevTools();

  // 윈도우가 닫힐 때 발생하는 이벤트
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// Electron이 준비되면 윈도우 생성
app.whenReady().then(createWindow);

// 모든 윈도우가 닫히면 앱 종료 (Windows & Linux)
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// macOS에서는 dock 아이콘 클릭 시에 열린 윈도우가 없으면 새로 생성
app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

console.log("메인 프로세스가 시작되었습니다!");
