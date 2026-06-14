export default function CheckoutButton({ cart, onCheckout }) {
  return (
    <button
      disabled={cart.length === 0}
      onClick={onCheckout}
      className={`w-full py-4 rounded-2xl font-bold transition ${cart.length === 0
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-[#101828] text-white hover:bg-black shadow-lg"
        }`}
    >
      Checkout Now →
    </button>
  );
}