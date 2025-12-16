import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";

export default function ProductOverview() {
  const params = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Failed to fetch product details");
        setStatus("error");
      });
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] text-secondary bg-primary py-6 sm:py-8">
      {status === "loading" && <Loader />}

      {status === "success" && product && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <nav className="text-xs sm:text-sm mb-4 text-secondary/70" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2 items-center">
              <li><Link to="/">Home</Link></li>
              <li>/</li>
              <li><Link to="/products">Products</Link></li>
              <li>/</li>
              <li
                className="font-medium truncate max-w-[220px]"
                title={product.name}
              >
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="bg-primary border border-secondary/20 shadow-xl rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 lg:p-8">

              <div className="lg:col-span-7 flex justify-center">
                <div className="w-full max-w-xl sm:max-w-2xl flex justify-center">
                  <ImageSlider images={product.images} />
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-2 bg-white p-4 sm:p-6 rounded-2xl shadow-lg">

                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm text-secondary/70">
                    Product ID:{" "}
                    <span className="font-medium text-secondary">
                      {product.productID}
                    </span>
                  </span>

                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-snug">
                    {product.name}
                    {product.altNames.map((name, index) => (
                      <span
                        key={index}
                        className="block sm:inline font-normal text-secondary text-sm sm:text-base"
                      >
                        {" | "}{name}
                      </span>
                    ))}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-secondary/70">
                    <span>
                      Category:{" "}
                      <span className="font-medium text-secondary">
                        {product.category}
                      </span>
                    </span>

                    {product.labelledPrice > product.price && (
                      <span className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent font-semibold">
                        Sale
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="text-xs sm:text-sm text-secondary/70 mb-1">
                    Description
                  </h3>
                  <p className="leading-relaxed text-sm sm:text-base">
                    {product.description}
                  </p>
                </div>

                <div className="mt-4">
                  {product.labelledPrice > product.price ? (
                    <div className="flex flex-wrap items-baseline gap-3">
                      <p className="text-sm sm:text-lg text-secondary font-semibold line-through">
                        LKR {Number(product.labelledPrice).toFixed(2)}
                      </p>
                      <p className="text-2xl sm:text-3xl text-accent font-extrabold">
                        LKR {Number(product.price).toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-2xl sm:text-3xl text-accent font-extrabold">
                      LKR {Number(product.price).toFixed(2)}
                    </p>
                  )}

                  <p className="mt-1 text-xs sm:text-sm text-secondary/70">
                    Free local pickup · 7-day returns
                  </p>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <button
                    className="w-full h-12 bg-accent text-white font-semibold rounded-lg shadow hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/40 transition"
                    onClick={() => {
                      addToCart(product, 1);
                      toast.success("Added to cart");
                    }}
                    aria-label="Add to cart"
                  >
                    Add to Cart
                  </button>

                  <Link
                    to="/checkout"
                    state={[
                      {
                        image: product.images[0],
                        productID: product.productID,
                        name: product.name,
                        price: product.price,
                        labelledPrice: product.labelledPrice,
                        quantity: 1,
                      },
                    ]}
                    className="w-full h-12 border-2 border-accent text-accent font-semibold rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition"
                    aria-label="Buy now"
                  >
                    Buy Now
                  </Link>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-secondary/70">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-secondary">Shipping</h4>
                    <p className="mt-1">Ships within 2 business days.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-secondary">Warranty</h4>
                    <p className="mt-1">1-year limited warranty.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-red-500 text-lg">
            Failed to load product details
          </h1>
          <p className="text-secondary/70 mt-2">
            Try refreshing the page or come back later.
          </p>
        </div>
      )}
    </div>
  );
}
