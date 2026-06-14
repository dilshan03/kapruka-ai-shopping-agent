export default function Header({ cartCount }) {
  return (
    <header className="h-[64px] bg-white/90 backdrop-blur border-b border-red-50 flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#C91508] text-white flex items-center justify-center shadow-lg">
          🛍️
        </div>
        <div>
          <h1 className="font-bold text-lg text-[#171717]">Kapruka AI</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
            Premium Concierge
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative text-xl">🔔</div>

        <div className="relative text-xl">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-[#C91508] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>

        <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center">
          👤
        </div>
      </div>
    </header>
  );
}