import { Link, Route, Routes } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";

export default function AdminPage() {
	return (
		<div className="w-full h-full bg-primary flex p-2 text-secondary">
			<div className="w-[300px] h-full bg-primary flex flex-col items-center gap-[20px]">
				<div className="flex flex-row w-[90%] h-[70px] bg-accent items-center rounded-2xl mb-[20px]">
					<img
						src="/logo.png"
						alt="CBC - Crystal Beauty Clear"
						className="h-[70px]"
					/>
					<span className="text-white text-xl ml-4">Admin panel</span>
				</div>
                <Link to="/admin" className="w-[90%] flex items-center gap-2 px-4  rounded-lg">
                    <FaChartLine  />
                    Dashboard
                </Link>
                <Link to="/admin/orders" className="w-[90%] flex items-center gap-2 px-4  rounded-lg">
                    <MdShoppingCartCheckout className="text-xl"/>
                    Orders
                </Link>
                <Link to="/admin/products" className="w-[90%] flex items-center gap-2 px-4  rounded-lg">
                    <BsBox2Heart />
                    Products
                </Link>
                <Link to="/admin/users" className="w-[90%] flex items-center gap-2 px-4  rounded-lg">
                    <HiOutlineUsers />
                    Users
                </Link>
			</div>
			<div className="w-[calc(100%-300px)] h-full border-[4px] border-accent rounded-[20px] overflow-hidden">
				<div className=" h-full w-full max-w-full max-h-full overflow-y-scroll">
                    <Routes path="/">
						<Route path="/" element={<h1>Dashboard</h1>} />
						<Route path="/products" element={<AdminProductPage/>} />
						<Route path="/orders" element={<h1>Orders</h1>} />
                        <Route path="/add-product" element={<AddProductPage />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}