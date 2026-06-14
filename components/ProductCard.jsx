import { ShoppingCart, ExternalLink } from "lucide-react";

export default function ProductCard({ product, index, onAddToCart }) {
  return (
    <div className="min-w-[260px] max-w-[260px] bg-white rounded-[28px] overflow-hidden border border-red-50 shadow-lg hover:shadow-xl transition group flex flex-col">
      <div className="relative h-[170px] bg-gray-100 overflow-hidden shrink-0">
        <img
          src={product.image || "https://placehold.co/200x200?text=No+Image"}
          alt={product.name}
          onError={(e) => { e.target.src = "https://placehold.co/200x200?text=No+Image" }}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute top-3 left-3 space-y-2">
          {index === 0 && (
            <span className="block bg-[#C91508] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
              BEST MATCH
            </span>
          )}

          <span className="block bg-white/90 backdrop-blur text-gray-700 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
            SAME DAY DELIVERY
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[48px]">
          {product.name}
        </h3>

        <p className="text-xs text-green-600 mt-2 font-medium">● {product.availability || "In Stock"} · Gift Wrapping</p>

        <p className="text-[11px] text-gray-400 italic mt-3 flex-1">
          Recommended because it matches your selected category ({product.category || "General"}).
        </p>

        <div className="flex items-end justify-between mt-4">
          <div>
            <p className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Price</p>
            <p className="font-bold text-lg text-[#C91508]">{product.price}</p>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-10 h-10 rounded-2xl bg-[#C91508] text-white shadow-lg hover:bg-[#A81207] transition flex items-center justify-center group-hover:-translate-y-1"
          >
            <ShoppingCart size={18} />
          </button>
        </div>

        <a
          href={product.url || "#"}
          target="_blank"
          rel="noreferrer"
          className="mt-4 text-[11px] font-semibold text-[#C91508] hover:text-[#A81207] flex items-center gap-1 transition"
        >
          View on Kapruka <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}