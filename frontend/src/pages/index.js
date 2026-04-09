import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import MobileContainer from '@/components/layout/MobileContainer';
import Button, { BottomButtonArea } from '@/components/ui/Button';
import { api } from '@/lib/api';

const FEATURES = [
  { icon: '💻', title: '실전 개발 시나리오', desc: '실제 업무에서 마주치는 상황 기반 질문' },
  { icon: '🎯', title: '16가지 개발자 유형', desc: 'INTJ 아키텍트, ENFP 전도사 등' },
  { icon: '🔗', title: '즉시 공유 가능', desc: '카카오톡, SNS로 친구와 비교' },
];

export default function Landing() {
  const router = useRouter();
  const { data: stats } = useSWR('statistics', () => api.getStatistics(), {
    revalidateOnFocus: false,
    dedupingInterval: 30000,
  });

  const totalCount = stats?.totalCount ?? 0;
  const topType = stats?.topThree?.[0] ?? null;

  return (
    <>
      <Head>
        <title>Developer MBTI - 나는 어떤 개발자일까?</title>
      </Head>
      <MobileContainer>
        {/* 상단 여백 */}
        <div className="flex-1 flex flex-col px-5 pt-16 pb-6 overflow-y-auto">

          {/* 헤더 뱃지 */}
          <div className="mb-8">
            <span className="inline-block px-3 py-1.5 bg-[#EFF6FF] text-[#3182F6] text-xs font-semibold rounded-full">
              Developer MBTI
            </span>
          </div>

          {/* 메인 카피 */}
          <div className="mb-10">
            <h1 className="text-[32px] font-bold leading-tight text-[#191F28] mb-3">
              나는 어떤<br />개발자일까?
            </h1>
            <p className="text-[16px] text-[#8B95A1] leading-relaxed">
              28개의 질문으로 알아보는<br />나의 개발자 성향
            </p>
          </div>

          {/* 참여 통계 */}
          {totalCount > 0 && (
            <div className="mb-10 px-4 py-3 bg-[#F2F4F6] rounded-2xl flex items-center gap-3">
              <span className="text-xl">🔥</span>
              <div>
                <p className="text-[13px] font-semibold text-[#191F28]">
                  지금까지 <span className="text-[#3182F6]">{totalCount.toLocaleString()}명</span>이 참여했어요
                </p>
                {topType && (
                  <p className="text-[12px] text-[#8B95A1] mt-0.5">
                    가장 많은 유형은 <span className="font-medium text-[#6B7684]">{topType}</span>입니다
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 특징 카드 */}
          <div className="flex flex-col gap-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-center gap-4 px-4 py-4 bg-[#F9FAFB] rounded-2xl">
                <span className="text-2xl flex-shrink-0">{f.icon}</span>
                <div>
                  <p className="text-[14px] font-semibold text-[#191F28]">{f.title}</p>
                  <p className="text-[13px] text-[#8B95A1] mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 CTA 버튼 */}
        <BottomButtonArea>
          <Button onClick={() => router.push('/quiz')}>
            무료로 검사 시작하기
          </Button>
          <p className="text-center text-[12px] text-[#B0B8C1] mt-3">
            약 5분 소요 · 개인정보 수집 없음
          </p>
        </BottomButtonArea>
      </MobileContainer>
    </>
  );
}
