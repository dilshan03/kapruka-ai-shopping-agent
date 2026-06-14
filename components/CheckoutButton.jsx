export default function CheckoutButton({ cart }) {
  return (
    <button
      disabled={cart.length === 0}
      className={`w-full py-4 rounded-2xl font-bold transition ${cart.length === 0
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-[#101828] text-white hover:bg-black shadow-lg"
        }`}
    >
      Checkout Now →
    </button>
  );
}