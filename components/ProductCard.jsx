export default function ProductCard({ product }) {
  return (
    <div className="border rounded-xl p-3 w-56 shadow-sm bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded-lg bg-gray-100"
      />

      <h3 className="font-semibold mt-2 line-clamp-2">{product.name}</h3>

      <p className="text-sm text-gray-600 mt-1">{product.price}</p>

      <a
        href={product.url}
        target="_blank"
        rel="noreferrer"
        className="block text-center mt-3 w-full bg-black text-white py-2 rounded-lg"
      >
        View Product
      </a>
    </div>
  );
}