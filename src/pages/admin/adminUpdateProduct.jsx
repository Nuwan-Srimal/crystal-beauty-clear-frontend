import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateProductPage() {
    const location = useLocation()
	const [productId, setProductId] = useState(location.state.productID);
	const [name, setName] = useState(location.state.name);
	const [altNames, setAltNames] = useState(location.state.altNames.join(","));
	const [description, setDescription] = useState(location.state.description);
	const [images, setImages] = useState([]);
	const [price, setPrice] = useState(location.state.price);
	const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
	const [category, setCategory] = useState(location.state.category);
	const [stock, setStock] = useState(location.state.stock);
	const navigate = useNavigate();

	async function updateProduct() {
		const token = localStorage.getItem("token");
		if (token == null) {
			navigate("/login");
			return;
		}

		const promises = [];
		for (let i = 0; i < images.length; i++) {
			promises[i] = mediaUpload(images[i]);
		}
		//
		try {
			let urls = await Promise.all(promises);

            if(urls.length == 0 ){
                urls = location.state.images
            }

			const alternativeNames = altNames.split(",")

			const product = {
				productID : productId,
				name : name,
				altNames : alternativeNames,
				description : description,
				images : urls,
				price : price,
				labelledPrice : labelledPrice,
				category : category,
				stock : stock
			}

			await axios.put(import.meta.env.VITE_API_URL+"/api/products/"+productId,product,{
				headers:{
					Authorization : "Bearer "+token
				}
			})
			toast.success("Product updated successfully");
			navigate("/admin/products");

		} catch {
			toast.error("An error occurred");
		}

	}

	return (
		<div className="min-h-screen w-full bg-primary/70 flex items-center justify-center p-6">
			<div className="w-full max-w-3xl rounded-2xl border border-accent/30 bg-white shadow-xl">
				{/* Header */}
				<div className="flex items-center justify-between gap-3 border-b border-accent/20 px-6 py-5">
					<div>
						<h1 className="text-xl font-semibold text-secondary">
							Update Product
						</h1>
						<p className="text-sm text-secondary/70">
							Create a new SKU with clean metadata.
						</p>
					</div>
					<div className="h-10 w-10 rounded-full bg-accent/15 ring-1 ring-accent/30" />
				</div>

				{/* Form grid */}
				<div className="px-6 py-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						{/* Product ID */}
						<label className="flex flex-col gap-1.5">
							<span className="text-sm font-medium text-secondary">
								Product ID
							</span>
							<input
                                disabled
								className="h-11 rounded-xl border border-secondary/20 bg-white px-3 text-secondary placeholder:text-secondary/40 outline-none focus:border-accent focus:ring-4 focus:ring-accent/20 transition"
								value={productId}
								onChange={(e) => {
									setProductId(e.target.value);
								}}
								placeholder="e.g., DS-CR-001"
							/>
						</label>

						{/* Name */}
						<label className="flex flex-col gap-1.5">
							<span className="text-sm font-medium text-secondary">Name</span>
							<input
								className="h-11 rounded-xl border border-secondary/20 bg-white px-3 text-secondary placeholder:text-secondary/40 outline-none focus:border-accent focus:ring-4 focus:ring-accent/20 transition"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
								}}
								placeholder="e.g., Diamond Shine Night Cream"
							/>
						</label>

						{/* Alt Names */}
						<label className="flex flex-col gap-1.5 md:col-span-2">
							<span className="text-sm font-medium text-secondary">
								Alternative Names
							</span>
							<input
								className="h-11 rounded-xl border border-secondary/20 bg-white px-3 text-secondary placeholder:text-secondary/40 outline-none focus:border-accent focus:ring-4 focus:ring-accent/20 transition"
								value={altNames}
								onChange={(e) => {
									setAltNames(e.target.value);
								}}
								placeholder="Comma-separated; e.g., night cream, hydrating cream"
							/>
						</label>

						{/* Description */}
						<label className="flex flex-col gap-1.5 md:col-span-2">
							<span className="text-sm font-medium text-secondary">
								Description
							</span>
							<textarea
								className="min-h-[120px] rounded-xl border border-secondary/20 bg-white px-3 py-2 text-secondary placeholder:text-secondary/40 outline-none focus:border-accent focus:ring-4 focus:ring-accent/20 transition"
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
								placeholder="Brief product overview, benefits, and usage."
							/>
						</label>

						{/* Images */}
						<label className="flex flex-col gap-1.5 md:col-span-2">
							<span className="text-sm font-medium text-secondary">Images</span>
							<input
								type="file"
								onChange={(e) => {
									setImages(e.target.files);
								}}
								multiple
								className="block w-full cursor-pointer rounded-xl border border-secondary/20 bg-white file:mr-4 file:rounded-lg file:border-0 file:bg-accent/10 file:px-4 file:py-2 file:text-secondary file:font-medium hover:file:bg-accent/20 transition"
							/>
							<span className="text-xs text-secondary/60">
								PNG/JPG recommended. Multiple files supported.
							</span>
						</label>

						{/* Price */}
						<label className="flex flex-col gap-1.5">
							<span className="text-sm font-medium text-secondary">Price</span>
							<input
								type="number"
								value={price}
								onChange={(e) => {
									setPrice(e.target.value);
								}}
								placeholder="0.00"
								className="h-11 rounded-xl border border-secondary/20 bg-white px-3 text-secondary placeholder:text-secondary/40 outline-none focus:border-accent focus:ring-4 focus:ring-accent/20 transition"
							/>
						</label>

						{/* Labelled Price */}
						<label className="flex flex-col gap-1.5">
							<span className="text-sm font-medium text-secondary">
								Labelled Price
							</span>
							<input
								type="number"
								value={labelledPrice}
								onChange={(e) => {
									setLabelledPrice(e.target.value);
								}}
								placeholder="MRP / Sticker Price"
								className="h-11 rounded-xl border border-secondary/20 bg-white px-3 text-secondary placeholder:text-secondary/40 outline-none focus:border-accent focus:ring-4 focus:ring-accent/20 transition"
							/>
						</label>

						{/* Category */}
						<label className="flex flex-col gap-1.5">
							<span className="text-sm font-medium text-secondary">
								Category
							</span>
							<select
								value={category}
								onChange={(e) => {
									setCategory(e.target.value);
								}}
								className="h-11 rounded-xl border border-secondary/20 bg-white px-3 text-secondary outline-none focus:border-accent focus:ring-4 focus:ring-accent/20 transition"
							>
								<option value="cream">Cream</option>
								<option value="lotion">Lotion</option>
								<option value="serum">Serum</option>
							</select>
						</label>

						{/* Stock */}
						<label className="flex flex-col gap-1.5">
							<span className="text-sm font-medium text-secondary">Stock</span>
							<input
								type="number"
								value={stock}
								onChange={(e) => {
									setStock(e.target.value);
								}}
								placeholder="0"
								className="h-11 rounded-xl border border-secondary/20 bg-white px-3 text-secondary placeholder:text-secondary/40 outline-none focus:border-accent focus:ring-4 focus:ring-accent/20 transition"
							/>
						</label>
					</div>
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between gap-3 border-t border-accent/20 px-6 py-4">
					<span className="text-xs text-secondary/60">
						Tip: Maintain consistent naming for SKU discoverability.
					</span>
					<div className="flex items-center gap-2">
						<button
							onClick={() => {
								navigate("/admin/products");
							}}
							className="rounded-full bg-[#FF000050] px-3 h-[40px] w-[100px] py-1 text-md flex justify-center items-center font-medium text-secondary ring-1 ring-accent/30 hover:border-red-500 hover:border-[2px]"
						>
							Cancel
						</button>
						<button
							onClick={updateProduct}
							className="rounded-full bg-accent/15 px-3 h-[40px] w-[100px] py-1 text-md flex justify-center items-center font-medium text-secondary ring-1 ring-accent/30 hover:border-accent hover:border-[2px]"
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}