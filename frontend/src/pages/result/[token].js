import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import MobileContainer from '@/components/layout/MobileContainer';
import { serverPost } from '@/lib/api';

/** 축별 점수 → 퍼센트 계산 */
function calcPercent(a, b) {
  const absA = Math.abs(a);
  const absB = Math.abs(b);
  if (absA + absB === 0) return { a: 50, b: 50 };
  return {
    a: Math.round((absA / (absA + absB)) * 100),
    b: Math.round((absB / (absA + absB)) * 100),
  };
}

const AXIS_LABELS = [
  { left: 'E', right: 'I', leftLabel: '외향', rightLabel: '내향', scoreKey: ['E', 'I'] },
  { left: 'S', right: 'N', leftLabel: '감각', rightLabel: '직관', scoreKey: ['S', 'N'] },
  { left: 'T', right: 'F', leftLabel: '사고', rightLabel: '감정', scoreKey: ['T', 'F'] },
  { left: 'J', right: 'P', leftLabel: '판단', rightLabel: '인식', scoreKey: ['J', 'P'] },
];

function ScoreGauge({ axis, scores }) {
  const { a, b } = calcPercent(scores[axis.scoreKey[0]], scores[axis.scoreKey[1]]);
  const leftWins = a >= b;

  return (
    <div className="py-3">
      <div className="flex justify-between items-center mb-2">
        <div className="text-center">
          <span className={`text-[18px] font-bold ${leftWins ? 'text-[#3182F6]' : 'text-[#B0B8C1]'}`}>
            {axis.left}
          </span>
          <p className="text-[11px] text-[#8B95A1]">{axis.leftLabel}</p>
        </div>
        <div className="text-center">
          <span className={`text-[18px] font-bold ${!leftWins ? 'text-[#3182F6]' : 'text-[#B0B8C1]'}`}>
            {axis.right}
          </span>
          <p className="text-[11px] text-[#8B95A1]">{axis.rightLabel}</p>
        </div>
      </div>
      <div className="relative h-3 bg-[#F2F4F6] rounded-full overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 h-full bg-[#3182F6] rounded-full"
          initial={{ width: '50%' }}
          animate={{ width: `${a}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[12px] font-medium text-[#3182F6]">{a}%</span>
        <span className="text-[12px] font-medium text-[#8B95A1]">{b}%</span>
      </div>
    </div>
  );
}

function InfoCard({ emoji, title, items }) {
  return (
    <div className="bg-[#F9FAFB] rounded-2xl p-4">
      <p className="text-[13px] font-semibold text-[#8B95A1] mb-3">{emoji} {title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="px-3 py-1.5 bg-white border border-[#E5E8EB] rounded-full text-[13px] text-[#4E5968] font-medium">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ResultPage({ result, error }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  if (error) {
    return (
      <MobileContainer>
        <div className="flex-1 flex flex-col items-center justify-center px-5 text-center gap-4">
          <span className="text-5xl">🔍</span>
          <h2 className="text-[20px] font-bold text-[#191F28]">결과를 찾을 수 없어요</h2>
          <p className="text-[14px] text-[#8B95A1]">링크가 잘못되었거나 만료되었습니다.</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-3 bg-[#3182F6] text-white rounded-2xl font-semibold text-[15px]"
          >
            검사 시작하기
          </button>
        </div>
      </MobileContainer>
    );
  }

  const { mbtiType, scores, typeInfo, statistics } = result;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleTwitter = () => {
    const text = `나는 ${mbtiType} ${typeInfo.title}입니다! Developer MBTI로 개발자 유형을 알아보세요`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <>
      <Head>
        <title>나는 {mbtiType} {typeInfo.title}입니다 | Developer MBTI</title>
        <meta property="og:title" content={`나는 ${mbtiType} ${typeInfo.title}입니다`} />
        <meta property="og:description" content="Developer MBTI로 내 개발자 유형을 알아보세요" />
        <meta property="og:type" content="website" />
      </Head>

      <MobileContainer>
        <div className="flex-1 px-5 pt-8 pb-28 overflow-y-auto">

          {/* MBTI 타입 헤더 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <div className="inline-block px-4 py-2 bg-[#EFF6FF] rounded-full mb-4">
              <span className="text-[36px] font-black text-[#3182F6] tracking-wider">{mbtiType}</span>
            </div>
            <h1 className="text-[24px] font-bold text-[#191F28] mb-2">{typeInfo.title}</h1>
            <p className="text-[14px] text-[#8B95A1] leading-relaxed">{typeInfo.description}</p>
          </motion.div>

          {/* 점수 게이지 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#E5E8EB] rounded-2xl p-4 mb-4"
          >
            <p className="text-[13px] font-semibold text-[#8B95A1] mb-2">📊 성향 분석</p>
            {AXIS_LABELS.map((axis) => (
              <ScoreGauge key={axis.left} axis={axis} scores={scores} />
            ))}
          </motion.div>

          {/* 특징 */}
          {typeInfo.characteristics?.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#F9FAFB] rounded-2xl p-4 mb-4"
            >
              <p className="text-[13px] font-semibold text-[#8B95A1] mb-3">✨ 이런 특징이 있어요</p>
              <ul className="flex flex-col gap-2">
                {typeInfo.characteristics.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] text-[#4E5968]">
                    <span className="text-[#3182F6] mt-0.5 flex-shrink-0">•</span>
                    {c}
                  </li>
                ))}
              </ul>
              {typeInfo.codingStyle && (
                <div className="mt-3 pt-3 border-t border-[#E5E8EB]">
                  <p className="text-[12px] text-[#8B95A1] mb-1">코딩 스타일</p>
                  <p className="text-[13px] text-[#6B7684]">{typeInfo.codingStyle}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* 추천 직무 / 기술 스택 / 잘 맞는 동료 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-3 mb-4"
          >
            {typeInfo.suitableRoles?.length > 0 && (
              <InfoCard emoji="💼" title="이런 역할이 잘 맞아요" items={typeInfo.suitableRoles} />
            )}
            {typeInfo.techStack?.length > 0 && (
              <InfoCard emoji="🛠" title="이런 기술을 선호해요" items={typeInfo.techStack} />
            )}
            {typeInfo.compatibility?.length > 0 && (
              <InfoCard emoji="🤝" title="이런 동료와 잘 맞아요" items={typeInfo.compatibility} />
            )}
          </motion.div>

          {/* 통계 */}
          {statistics && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center py-4 px-4 bg-[#EFF6FF] rounded-2xl mb-6"
            >
              <p className="text-[15px] font-bold text-[#3182F6]">
                당신과 같은 유형은 전체의
                <span className="text-[20px] mx-1">{statistics.percentage}%</span>
                입니다
              </p>
              {statistics.rank && (
                <p className="text-[12px] text-[#8B95A1] mt-1">전체 {statistics.rank}위</p>
              )}
            </motion.div>
          )}

          {/* 공유 버튼 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[13px] font-semibold text-[#8B95A1] mb-3 text-center">친구에게 공유하기</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={handleTwitter}
                className="flex flex-col items-center gap-1.5 py-3 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl active:scale-[0.97] transition-all"
              >
                <span className="text-xl">𝕏</span>
                <span className="text-[12px] text-[#6B7684]">트위터</span>
              </button>
              <button
                onClick={handleFacebook}
                className="flex flex-col items-center gap-1.5 py-3 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl active:scale-[0.97] transition-all"
              >
                <span className="text-xl">📘</span>
                <span className="text-[12px] text-[#6B7684]">페이스북</span>
              </button>
              <button
                onClick={handleCopy}
                className="flex flex-col items-center gap-1.5 py-3 bg-[#F9FAFB] border border-[#E5E8EB] rounded-2xl active:scale-[0.97] transition-all"
              >
                <span className="text-xl">{copied ? '✅' : '🔗'}</span>
                <span className="text-[12px] text-[#6B7684]">{copied ? '복사됨!' : 'URL 복사'}</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* 하단 액션 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center z-40">
          <div className="w-full max-w-[430px] bg-white border-t border-[#E5E8EB] px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex gap-3">
            <button
              onClick={() => router.push('/statistics')}
              className="flex-1 h-14 rounded-2xl bg-[#F2F4F6] text-[#6B7684] font-semibold text-[14px] active:scale-[0.98] transition-all"
            >
              전체 통계 보기
            </button>
            <button
              onClick={() => router.push('/')}
              className="flex-1 h-14 rounded-2xl bg-[#3182F6] text-white font-semibold text-[14px] active:scale-[0.98] transition-all"
            >
              다시 검사하기
            </button>
          </div>
        </div>
      </MobileContainer>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { token } = params;
  try {
    const result = await serverPost('/results/get', { shareToken: token });
    return { props: { result, error: null } };
  } catch (e) {
    if (e.status === 404) {
      return { props: { result: null, error: 'not_found' } };
    }
    return { props: { result: null, error: 'server_error' } };
  }
}
