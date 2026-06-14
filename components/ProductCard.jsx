export default function ProductCard({ product, index, onAddToCart }) {
  return (
    <div className="min-w-[260px] max-w-[260px] bg-white rounded-[28px] overflow-hidden border border-red-50 shadow-lg hover:shadow-xl transition group">
      <div className="relative h-[170px] bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute top-3 left-3 space-y-2">
          {index === 0 && (
            <span className="block bg-[#C91508] text-white text-[10px] font-bold px-3 py-1 rounded-full">
              BEST MATCH
            </span>
          )}

          <span className="block bg-white text-gray-700 text-[10px] font-bold px-3 py-1 rounded-full">
            SAME DAY DELIVERY
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-gray-900 min-h-[48px]">
          {product.name}
        </h3>

        <p className="text-xs text-green-600 mt-1">● In Stock · Gift Wrapping Available</p>

        <p className="text-xs text-gray-400 italic mt-4 min-h-[40px]">
          Recommended because it matches your budget and gift occasion.
        </p>

        <div className="flex items-end justify-between mt-5">
          <div>
            <p className="text-[10px] uppercase text-gray-400">Price</p>
            <p className="font-bold text-xl text-[#C91508]">{product.price}</p>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-12 h-12 rounded-2xl bg-[#C91508] text-white shadow-lg hover:bg-[#A81207] transition"
          >
            🛒
          </button>
        </div>

        <a
          href={product.url || "#"}
          target="_blank"
          rel="noreferrer"
          className="block mt-4 text-xs underline text-[#C91508]"
        >
          View Product
        </a>
      </div>
    </div>
  );
}