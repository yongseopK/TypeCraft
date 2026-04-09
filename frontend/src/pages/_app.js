import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function App({ Component, pageProps }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      language="ko"
      scriptProps={{ async: true, defer: true }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <Component {...pageProps} />
      {process.env.NEXT_PUBLIC_KAKAO_JS_KEY && (
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js"
          integrity="sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p"
          crossOrigin="anonymous"
          strategy="afterInteractive"
          onLoad={() => {
            if (!window.Kakao.isInitialized()) {
              window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
            }
          }}
        />
      )}
    </GoogleReCaptchaProvider>
  );
}
