import { ShoppingBag, Bell, User } from "lucide-react";

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="h-[64px] bg-white/90 backdrop-blur border-b border-red-50 flex items-center justify-between px-4 md:px-8 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#C91508] text-white flex items-center justify-center shadow-lg">
          <ShoppingBag size={20} />
        </div>
        <div>
          <h1 className="font-bold text-lg text-[#171717] leading-tight">Kapruka AI</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
            Premium Concierge
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-5 text-gray-600">
        <button className="relative hover:text-gray-900 transition">
          <Bell size={20} />
        </button>

        <button onClick={onCartClick} className="relative hover:text-gray-900 transition lg:hidden">
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#C91508] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
              {cartCount}
            </span>
          )}
        </button>

        <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-sm">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}