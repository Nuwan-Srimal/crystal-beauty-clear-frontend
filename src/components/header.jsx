import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Header() {
	const [isSideBarOpen, setIsSidebarOpen] = useState(false);

	return (
		<header className="w-full bg-accent  h-[100px] text-white px-[40px]">
			<div className="w-full h-full flex relative ">
				<img src="/logo.png" className="h-full absolute w-[170px] left-0  object-cover" />
                				<img
					src="/logo.png"
					className="hidden lg:flex h-full absolute w-[170px] left-0  object-cover"
				/>
				<div className="lg:hidden w-full relative  flex justify-center items-center">
					<MdMenu
						className="absolute left-0 text-3xl"
						onClick={() => setIsSidebarOpen(true)}
					/>
					<img src="/logo.png" className="  h-full  w-[170px]   object-cover" />
				</div>
				{isSideBarOpen && (
					<div className="fixed top-0 left-0 w-full h-screen bg-[#00000080] text-secondary z-100">
						<div className="w-[300px] bg-primary h-full flex flex-col">
							<div className="lg:hidden h-[100px] w-full bg-accent relative  flex justify-center items-center">
								<MdMenu
									className="absolute left-2 text-white text-3xl"
									onClick={() => setIsSidebarOpen(false)}
								/>
								<img
									src="/logo.png"
									className="  h-full  w-[170px]   object-cover"
								/>

							</div>
							<a href="/" className="p-4 border-b border-secondary/10">
								Home
							</a>
							<a href="/products" className="p-4 border-b border-secondary/10">
								Products
							</a>
							<a href="/about" className="p-4 border-b border-secondary/10">
								About
							</a>
							<a href="/contact" className="p-4 border-b border-secondary/10">
								Contact
							</a>
							<a href="/cart" className="p-4 border-b border-secondary/10">
								Cart
							</a>
						</div>
					</div>
				)}

				<div className="hidden h-full lg:flex justify-center items-center w-full text-lg gap-[20px]">
					<Link to="/">Home</Link>
					<Link to="/products">Products</Link>
					<Link to="/about">About</Link>
					<Link to="/contact">Contact</Link>
				</div>
				<Link
					to="/cart"
					className="h-full absolute right-0 hidden text-3xl lg:flex justify-center items-center"
				>
					<BsCart3 />
				</Link>
			</div>
		</header>
	);
}