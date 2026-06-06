export default function ProductCard({ product }) {
  return (
    <div className="border rounded-xl p-3 w-56 shadow-sm bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover rounded-lg"
      />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.price}</p>
      <button className="mt-3 w-full bg-black text-white py-2 rounded-lg">
        Add to Cart
      </button>
    </div>
  );
}