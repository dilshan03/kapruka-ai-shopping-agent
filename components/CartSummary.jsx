export default function CartSummary({ cart }) {
  const total = cart.reduce((sum, item) => {
    const priceNumber = String(item.price).replace(/[^\d]/g, "");
    return sum + (Number(priceNumber) || 0);
  }, 0);

  return (
    <div className="mt-8 border-t border-red-50 pt-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">
        Cart Summary
      </p>

      {cart.length === 0 ? (
        <p className="text-sm text-gray-400">No selected items yet.</p>
      ) : (
        <div className="space-y-3">
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex gap-3 items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-xl object-cover bg-gray-100"
              />

              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-[#C91508] font-bold">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Selected Items</span>
          <span>{cart.length}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Delivery Fee</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>Rs. {total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}