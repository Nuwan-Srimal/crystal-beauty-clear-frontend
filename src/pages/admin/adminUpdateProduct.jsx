import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateProductPage() {
	const location = useLocation();
	const navigate = useNavigate();

	const [productId, setProductId] = useState(location.state.productID);
	const [name, setName] = useState(location.state.name);
	const [altNames, setAltNames] = useState(location.state.altNames.join(","));
	const [description, setDescription] = useState(location.state.description);
	const [images, setImages] = useState([]);
	const [price, setPrice] = useState(location.state.price);
	const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
	const [category, setCategory] = useState(location.state.category);
	const [stock, setStock] = useState(location.state.stock);

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

		try {
			let urls = await Promise.all(promises);
			if (urls.length === 0) {
				urls = location.state.images;
			}

			const alternativeNames = altNames.split(",");

			const product = {
				productID: productId,
				name,
				altNames: alternativeNames,
				description,
				images: urls,
				price,
				labelledPrice,
				category,
				stock,
			};

			await axios.put(
				import.meta.env.VITE_API_URL + "/api/products/" + productId,
				product,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);

			toast.success("Product updated successfully");
			navigate("/admin/products");
		} catch {
			toast.error("An error occurred");
		}
	}

	return (
		<div className="w-full h-full flex justify-center overflow-y-auto">
			<div className="w-full max-w-4xl py-6">

				<div className="rounded-2xl bg-white shadow-lg border border-secondary/10 overflow-hidden">

					<div className="flex items-center justify-between px-6 py-5 border-b border-secondary/10">
						<div>
							<h1 className="text-xl font-semibold text-secondary">
								Update Product
							</h1>
							<p className="text-sm text-secondary/60">
								Update product details and inventory
							</p>
						</div>
					</div>

					<div className="px-6 py-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

							<div>
								<label className="text-sm font-medium text-secondary">
									Product ID
								</label>
								<input
									disabled
									value={productId}
									onChange={(e) => setProductId(e.target.value)}
									className="mt-1 h-11 w-full rounded-xl border border-secondary/20 bg-secondary/5 px-3 text-secondary"
								/>
							</div>

							<div>
								<label className="text-sm font-medium text-secondary">
									Name
								</label>
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="mt-1 h-11 w-full rounded-xl border border-secondary/20 px-3 focus:ring-2 focus:ring-accent/30"
								/>
							</div>

							<div className="md:col-span-2">
								<label className="text-sm font-medium text-secondary">
									Alternative Names
								</label>
								<input
									value={altNames}
									onChange={(e) => setAltNames(e.target.value)}
									className="mt-1 h-11 w-full rounded-xl border border-secondary/20 px-3 focus:ring-2 focus:ring-accent/30"
								/>
							</div>

							<div className="md:col-span-2">
								<label className="text-sm font-medium text-secondary">
									Description
								</label>
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									className="mt-1 min-h-[120px] w-full rounded-xl border border-secondary/20 px-3 py-2 focus:ring-2 focus:ring-accent/30"
								/>
							</div>

							<div className="md:col-span-2">
								<label className="text-sm font-medium text-secondary">
									Images
								</label>
								<input
									type="file"
									multiple
									onChange={(e) => setImages(e.target.files)}
									className="mt-2 block w-full rounded-xl border border-secondary/20 file:mr-4 file:rounded-lg file:border-0 file:bg-accent/10 file:px-4 file:py-2"
								/>
								<p className="mt-1 text-xs text-secondary/60">
									Leave empty to keep existing images
								</p>
							</div>

							<div>
								<label className="text-sm font-medium text-secondary">
									Price
								</label>
								<input
									type="number"
									value={price}
									onChange={(e) => setPrice(e.target.value)}
									className="mt-1 h-11 w-full rounded-xl border border-secondary/20 px-3"
								/>
							</div>

							<div>
								<label className="text-sm font-medium text-secondary">
									Labelled Price
								</label>
								<input
									type="number"
									value={labelledPrice}
									onChange={(e) => setLabelledPrice(e.target.value)}
									className="mt-1 h-11 w-full rounded-xl border border-secondary/20 px-3"
								/>
							</div>

							<div>
								<label className="text-sm font-medium text-secondary">
									Category
								</label>
								<select
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									className="mt-1 h-11 w-full rounded-xl border border-secondary/20 px-3"
								>
									<option value="cream">Cream</option>
									<option value="lotion">Lotion</option>
									<option value="serum">Serum</option>
								</select>
							</div>

							<div>
								<label className="text-sm font-medium text-secondary">
									Stock
								</label>
								<input
									type="number"
									value={stock}
									onChange={(e) => setStock(e.target.value)}
									className="mt-1 h-11 w-full rounded-xl border border-secondary/20 px-3"
								/>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between px-6 py-4 border-t border-secondary/10">
						<span className="text-xs text-secondary/60">
							Ensure prices and stock are accurate before saving.
						</span>
						<div className="flex gap-3">
							<button
								onClick={() => navigate("/admin/products")}
								className="h-10 w-[110px] rounded-xl border border-secondary/20 hover:bg-secondary/5"
							>
								Cancel
							</button>
							<button
								onClick={updateProduct}
								className="h-10 w-[110px] rounded-xl bg-accent text-white hover:bg-accent/90"
							>
								Save
							</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}
