import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  const [cart, setCart] = useState(location.state);

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async function purchaseCart() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }
    try {
      const items = [];

      for (let i = 0; i < cart.length; i++) {
        items.push({
          productID: cart[i].productID,
          quantity: cart[i].quantity,
        });
      }

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          address: address,
          customerName: name==""?null:name,
          items: items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully");
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error);

      if (error.response && error.response.status == 400) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
  <div className="w-full min-h-screen bg-primary flex flex-col items-center py-10">
    <div className="w-[90%] max-w-3xl flex flex-col gap-6">

      <h1 className="text-3xl font-bold text-center text-accent drop-shadow-sm">
        Checkout
      </h1>

      {cart.map((item, index) => (
        <div
          key={index}
          className="w-full bg-white shadow-lg rounded-xl flex flex-col lg:flex-row p-4 relative transition-all hover:shadow-xl"
        >
          <button
            className="absolute -right-4 -top-4 bg-white text-red-500 shadow-md text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-1 transition-colors"
            onClick={() => {}}
          >
            <BiTrash />
          </button>

          <img
            className="h-[120px] lg:h-[140px] aspect-square object-cover rounded-lg"
            src={item.image}
          />

          <div className="w-full px-4 flex flex-col justify-center">
            <h1 className="font-semibold text-lg leading-tight">
              {item.name}
            </h1>
            <span className="text-sm text-secondary">{item.productID}</span>
          </div>

          <div className="flex flex-row lg:flex-col items-center justify-center gap-2 px-3">
            <CiCircleChevUp
              className="text-3xl cursor-pointer hover:text-accent"
              onClick={() => {
                const newCart = [...cart];
                newCart[index].quantity += 1;
                setCart(newCart);
              }}
            />

            <span className="font-bold text-3xl">{item.quantity}</span>

            <CiCircleChevDown
              className="text-3xl cursor-pointer hover:text-red-400"
              onClick={() => {
                const newCart = [...cart];
                if (newCart[index].quantity > 1) newCart[index].quantity -= 1;
                setCart(newCart);
              }}
            />
          </div>

          <div className="flex flex-col justify-center items-end w-[150px]">
            {item.labelledPrice > item.price && (
              <span className="line-through text-secondary text-lg">
                LKR {item.labelledPrice.toFixed(2)}
              </span>
            )}
            <span className="font-semibold text-accent text-2xl">
              LKR {item.price.toFixed(2)}
            </span>
          </div>
        </div>
      ))}

      <div className="w-full bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-secondary">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-[50px] border border-secondary rounded-md px-3 focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-secondary">Shipping Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-[120px] border border-secondary rounded-md px-3 py-2 focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <button
          onClick={purchaseCart}
          className="w-full bg-accent text-white py-4 rounded-xl text-lg font-semibold shadow-lg hover:bg-accent/80 transition-all"
        >
          Place Order
        </button>

        <span className="text-2xl font-bold text-accent drop-shadow-sm">
          Total: LKR {getTotal().toFixed(2)}
        </span>
      </div>
    </div>
  </div>
  );
}
