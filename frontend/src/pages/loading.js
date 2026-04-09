import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import MobileContainer from '@/components/layout/MobileContainer';
import { api } from '@/lib/api';
import { clearProgress, loadProgress } from '@/lib/quizStorage';

const MESSAGES = [
  '당신의 코드를 분석 중...',
  '버그를 찾는 중...',
  '커밋 히스토리를 확인 중...',
  '스택 오버플로우를 검색 중...',
  '깃블레임을 실행 중...',
  'PR 리뷰를 기다리는 중...',
  '도커 컨테이너를 빌드 중...',
];

export default function Loading() {
  const router = useRouter();
  const [msgIndex, setMsgIndex] = useState(0);
  const [error, setError] = useState(null);
  const called = useRef(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  // 로딩 페이지에서만 reCAPTCHA 배지 표시
  useEffect(() => {
    document.body.classList.add('show-recaptcha');
    return () => document.body.classList.remove('show-recaptcha');
  }, []);

  // 메시지 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // 답변 제출
  useEffect(() => {
    if (called.current || !executeRecaptcha) return;
    called.current = true;

    const progress = loadProgress();
    if (!progress?.answers || Object.keys(progress.answers).length < 28) {
      router.replace('/quiz');
      return;
    }

    const answers = Object.entries(progress.answers).map(([questionId, score]) => ({
      questionId: Number(questionId),
      score,
    }));

    const submit = async () => {
      try {
        const recaptchaToken = await executeRecaptcha('submit_answers');
        const { shareToken } = await api.submitAnswers(answers, recaptchaToken);
        clearProgress();
        sessionStorage.setItem('myResultToken', shareToken);
        router.replace(`/result/${shareToken}`);
      } catch (err) {
        setError(err.message || '결과 제출에 실패했습니다.');
      }
    };

    submit();
  }, [router, executeRecaptcha]);

  const handleRetry = () => {
    called.current = false;
    setError(null);
    setMsgIndex(0);
  };

  return (
    <>
      <Head><title>결과 분석 중...</title></Head>
      <MobileContainer>
        <div className="flex-1 flex flex-col items-center justify-center px-5 gap-10">

          {/* 로딩 스피너 */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-[#E5E8EB]" />
            <div className="absolute inset-0 rounded-full border-4 border-[#3182F6] border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
          </div>

          {/* 메시지 */}
          <div className="text-center h-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={msgIndex}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[16px] font-medium text-[#6B7684] absolute inset-0 flex items-center justify-center whitespace-nowrap"
              >
                {MESSAGES[msgIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Google 정책 문구 (배지 숨길 때 필수 표시) */}
          {!error && (
            <p className="text-[11px] text-[#B0B8C1] text-center">
              Protected by reCAPTCHA
            </p>
          )}

          {/* 에러 */}
          {error && (
            <div className="w-full bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
              <p className="text-[14px] text-red-600 mb-3">{error}</p>
              <button
                onClick={handleRetry}
                className="px-6 py-2 bg-[#3182F6] text-white rounded-xl text-[14px] font-semibold"
              >
                다시 시도
              </button>
            </div>
          )}
        </div>
      </MobileContainer>
    </>
  );
}
