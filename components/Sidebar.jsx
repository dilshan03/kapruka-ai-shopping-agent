import InsightsPanel from "./InsightsPanel";
import CartSummary from "./CartSummary";
import CheckoutButton from "./CheckoutButton";

export default function Sidebar({ cart, context }) {
  return (
    <aside className="w-[320px] bg-white border-l border-red-50 px-6 py-6 hidden lg:flex flex-col">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-red-50 text-[#C91508] flex items-center justify-center text-3xl">
          🎧
        </div>

        <h2 className="mt-4 font-bold text-gray-900">Concierge Intelligence</h2>

        <span className="inline-block mt-2 text-[10px] bg-green-50 text-green-700 px-3 py-1 rounded-full">
          ● LIVE ANALYSIS
        </span>
      </div>

      <InsightsPanel context={context} />

      <CartSummary cart={cart} />

      <div className="mt-auto">
        <CheckoutButton cart={cart} />
      </div>
    </aside>
  );
}