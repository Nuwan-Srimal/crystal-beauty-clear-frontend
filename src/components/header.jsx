import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="w-full bg-accent  h-[100px] text-white px-[40px]">
			<div className="w-full h-full flex relative ">
				<img src="/logo.png" className="h-full absolute w-[170px] left-0  object-cover" />
                <div className="h-full flex justify-center items-center w-full text-lg gap-[20px]">
					
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
			</div>
		</header>
	);
}