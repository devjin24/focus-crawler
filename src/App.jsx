import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("https://example.com");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [screenshotSrc, setScreenshotSrc] = useState("");

  const handleRenderUrl = async () => {
    setLoading(true);
    setError("");
    setHtml("");
    setScreenshotSrc("");

    try {
      const result = await window.webRenderer.renderUrl(url);

      if (result.success) {
        setHtml(result.html);
      } else {
        setError(result.error || "알 수 없는 오류가 발생했습니다.");
      }
    } catch (err) {
      setError(err.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCaptureScreenshot = async () => {
    setLoading(true);
    setError("");
    setScreenshotSrc("");

    try {
      const result = await window.webRenderer.captureScreenshot(url);

      if (result.success) {
        // 스크린샷 데이터를 base64로 변환하여 이미지 소스로 사용
        const base64Image = `data:image/png;base64,${Buffer.from(
          result.screenshot
        ).toString("base64")}`;
        setScreenshotSrc(base64Image);
      } else {
        setError(result.error || "알 수 없는 오류가 발생했습니다.");
      }
    } catch (err) {
      setError(err.message || "알 수 없는 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          웹 페이지 렌더러
        </Typography>

        <Box sx={{ display: "flex", mb: 2 }}>
          <TextField
            fullWidth
            label="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            variant="outlined"
            sx={{ mr: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleRenderUrl}
            disabled={loading}
          >
            HTML 가져오기
          </Button>
          <Button
            variant="outlined"
            onClick={handleCaptureScreenshot}
            disabled={loading}
            sx={{ ml: 1 }}
          >
            스크린샷
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Paper sx={{ p: 2, mb: 2, bgcolor: "#ffebee" }}>
            <Typography color="error">{error}</Typography>
          </Paper>
        )}

        {screenshotSrc && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              스크린샷:
            </Typography>
            <img
              src={screenshotSrc}
              alt="웹 페이지 스크린샷"
              style={{ maxWidth: "100%", border: "1px solid #ddd" }}
            />
          </Box>
        )}

        {html && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              HTML 결과:
            </Typography>
            <Paper
              sx={{
                p: 2,
                maxHeight: "500px",
                overflow: "auto",
                fontFamily: "monospace",
                fontSize: "0.875rem",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {html}
            </Paper>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                미리보기:
              </Typography>
              <Paper sx={{ p: 0, border: "1px solid #ddd" }}>
                <iframe
                  srcDoc={html}
                  title="HTML 미리보기"
                  style={{ width: "100%", height: "500px", border: "none" }}
                />
              </Paper>
            </Box>
          </Box>
        )}
      </Box>
    </>
    // <div className="app">
    //   <header className="app-header">
    //     <h1>Electron + React + Vite</h1>
    //     <p>빠르고 효율적인 데스크톱 애플리케이션</p>
    //   </header>

    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       카운트: {count}
    //     </button>
    //     <p>
    //       <code>src/App.jsx</code>를 수정하여 시작하세요
    //     </p>
    //   </div>

    //   <div className="card">
    //     <button onClick={sendMessageToMain}>
    //       메인 프로세스에 메시지 보내기
    //     </button>
    //     {message && <p>응답 메시지: {message}</p>}
    //   </div>
    // </div>
  );
}

export default App;
