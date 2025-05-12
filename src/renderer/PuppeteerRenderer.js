import puppeteer from "puppeteer";

function PuppeteerRenderer() {
  async function crawlWebsite(url) {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      // 새 페이지 열기
      const page = await browser.newPage();

      // 페이지 로드 타임아웃 설정
      await page.setDefaultNavigationTimeout(30000);

      // 요청한 URL로 이동
      console.log(`크롤링 시작: ${url}`);
      await page.goto(url, { waitUntil: "networkidle2" });

      // 페이지 제목 가져오기
      const title = await page.title();

      const priceInfo = await page.evaluate(() => {
        const cleanText = (text) => {
          if (!text) return null;
          // 모든 공백 문자(스페이스, 탭, 줄바꿈)를 제거
          return text.replace(/[\s,]+/g, "")?.match(/[0-9]+/)?.[0] || null;
        };
        const price1 = document.querySelector(
          "div.price span.price-1"
        )?.textContent;
        const price2 = document.querySelector(
          "div.price span.price-2"
        )?.textContent;
        return {
          price1: cleanText(price1),
          price2: cleanText(price2),
        };
      });

      // // 링크 추출
      // const links = await page.evaluate(() => {
      //   return Array.from(document.querySelectorAll("a")).map((a) => ({
      //     text: a.textContent.trim(),
      //     href: a.href,
      //   }));
      // });

      // // 텍스트 내용 추출
      // const textContent = await page.evaluate(() => {
      //   return document.body.innerText;
      // });

      // const result = {
      //   title,
      //   links,
      //   textContent,
      // };

      // console.log("크롤링 결과:", result);
      const result = {
        title,
        priceInfo,
      };
      return result;
    } catch (error) {
      console.error("크롤링 중 오류 발생:", error);
      throw error;
    } finally {
      // 브라우저 종료
      await browser.close();
      console.log("브라우저 종료됨");
    }
  }
  return {
    crawlWebsite,
  };
}

export default PuppeteerRenderer;
