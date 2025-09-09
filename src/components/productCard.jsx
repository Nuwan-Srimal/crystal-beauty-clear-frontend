import { Link } from "react-router-dom";

export default function ProductCard(props) {
	const product = props.product;
	return (
		<div className="w-[300px] h-[400px] shadow-2xl m-3 flex flex-col px-[10px]">
			<img className="w-full h-[250px] object-cover" src={product.images[0]}/>
			<h1 className="text-xl font-bold text-secondary">{product.name}</h1>
			{
				product.labelledPrice>product.price?
				<div className="flex gap-3 items-center">
					<p className="text-lg text-secondary font-semibold line-through">LKR {product.labelledPrice.toFixed(2)}</p>
					<p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
				</div>:
				<p className="text-lg text-accent font-semibold">LKR {product.price.toFixed(2)}</p>
			}
			<p className="text-sm text-secondary/70">{product.productID}</p>
			<p className="text-sm text-secondary/70">{product.category}</p>
			<Link to={"/overview/"+product.productID} className="w-full h-[30px] mt-[5px] border text-center border-accent text-accent hover:bg-accent hover:text-white">
				View Product
			</Link>
		</div>
	);
}