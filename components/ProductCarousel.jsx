import ProductCard from "./ProductCard";

export default function ProductCarousel({ products, onAddToCart }) {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 pl-1">
      {products.map((product, index) => (
        <ProductCard
          key={`${product.id}-${index}`}
          product={product}
          index={index}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}