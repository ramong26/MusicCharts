import { GoogleGenerativeAI } from "@google/generative-ai";
import { execSync } from "node:child_process";
import fetch from "node-fetch";

// Gemini 초기화
const gemini = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// GitHub PR에 코멘트 남기기
async function createReviewComment(prNumber, body) {
  await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/issues/${prNumber}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      body: JSON.stringify({ body }),
    }
  );
}

// Gemini API 요청 + 재시도
async function generateWithRetry(model, prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      if (attempt < retries && err.status === 503) {
        console.log(
          `🚀 Gemini overloaded, retrying... (${attempt}/${retries})`
        );
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } else {
        console.error("❌ Gemini error:", err);
        throw err;
      }
    }
  }
}

(async () => {
  try {
    // 현재 PR 번호 구하기
    const prNumber = process.env.GITHUB_REF?.split("/")[2];
    if (!prNumber) {
      console.log("❌ PR Number not detected");
      process.exit(1);
    }

    // git diff 구하기
    const diff = execSync(
      "git fetch origin master && git diff origin/master HEAD",
      { encoding: "utf8" }
    );

    if (!diff.trim()) {
      console.log("✅ No changes detected.");
      return;
    }

    // Gemini 모델 설정
    const model = gemini.getGenerativeModel({ model: "gemini-2.5-pro" });

    // Gemini로 코드리뷰 생성 (재시도)
    const reviewText = await generateWithRetry(
      model,
      `아래는 Pull Request의 git diff입니다.\n\n${diff}\n\n이 변경사항에 대한 코드리뷰를 한국어로 친절히 작성해주세요.`
    );

    console.log("🤖 Gemini Review:\n", reviewText);

    // PR에 코멘트 작성
    await createReviewComment(
      prNumber,
      `🤖 **Gemini AI Review**\n\n${reviewText}`
    );
  } catch (err) {
    console.error("🚨 Script failed:", err);
    process.exit(1);
  }
})();
