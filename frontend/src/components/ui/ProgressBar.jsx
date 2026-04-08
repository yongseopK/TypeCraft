/** 퀴즈 상단 진행 바 */
export default function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="px-5 pt-4 pb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-[#8B95A1]">{current} / {total}</span>
        <span className="text-xs font-medium text-[#3182F6]">{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#F2F4F6] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#3182F6] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
