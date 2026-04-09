import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#3182F6" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <meta name="description" content="28개의 질문으로 알아보는 나의 개발자 성향 - Developer MBTI" />
        <meta property="og:site_name" content="Developer MBTI" />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js"
          integrity="sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p"
          crossOrigin="anonymous"
          async
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
