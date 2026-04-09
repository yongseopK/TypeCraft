/**
 * 모바일 퍼스트 컨테이너
 * - h-[100svh]: 모바일 브라우저 주소창/네비게이션바를 포함한 최소 뷰포트 기준
 *   (100vh는 브라우저 UI 영역을 무시해서 스크롤 발생, svh로 해결)
 * - 스크롤이 필요한 페이지는 내부 콘텐츠 div에 overflow-y-auto 직접 지정
 */
export default function MobileContainer({ children, className = '' }) {
  return (
    <div className="h-[100svh] bg-[#F9FAFB] flex justify-center overflow-hidden">
      <div className={`w-full max-w-[430px] h-full bg-white relative flex flex-col overflow-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
}
