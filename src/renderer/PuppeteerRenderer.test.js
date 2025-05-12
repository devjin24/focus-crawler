import PuppeteerRenderer from "./PuppeteerRenderer";

describe("PuppeteerRenderer", () => {
  // 타임아웃 설정 (크롤링은 시간이 걸릴 수 있음)
//   jest.setTimeout(30000);

  

  test("crawlWebsite가 웹사이트 정보를 올바르게 가져옵니다", async () => {
    const puppeteerRender = PuppeteerRenderer();
    // const url = "https://www.oliveyoung.co.kr/store/G.do?goodsNo=A000000204247";
    // const url = "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000185098";
    const url = "https://www.oliveyoung.co.kr/store/G.do?goodsNo=A000000212039";
    // const url = "https://www.oliveyoung.co.kr/store/G.do?goodsNo=A000000208152";

    const result = await puppeteerRender.crawlWebsite(url);    
    console.log("테스트 결과:", JSON.stringify(result, null, 2));
  });

//   // 에러 처리 테스트
//   test("유효하지 않은 URL에 대해 오류를 발생시킵니다", async () => {
//     const puppeteerRender = PuppeteerRenderer();
//     const invalidUrl = "https://this-website-does-not-exist-12345.com";

//     await expect(puppeteerRender.crawlWebsite(invalidUrl)).rejects.toThrow();
//   });
});
