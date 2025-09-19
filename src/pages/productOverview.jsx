import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader } from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";

export default function ProductOverview() {
  const params = useParams();
  //laoding, success, error
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
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
    <div className="w-full h-[calc(100vh-100px)] text-secondary">
      {status == "loading" && <Loader />}
      {status == "success" && (
        <div className="w-full h-full flex">
          <div className="w-[50%] h-full flex justify-center items-center">
            <ImageSlider images={[
              ...product.images,
              // Add additional static images here
              "/public/bg.jpg",
              "/public/logo.png"
            ]} />
          </div>
          <div className="w-[50%] h-full flex flex-col  items-center gap-4 p-10">
            <span className="">{product.productID}</span>
            <h1 className="text-2xl font-bold text-center">
              {product.name}
              {product.altNames.map((name, index) => {
                return (
                  <span key={index} className=" font-normal text-secondary">
                    {" | " + name}
                  </span>
                );
              })}
            </h1>
            {/* description */}
            <p className="mt-[30px] text-justify">{product.description}</p>
            {/* category */}
            <p>Category: {product.category}</p>
            {/* price */}
            {product.labelledPrice > product.price ? (
              <div className="flex gap-3 items-center">
                <p className="text-lg text-secondary font-semibold line-through">
                  LKR {product.labelledPrice.toFixed(2)}
                </p>
                <p className="text-lg text-accent font-semibold">
                  LKR {product.price.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-lg text-accent font-semibold">
                LKR {product.price.toFixed(2)}
              </p>
            )}
            <div className="w-full h-[40px] flex gap-4 mt-[60px]">
              <button
                className="w-[50%] h-full bg-accent text-white font-semibold hover:bg-accent/80"
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Added to cart");
                }}
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
                className="w-[50%] text-center h-full border border-accent text-accent font-semibold hover:bg-accent hover:text-white"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Additional Image Gallery - Always show */}
      {status == "success" && (
        <div className="w-full mt-10 p-10">
          <h2 className="text-xl font-bold text-center mb-6">Related Images</h2>
          <div className="flex justify-center">
            <ImageSlider images={[
              "/bg.jpg",
              "/logo.png",
              "/vite.svg"
            ]} />
          </div>
        </div>
      )}
      
      {status == "error" && (
        <h1 className="text-red-500">Failed to load product details</h1>
      )}
    </div>
  );
}
