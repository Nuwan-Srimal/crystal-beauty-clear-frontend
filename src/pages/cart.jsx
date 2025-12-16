import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { BiTrash } from "react-icons/bi";
import {  useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {

	const [cart, setCart] = useState(loadCart())

	return (
  <div className="w-full min-h-screen bg-primary flex flex-col items-center py-10">
    <div className="w-[92%] max-w-3xl flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-accent">Your Cart</h1>
        <span className="text-sm text-secondary">{cart.length} item{cart.length !== 1 && "s"}</span>
      </header>

      {cart.map((item, index) => (
        <div
          key={index}
          className="w-full bg-white rounded-2xl shadow-lg flex flex-col lg:flex-row items-center p-4 gap-4 transition-shadow hover:shadow-xl relative"
        >
          <button
            className="absolute -right-3 -top-3 bg-white text-red-500 shadow-md rounded-full aspect-square hover:bg-red-500 hover:text-white p-1.5 transition-colors"
            onClick={() => {
              addToCart(item, -item.quantity);
              setCart(loadCart());
            }}
          >
            <BiTrash />
          </button>

          <img
            className="h-[110px] lg:h-[120px] aspect-square object-cover rounded-lg"
            src={item.image}
            alt={item.name}
          />

          <div className="flex-1 flex flex-col justify-center px-2 text-center lg:text-left">
            <h2 className="font-semibold text-lg leading-tight">{item.name}</h2>
            <span className="text-sm text-secondary mt-1">{item.productID}</span>
          </div>

          <div className="w-[110px] flex flex-row lg:flex-col items-center justify-center gap-2">
            <CiCircleChevUp
              className="text-3xl cursor-pointer hover:text-accent"
              onClick={() => {
                addToCart(item, 1);
                setCart(loadCart());
              }}
            />
            <span className="font-semibold text-3xl">{item.quantity}</span>
            <CiCircleChevDown
              className="text-3xl cursor-pointer hover:text-red-400"
              onClick={() => {
                addToCart(item, -1);
                setCart(loadCart());
              }}
            />
          </div>

          <div className="w-[150px] flex flex-col items-end">
            {item.labelledPrice > item.price && (
              <span className="text-secondary line-through text-lg">
                LKR {item.labelledPrice.toFixed(2)}
              </span>
            )}
            <span className="font-semibold text-accent text-2xl mt-1">
              LKR {item.price.toFixed(2)}
            </span>
          </div>
        </div>
      ))}

      <div className="w-full bg-white rounded-2xl shadow-lg p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        <Link
          state={cart}
          to="/checkout"
          className="w-full lg:w-auto text-center bg-accent text-white py-3 px-6 rounded-lg font-semibold shadow hover:bg-accent/80 transition"
        >
          Proceed to Checkout
        </Link>

        <div className="w-full lg:w-auto text-center lg:text-right">
          <div className="text-sm text-secondary">Order Total</div>
          <div className="text-2xl font-bold text-accent">
            LKR {getTotal().toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}