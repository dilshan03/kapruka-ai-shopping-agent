import { Trash2, Plus, Minus } from "lucide-react";

export default function CartSummary({ cart, onUpdateQuantity, onRemoveItem }) {
  const total = cart.reduce((sum, item) => {
    const priceNumber = String(item.price).replace(/[^\d]/g, "");
    return sum + ((Number(priceNumber) || 0) * (item.quantity || 1));
  }, 0);

  return (
    <div className="mt-4 pt-4">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4 font-semibold">
        Cart Summary
      </p>

      {cart.length === 0 ? (
        <p className="text-xs text-gray-400">No selected items yet.</p>
      ) : (
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex gap-3 items-start bg-gray-50 p-2 rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-lg object-cover bg-white"
              />

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-[#C91508] font-bold mt-1">
                  {item.price}
                </p>
                
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:bg-gray-200 rounded text-gray-500">
                    <Minus size={12} />
                  </button>
                  <span className="text-xs font-semibold w-4 text-center">{item.quantity || 1}</span>
                  <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:bg-gray-200 rounded text-gray-500">
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <button onClick={() => onRemoveItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 space-y-3 text-sm bg-gray-50 p-4 rounded-xl">
        <div className="flex justify-between">
          <span className="text-gray-500">Selected Items</span>
          <span className="font-medium">{cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Delivery Fee</span>
          <span className="font-medium text-green-600">Free</span>
        </div>

        <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-base">
          <span>Total</span>
          <span className="text-[#C91508]">Rs. {total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}