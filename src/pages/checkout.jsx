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

      //if error is 400
      if (error.response && error.response.status == 400) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="w-full lg:h-[calc(100vh-100px)] overflow-y-scroll bg-primary flex flex-col pt-[25px] items-center">
      <div className="w-[400px] lg:w-[600px] flex flex-col gap-4">
        {cart.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full h-[300px] lg:h-[120px] bg-white flex flex-col lg:flex-row relative items-center p-3 lg:p-0"
            >
              <button
                className="absolute  text-red-500 right-[-40px] text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px] font-bold"
                onClick={() => {}}
              >
                <BiTrash />
              </button>
              <img
                className="h-[100px] lg:h-full aspect-square object-cover"
                src={item.image}
              />
              <div className="w-full text-center lg:w-[200px] lg:h-full flex flex-col pl-[5px] pt-[10px] ">
                <h1 className=" font-semibold text-lg w-full text-wrap">
                  {item.name}
                </h1>
                {/* productID */}
                <span className="text-sm text-secondary ">
                  {item.productID}
                </span>
              </div>
              <div className="w-[100px] h-full flex flex-row lg:flex-col justify-center items-center ">
                <CiCircleChevUp
                  className="text-3xl"
                  onClick={() => {
                    const newCart = [...cart];

                    newCart[index].quantity += 1;

                    setCart(newCart);
                  }}
                />
                <span className="font-semibold text-4xl">{item.quantity}</span>
                <CiCircleChevDown
                  className="text-3xl"
                  onClick={() => {
                    const newCart = [...cart];

                    if (newCart[index].quantity > 1) {
                      newCart[index].quantity -= 1;
                    }

                    setCart(newCart);
                  }}
                />
              </div>
              <div className="w-full lg:w-[180px] lg:h-full items-center justify-center flex flex-row lg:flex-col">
                {item.labelledPrice > item.price && (
                  <span className="text-secondary lg:w-full text-center lg:text-right line-through text-lg pr-[10px] lg:mt-[20px]">
                    LKR {item.labelledPrice.toFixed(2)}
                  </span>
                )}
                <span className="font-semibold text-accent lg:w-full text-center lg:text-right text-2xl pr-[10px] lg:mt-[5px]">
                  LKR {item.price.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
        				<div className="w-full border lg:w-full  bg-white flex flex-col    items-center relative">
					<div className="w-full  h-full flex  justify-between items-center p-4">
						<label
							htmlFor="name"							
							className="text-sm text-secondary mr-2"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-[400px] h-[50px] border border-secondary rounded-md px-3 text-center"
						/>
					</div>
					<div className="w-full  h-full flex  justify-between items-center p-4">
						<label
							htmlFor="address"							
							className="text-sm text-secondary mr-2"
						>
							Shipping Address
						</label>
						<textarea
							type="text"
							id="address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className="w-[400px] h-[150px] border border-secondary rounded-md px-3 text-center"
						/>
					</div>
				</div>
				<div className="w-full lg:w-full h-[120px] bg-white flex flex-col-reverse  lg:flex-row justify-end items-center relative"></div>
        <button
          to="/checkout"
          onClick={purchaseCart}
          className="lg:absolute left-0 bg-accent text-white px-6 py-3 lg:ml-[20px] hover:bg-accent/80"
        >
          Order
        </button>
        <div className="h-[50px]">
          <span className="font-semibold text-accent w-full text-right text-2xl pr-[10px] mt-[5px]">
            Total: LKR {getTotal().toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
