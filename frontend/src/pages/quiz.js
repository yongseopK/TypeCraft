import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MobileContainer from '@/components/layout/MobileContainer';
import ProgressBar from '@/components/ui/ProgressBar';
import { api } from '@/lib/api';
import { clearProgress, hasProgress, loadProgress, saveProgress } from '@/lib/quizStorage';

const CHOICES = [
  { label: '매우 그렇다', score: 2 },
  { label: '그렇다', score: 1 },
  { label: '보통', score: 0 },
  { label: '아니다', score: -1 },
  { label: '전혀 아니다', score: -2 },
];

// opacity + 미세 Y 이동만 사용 — x 이동은 레이아웃 재계산 유발로 모바일 버벅임
const fadeVariants = {
  enter: { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function Quiz() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [resumeModal, setResumeModal] = useState(false);
  const pendingProgress = useRef(null);
  const isTransitioning = useRef(false);

  // 질문 로드
  useEffect(() => {
    api.getQuestions()
      .then(({ questions: qs }) => {
        setQuestions(qs);

        // localStorage 확인
        if (hasProgress()) {
          const progress = loadProgress();
          pendingProgress.current = progress;
          setResumeModal(true);
        }
        setLoading(false);
      })
      .catch(() => {
        alert('질문을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
        router.push('/');
      });
  }, [router]);

  // 키보드 단축키
  useEffect(() => {
    const handleKey = (e) => {
      const q = questions[currentIndex];
      if (!q) return;
      const numKey = parseInt(e.key);
      if (numKey >= 1 && numKey <= 5) {
        selectAnswer(CHOICES[numKey - 1].score);
      }
      if (e.key === 'ArrowRight' && answers[q.id] !== undefined) goNext();
      if (e.key === 'ArrowLeft' && currentIndex > 0) goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, questions, answers]); // eslint-disable-line

  const selectAnswer = useCallback((score) => {
    if (isTransitioning.current) return;
    const q = questions[currentIndex];
    if (!q) return;

    const newAnswers = { ...answers, [q.id]: score };
    setAnswers(newAnswers);
    saveProgress(newAnswers, currentIndex);

    // 마지막 문항이면 제출 대기 (버튼 클릭), 아니면 선택 피드백 후 즉시 이동
    if (currentIndex < questions.length - 1) {
      isTransitioning.current = true;
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        isTransitioning.current = false;
      }, 80);
    }
  }, [questions, currentIndex, answers]);

  const goNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, questions.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const handleSubmit = async () => {
    const formatted = Object.entries(answers).map(([questionId, score]) => ({
      questionId: Number(questionId),
      score,
    }));
    saveProgress(answers, currentIndex);
    router.push({ pathname: '/loading', query: {} });
  };

  const handleResume = () => {
    const p = pendingProgress.current;
    if (p) {
      setAnswers(p.answers || {});
      // 마지막으로 답한 질문의 다음으로 이동
      const savedIndex = p.currentIndex ?? 0;
      setCurrentIndex(savedIndex);
    }
    setResumeModal(false);
  };

  const handleRestart = () => {
    clearProgress();
    setAnswers({});
    setCurrentIndex(0);
    setResumeModal(false);
  };

  if (loading) {
    return (
      <MobileContainer>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#3182F6] border-t-transparent rounded-full animate-spin" />
        </div>
      </MobileContainer>
    );
  }

  const q = questions[currentIndex];
  const selectedScore = q ? answers[q.id] : undefined;
  const isLast = currentIndex === questions.length - 1;
  const canSubmit = isLast && selectedScore !== undefined;

  return (
    <>
      <Head>
        <title>Developer MBTI - 검사 중</title>
      </Head>
      <MobileContainer>
        {/* 이어하기 모달 */}
        {resumeModal && (
          <div className="absolute inset-0 z-50 flex items-end justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setResumeModal(false)} />
            <div className="relative w-full bg-white rounded-t-3xl px-5 pt-6 pb-10 z-10">
              <h3 className="text-[18px] font-bold text-[#191F28] mb-2">이전 검사가 있어요</h3>
              <p className="text-[14px] text-[#8B95A1] mb-6">
                {Object.keys(pendingProgress.current?.answers || {}).length}개 질문에 답했어요.
                이어서 할까요?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 h-14 rounded-2xl bg-[#F2F4F6] text-[#6B7684] font-semibold text-[15px]"
                >
                  처음부터
                </button>
                <button
                  onClick={handleResume}
                  className="flex-1 h-14 rounded-2xl bg-[#3182F6] text-white font-semibold text-[15px]"
                >
                  이어서 하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 진행 바 */}
        <ProgressBar current={currentIndex + 1} total={questions.length} />

        {/* 질문 영역 */}
        <div className="flex-1 flex flex-col px-5 pt-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={fadeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* 카테고리 */}
              <span className="text-[12px] font-medium text-[#8B95A1] mb-3 block">
                {q?.category}
              </span>

              {/* 질문 텍스트 */}
              <p className="text-[20px] font-bold text-[#191F28] leading-[1.5] mb-10">
                {q?.text}
              </p>

              {/* 선택지 */}
              <div className="flex flex-col gap-3">
                {CHOICES.map((c, idx) => {
                  const isSelected = selectedScore === c.score;
                  return (
                    <button
                      key={c.score}
                      onClick={() => selectAnswer(c.score)}
                      className={`
                        w-full px-4 py-4 rounded-2xl text-left transition-[background-color,border-color,color,transform] active:scale-[0.98]
                        flex items-center gap-3 border
                        ${isSelected
                          ? 'bg-[#3182F6] border-[#3182F6] text-white'
                          : 'bg-white border-[#E5E8EB] text-[#191F28]'
                        }
                      `}
                    >
                      <span className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0
                        ${isSelected ? 'bg-white/20 text-white' : 'bg-[#F2F4F6] text-[#8B95A1]'}
                      `}>
                        {idx + 1}
                      </span>
                      <span className="text-[15px] font-medium">{c.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 네비게이션 버튼 — fixed 대신 flex child로: 일부 Android에서 fixed가 스크롤 중 깜빡임 유발 */}
        <div className="bg-white border-t border-[#E5E8EB] px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full h-14 rounded-2xl bg-[#3182F6] text-white font-semibold text-[17px] disabled:opacity-40 active:scale-[0.98] transition-transform"
            >
              결과 보기
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className="flex-1 h-14 rounded-2xl bg-[#F2F4F6] text-[#6B7684] font-semibold text-[15px] disabled:opacity-30 active:scale-[0.98] transition-transform"
              >
                ← 이전
              </button>
              <button
                onClick={goNext}
                disabled={selectedScore === undefined}
                className="flex-1 h-14 rounded-2xl bg-[#3182F6] text-white font-semibold text-[15px] disabled:opacity-40 active:scale-[0.98] transition-transform"
              >
                다음 →
              </button>
            </div>
          )}
        </div>
      </MobileContainer>
    </>
  );
}
