import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddProductPage() {
	const [productId, setProductId] = useState("");
	const [name, setName] = useState("");
	const [altNames, setAltNames] = useState("");
	const [description, setDescription] = useState("");
	const [images, setImages] = useState([]);
	const [price, setPrice] = useState(0);
	const [labelledPrice, setLabelledPrice] = useState(0);
	const [category, setCategory] = useState("cream");
	const [stock, setStock] = useState(0);

	const navigate = useNavigate();

	async function addProduct() {
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
			const urls = await Promise.all(promises);
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

			await axios.post(
				import.meta.env.VITE_API_URL + "/api/products",
				product,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);

			toast.success("Product added successfully");
			navigate("/admin/products");
		} catch {
			toast.error("An error occurred");
		}
	}

	return (
		<div className="w-full h-full flex justify-center overflow-y-auto px-3 sm:px-4">
			<div className="w-full max-w-4xl py-4 sm:py-6">

				<div className="rounded-2xl bg-white shadow-lg border border-secondary/10 overflow-hidden">

					{/* Header */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-secondary/10 gap-1">
						<div>
							<h1 className="text-lg sm:text-xl font-semibold text-secondary">
								Add Product
							</h1>
							<p className="text-xs sm:text-sm text-secondary/60">
								Create a new product for your store
							</p>
						</div>
					</div>

					{/* Form */}
					<div className="px-4 sm:px-6 py-5 sm:py-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

							<div>
								<label className="text-sm font-medium text-secondary">
									Product ID
								</label>
								<input
									value={productId}
									onChange={(e) => setProductId(e.target.value)}
									placeholder="e.g. CBC0000001"
									className="mt-1 h-11 w-full rounded-xl border border-secondary/20 px-3 focus:ring-2 focus:ring-accent/30"
								/>
							</div>

							<div>
								<label className="text-sm font-medium text-secondary">
									Name
								</label>
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									placeholder="Diamond Shine Night Cream"
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
									placeholder="night cream, hydrating cream"
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
									placeholder="Brief product description and usage"
									className="mt-1 min-h-[110px] sm:min-h-[120px] w-full rounded-xl border border-secondary/20 px-3 py-2 focus:ring-2 focus:ring-accent/30"
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
									className="mt-2 block w-full rounded-xl border border-secondary/20
										file:mr-4 file:rounded-lg file:border-0
										file:bg-accent/10 file:px-4 file:py-2
										file:text-secondary"
								/>
								<p className="mt-1 text-xs text-secondary/60">
									PNG / JPG · Multiple files supported
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

					{/* Footer */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4 border-t border-secondary/10">
						<span className="text-xs text-secondary/60">
							Ensure all product details are correct before submitting.
						</span>
						<div className="flex gap-3 justify-end">
							<button
								onClick={() => navigate("/admin/products")}
								className="h-10 px-5 rounded-xl border border-secondary/20 hover:bg-secondary/5"
							>
								Cancel
							</button>
							<button
								onClick={addProduct}
								className="h-10 px-5 rounded-xl bg-accent text-white hover:bg-accent/90"
							>
								Add Product
							</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}
