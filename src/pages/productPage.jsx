import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";
import { Link } from "react-router-dom"; // required for empty state

export function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setIsLoading(false);
          toast.error("Failed to load products");
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary pb-12">

      <div className="w-full max-w-7xl mx-auto px-4 pt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">
              Products
            </h1>
            <p className="text-sm text-secondary mt-1">
              Browse our collection — {products.length} product
              {products.length !== 1 && "s"}
            </p>
          </div>

          <div className="w-full md:w-1/3">
            <input
              type="text"
              onChange={async (e) => {
                try {
                  if (e.target.value == "") {
                    setIsLoading(true);
                  } else {
                    const searchResult = await axios.get(
                      import.meta.env.VITE_API_URL +
                        "/api/products/search/" +
                        e.target.value
                    );
                    setProducts(searchResult.data);
                  }
                } catch {
                  toast.error("Search failed");
                }
              }}
              placeholder="Search products..."
              className="w-full px-4 py-3 rounded-xl border border-secondary/10 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 mt-8">
        {isLoading ? (
          <div className="w-full min-h-[40vh] flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((item) => {
                return <ProductCard key={item.productID} product={item} />;
              })}
            </div>

            {products.length === 0 && (
              <div className="w-full mt-12 bg-white rounded-2xl shadow-md p-8 text-center">
                <h2 className="text-xl font-semibold text-accent">
                  No products found
                </h2>
                <p className="text-sm text-secondary mt-2">
                  Try a different search term or check back later.
                </p>
                <Link
                  to="/"
                  className="inline-block mt-4 bg-accent text-white px-6 py-3 rounded-xl hover:bg-accent/90 transition"
                >
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
