// 렌더러 프로세스 스크립트
// 이 파일은 index.html에서 로드되어 웹 페이지에서 실행됩니다.

// DOM이 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
  // Electron 버전 표시
  const versionElement = document.getElementById("electron-version");
  if (versionElement) {
    versionElement.textContent = process.versions.electron || "unknown";
  }

  // 버튼 클릭 이벤트 설정
  const helloButton = document.getElementById("hello-button");
  const messageElement = document.getElementById("message");

  if (helloButton && messageElement) {
    helloButton.addEventListener("click", () => {
      // preload.js에서 노출된 API 사용
      const message = window.electronAPI.sayHello();
      messageElement.textContent = message;

      console.log("버튼이 클릭되었습니다!");
    });
  }

  console.log("렌더러 프로세스가 로드되었습니다!");
});
