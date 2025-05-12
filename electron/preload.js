const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld('version', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})
// DOM이 로드되면 실행
// window.addEventListener("DOMContentLoaded", () => {
//   // 간단한 API를 노출하여 렌더러 프로세스에서 사용할 수 있게 함
//   contextBridge.exposeInMainWorld("electronAPI", {
//     sayHello: () => "Hello World from Electron!",
//   });

//   console.log("프리로드 스크립트가 로드되었습니다!");
// });
