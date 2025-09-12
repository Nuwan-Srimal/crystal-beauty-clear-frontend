import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function CheckoutPage() {
	const location = useLocation();

	const [cart, setCart] = useState(location.state);

	function getTotal() {
		let total = 0;
		cart.forEach((item) => {
			total += item.price * item.quantity;
		});
		return total;
	}

	return (
		<div className="w-full h-[calc(100vh-100px)] bg-primary flex flex-col pt-[25px] items-center">
			<div className="w-[600px] flex flex-col gap-4">
				{cart.map((item, index) => {
					return (
						<div
							key={index}
							className="w-full h-[120px] bg-white flex relative items-center"
						>
							<button
								className="absolute  text-red-500 right-[-40px] text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px] font-bold"
								onClick={() => {}}
							>
								<BiTrash />
							</button>
							<img
								className="h-full aspect-square object-cover"
								src={item.image}
							/>
							<div className="w-[200px] h-full  flex flex-col pl-[5px] pt-[10px] ">
								<h1 className=" font-semibold text-lg w-full text-wrap">
									{item.name}
								</h1>
								{/* productID */}
								<span className="text-sm text-secondary ">
									{item.productID}
								</span>
							</div>
							<div className="w-[100px] h-full flex flex-col justify-center items-center ">
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
							<div className="w-[180px]  h-full flex flex-col">
								{item.labelledPrice > item.price && (
									<span className="text-secondary w-full  text-right line-through text-lg pr-[10px] mt-[20px]">
										LKR {item.labelledPrice.toFixed(2)}
									</span>
								)}
								<span className="font-semibold text-accent w-full text-right text-2xl pr-[10px] mt-[5px]">
									LKR {item.price.toFixed(2)}
								</span>
							</div>
						</div>
					);
				})}
				<div className="w-full h-[120px] bg-white flex justify-end items-center relative">
					<button
						to="/checkout"
						className="absolute left-0 bg-accent text-white px-6 py-3  ml-[20px] hover:bg-accent/80"
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
		</div>
	);
}