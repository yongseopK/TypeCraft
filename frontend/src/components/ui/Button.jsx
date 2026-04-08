/** Toss 스타일 버튼 */
export default function Button({ children, onClick, disabled, variant = 'primary', className = '' }) {
  const base = 'w-full h-14 rounded-2xl font-semibold text-[17px] transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#3182F6] text-white',
    secondary: 'bg-[#F2F4F6] text-[#191F28]',
    ghost: 'bg-transparent text-[#3182F6]',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

/** 하단 고정 버튼 래퍼 */
export function BottomButtonArea({ children }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-white border-t border-[#E5E8EB] z-50">
      <div className="w-full max-w-[430px] px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  );
}
