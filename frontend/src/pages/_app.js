import "@/styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

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
    </GoogleReCaptchaProvider>
  );
}
