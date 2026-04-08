/**
 * 모바일 퍼스트 컨테이너
 * - 기본: h-screen overflow-hidden (불필요한 페이지 스크롤 방지)
 * - 스크롤이 필요한 페이지는 내부 콘텐츠 div에 overflow-y-auto 직접 지정
 */
export default function MobileContainer({ children, className = '' }) {
  return (
    <div className="h-screen bg-[#F9FAFB] flex justify-center overflow-hidden">
      <div className={`w-full max-w-[430px] h-full bg-white relative flex flex-col overflow-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
}
