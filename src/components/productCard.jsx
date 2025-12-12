import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;
  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-xl m-3 flex flex-col overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="h-[250px] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
        />
      </div>

      <div className="px-4 py-3 flex-1 flex flex-col justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            {product.labelledPrice > product.price ? (
              <>
                <span className="text-sm text-secondary line-through">
                  LKR {product.labelledPrice.toFixed(2)}
                </span>
                <span className="text-lg font-semibold text-accent">
                  LKR {product.price.toFixed(2)}
                </span>
                <span className="ml-2 inline-block text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  Sale
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-accent">
                LKR {product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-secondary/80">
            <span className="bg-neutral-100 px-2 py-1 rounded-full">{product.category}</span>
            <span className="opacity-80">{product.productID}</span>
          </div>
        </div>

        <Link
          to={"/overview/" + product.productID}
          className="mt-3 inline-block w-full text-center py-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-colors"
          aria-label={`View ${product.name}`}
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
