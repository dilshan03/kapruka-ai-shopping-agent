import InsightsPanel from "./InsightsPanel";
import CartSummary from "./CartSummary";
import CheckoutButton from "./CheckoutButton";

export default function Sidebar({ 
  cart, 
  context, 
  deliveryDetails, 
  setDeliveryDetails, 
  giftMessage, 
  setGiftMessage, 
  onCheckout, 
  onUpdateQuantity, 
  onRemoveItem 
}) {
  return (
    <aside className="w-[320px] bg-white border-l border-red-50 px-6 py-6 hidden lg:flex flex-col overflow-y-auto">
      <div className="text-center mb-8 shrink-0">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-red-50 text-[#C91508] flex items-center justify-center text-3xl shadow-sm">
          🎧
        </div>

        <h2 className="mt-4 font-bold text-gray-900">Concierge Intelligence</h2>

        <span className="inline-block mt-2 text-[10px] bg-green-50 text-green-700 px-3 py-1 rounded-full font-semibold tracking-wide">
          ● LIVE ANALYSIS
        </span>
      </div>

      <div className="space-y-6 flex-1">
        <InsightsPanel context={context} />

        <div className="pt-4 border-t border-gray-100">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3 font-semibold">
            Delivery Options
          </p>
          <div className="grid grid-cols-3 gap-2">
            {["Today", "Tomorrow", "Weekend"].map((date) => (
              <button
                key={date}
                onClick={() => setDeliveryDetails({ ...deliveryDetails, date })}
                className={`text-xs py-2 rounded-xl border transition ${
                  deliveryDetails.date === date
                    ? "bg-red-50 border-red-200 text-[#C91508] font-bold"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            City: <span className="font-semibold text-gray-900">{context.city !== "Not identified" ? context.city : "Pending"}</span>
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3 font-semibold">
            Gift Message
          </p>
          <textarea
            value={giftMessage}
            onChange={(e) => setGiftMessage(e.target.value)}
            placeholder="Write a message for your loved one..."
            className="w-full h-20 text-sm p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-red-200 transition resize-none text-gray-900 placeholder-gray-400"
          />
        </div>

        <CartSummary 
          cart={cart} 
          onUpdateQuantity={onUpdateQuantity} 
          onRemoveItem={onRemoveItem} 
        />
      </div>

      <div className="mt-6 shrink-0 pt-4 bg-white">
        <CheckoutButton cart={cart} onCheckout={onCheckout} />
      </div>
    </aside>
  );
}