import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import MobileContainer from '@/components/layout/MobileContainer';
import { api } from '@/lib/api';

const AXIS_INFO = [
  { key: 'E_vs_I', labels: ['E 외향', 'I 내향'] },
  { key: 'S_vs_N', labels: ['S 감각', 'N 직관'] },
  { key: 'T_vs_F', labels: ['T 사고', 'F 감정'] },
  { key: 'J_vs_P', labels: ['J 판단', 'P 인식'] },
];

function AxisBar({ label, pct }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] font-medium text-[#6B7684] w-12 flex-shrink-0">{label}</span>
      <div className="flex-1 h-2.5 bg-[#F2F4F6] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3182F6] rounded-full transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[13px] font-bold text-[#3182F6] w-10 text-right">{pct}%</span>
    </div>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E5E8EB] rounded-xl px-3 py-2 shadow-sm">
      <p className="text-[13px] font-bold text-[#191F28]">{payload[0].payload.mbtiType}</p>
      <p className="text-[12px] text-[#8B95A1]">{payload[0].value.toLocaleString()}명</p>
    </div>
  );
};

export default function Statistics() {
  const router = useRouter();
  const { data: stats, isLoading } = useSWR('statistics', () => api.getStatistics(), {
    revalidateOnFocus: false,
  });

  return (
    <>
      <Head>
        <title>전체 통계 | Developer MBTI</title>
      </Head>
      <MobileContainer>
        {/* 헤더 */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b border-[#E5E8EB]">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#F2F4F6] text-[#6B7684] text-[18px]"
          >
            ←
          </button>
          <h1 className="text-[18px] font-bold text-[#191F28]">전체 통계</h1>
        </div>

        <div className="flex-1 px-5 pt-5 pb-10 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#3182F6] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !stats || stats.totalCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
              <span className="text-5xl">📊</span>
              <p className="text-[16px] font-bold text-[#191F28]">아직 데이터가 없어요</p>
              <p className="text-[14px] text-[#8B95A1]">첫 번째 검사를 완료해보세요!</p>
              <button
                onClick={() => router.push('/')}
                className="mt-2 px-6 py-3 bg-[#3182F6] text-white rounded-2xl font-semibold text-[15px]"
              >
                검사 시작하기
              </button>
            </div>
          ) : (
            <>
              {/* 총 참여자 */}
              <div className="text-center py-6 mb-4">
                <p className="text-[14px] text-[#8B95A1] mb-1">총 참여자</p>
                <p className="text-[40px] font-black text-[#191F28]">
                  {stats.totalCount.toLocaleString()}
                  <span className="text-[20px] font-semibold text-[#8B95A1] ml-1">명</span>
                </p>
              </div>

              {/* Top 3 */}
              {stats.topThree?.length > 0 && (
                <div className="flex gap-2 mb-6">
                  {stats.topThree.map((type, i) => (
                    <div key={type} className={`flex-1 py-3 rounded-2xl text-center ${i === 0 ? 'bg-[#3182F6]' : 'bg-[#F2F4F6]'}`}>
                      <p className={`text-[10px] font-medium mb-1 ${i === 0 ? 'text-white/70' : 'text-[#8B95A1]'}`}>
                        {i + 1}위
                      </p>
                      <p className={`text-[18px] font-black ${i === 0 ? 'text-white' : 'text-[#191F28]'}`}>{type}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* 유형별 분포 막대 그래프 */}
              <div className="bg-white border border-[#E5E8EB] rounded-2xl p-4 mb-4">
                <p className="text-[13px] font-semibold text-[#8B95A1] mb-4">유형별 분포</p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={stats.distribution} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                    <XAxis
                      dataKey="mbtiType"
                      tick={{ fontSize: 9, fill: '#8B95A1' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 10, fill: '#8B95A1' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F2F4F6' }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {stats.distribution.map((entry, index) => (
                        <Cell
                          key={entry.mbtiType}
                          fill={index < 3 ? '#3182F6' : '#B0B8C1'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* 축별 평균 */}
              {stats.axisAverages && (
                <div className="bg-white border border-[#E5E8EB] rounded-2xl p-4">
                  <p className="text-[13px] font-semibold text-[#8B95A1] mb-4">개발자 평균 성향</p>
                  <div className="flex flex-col gap-4">
                    {AXIS_INFO.map(({ key, labels }) => {
                      const axisData = stats.axisAverages[key];
                      if (!axisData) return null;
                      const [la, lb] = labels;
                      const [ka, kb] = [la.split(' ')[0], lb.split(' ')[0]];
                      const pctA = axisData[ka] ?? 50;
                      const pctB = axisData[kb] ?? 50;
                      return (
                        <div key={key}>
                          <AxisBar label={la} pct={pctA} />
                          <div className="my-1.5" />
                          <AxisBar label={lb} pct={pctB} />
                          <div className="mt-3 border-b border-[#F2F4F6]" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </MobileContainer>
    </>
  );
}
