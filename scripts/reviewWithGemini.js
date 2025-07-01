import { GoogleGenerativeAI } from "@google/generative-ai";
import { execSync } from "node:child_process";
import fetch from "node-fetch";

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

(async () => {
  // 1. 현재 PR 번호 구하기
  const prNumber = process.env.GITHUB_REF?.split("/")[2];
  if (!prNumber) {
    console.log("PR Number not detected");
    process.exit(1);
  }

  // 2. git diff 구하기
  const diff = execSync(
    "git fetch origin master && git diff origin/master...HEAD",
    { encoding: "utf8" }
  );

  if (!diff.trim()) {
    console.log("No changes detected.");
    return;
  }

  // 3. Gemini로 리뷰 생성
  const model = gemini.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(
    `아래는 Pull Request의 git diff입니다.\n\n${diff}\n\n이 변경사항에 대한 코드리뷰를 한국어로 친절히 작성해주세요.`
  );
  const reviewText = result.response.text();

  console.log("🤖 Gemini Review:\n", reviewText);

  // 4. PR에 코멘트 작성
  await createReviewComment(
    prNumber,
    `🤖 **Gemini AI Review**\n\n${reviewText}`
  );
})();
