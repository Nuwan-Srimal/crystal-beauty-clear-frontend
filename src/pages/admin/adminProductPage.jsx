import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";


function ProductDeleteConfirm({ productID, close, refresh }) {
	function deleteProduct() {
		const token = localStorage.getItem("token");
		axios
			.delete(import.meta.env.VITE_API_URL + "/api/products/" + productID, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				close();
				toast.success("Product deleted successfully");
				refresh();
			})
			.catch(() => toast.error("Failed to delete product"));
	}

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-3">
			<div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-xl">
				<h2 className="text-lg font-semibold mb-4 text-secondary">
					Delete Product
				</h2>

				<p className="text-sm text-secondary/70 mb-6">
					Are you sure you want to delete product with ID:
					<span className="font-mono font-semibold ml-1">
						{productID}
					</span>
					?
				</p>

				<div className="flex justify-end gap-3">
					<button
						onClick={close}
						className="rounded-lg border px-4 py-2 text-sm hover:bg-secondary/5"
					>
						Cancel
					</button>
					<button
						onClick={deleteProduct}
						className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}


export default function AdminProductPage() {
	const [products, setProducts] = useState([]);
	const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
	const [productToDelete, setProductToDelete] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		if (isLoading) {
			axios
				.get(import.meta.env.VITE_API_URL + "/api/products")
				.then((res) => {
					setProducts(res.data);
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	return (
		<div className="w-full h-full flex flex-col overflow-hidden">

			{isDeleteConfirmVisible && (
				<ProductDeleteConfirm
					productID={productToDelete}
					close={() => setIsDeleteConfirmVisible(false)}
					refresh={() => setIsLoading(true)}
				/>
			)}

			<Link
				to="/admin/add-product"
				className="fixed right-4 sm:right-8 bottom-4 sm:bottom-8 z-50 rounded-full bg-accent p-3 text-white shadow-lg hover:scale-105 transition"
			>
				<CiCirclePlus size={34} />
			</Link>

			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
				<div>
					<h1 className="text-xl sm:text-2xl font-semibold text-secondary">
						Products
					</h1>
					<p className="text-xs sm:text-sm text-secondary/60">
						Manage your store products
					</p>
				</div>

				<span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
					{products.length} items
				</span>
			</div>

			<div className="sm:hidden space-y-3 overflow-y-auto">
				{isLoading ? (
					<div className="flex h-full items-center justify-center">
						<Loader />
					</div>
				) : (
					products.map((item) => (
						<div
							key={item.productID}
							className="rounded-2xl bg-white shadow border border-secondary/10 p-4 flex gap-4"
						>
							<img
								src={item.images?.[0]}
								alt={item.name}
								className="h-20 w-20 rounded-xl object-cover ring-1 ring-secondary/15"
							/>

							<div className="flex-1">
								<h3 className="font-semibold text-secondary">
									{item.name}
								</h3>

								<p className="text-xs text-secondary/60 font-mono">
									{item.productID}
								</p>

								<div className="mt-2 text-sm">
									<span className="font-semibold">
										LKR {item.price}
									</span>
									{item.labelledPrice > item.price && (
										<span className="ml-2 text-xs line-through text-secondary/60">
											LKR {item.labelledPrice}
										</span>
									)}
								</div>

								<div className="flex items-center gap-2 mt-2 text-xs">
									<span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">
										{item.category}
									</span>
									<span className="text-secondary/60">
										Stock: {item.stock}
									</span>
								</div>

								<div className="flex gap-3 mt-3">
									<button
										onClick={() => {
											setProductToDelete(item.productID);
											setIsDeleteConfirmVisible(true);
										}}
										className="rounded-lg bg-red-100 p-2 text-red-600"
									>
										<FaRegTrashCan />
									</button>
									<button
										onClick={() =>
											navigate("/admin/update-product", {
												state: item,
											})
										}
										className="rounded-lg bg-accent/10 p-2 text-accent"
									>
										<FaRegEdit />
									</button>
								</div>
							</div>
						</div>
					))
				)}
			</div>

			<div className="hidden sm:flex flex-1 rounded-2xl bg-white shadow border border-secondary/10 overflow-hidden">
				<div className="w-full overflow-x-auto overflow-y-auto">
					{isLoading ? (
						<div className="flex h-full items-center justify-center">
							<Loader />
						</div>
					) : (
						<table className="w-full min-w-[900px] text-left text-sm">
							<thead className="sticky top-0 bg-secondary text-white">
								<tr>
									<th className="px-4 py-3 text-xs uppercase">Image</th>
									<th className="px-4 py-3 text-xs uppercase">Product ID</th>
									<th className="px-4 py-3 text-xs uppercase">Name</th>
									<th className="px-4 py-3 text-xs uppercase">Price</th>
									<th className="px-4 py-3 text-xs uppercase hidden sm:table-cell">
										Labelled
									</th>
									<th className="px-4 py-3 text-xs uppercase">Stock</th>
									<th className="px-4 py-3 text-xs uppercase hidden md:table-cell">
										Category
									</th>
									<th className="px-4 py-3 text-xs uppercase text-center">
										Actions
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-secondary/10">
								{products.map((item) => (
									<tr key={item.productID} className="hover:bg-accent/5">
										<td className="px-4 py-3">
											<img
												src={item.images?.[0]}
												alt={item.name}
												className="h-14 w-14 rounded-lg object-cover"
											/>
										</td>
										<td className="px-4 py-3 font-mono">
											{item.productID}
										</td>
										<td className="px-4 py-3 font-medium">
											{item.name}
										</td>
										<td className="px-4 py-3">LKR {item.price}</td>
										<td className="px-4 py-3 line-through hidden sm:table-cell">
											LKR {item.labelledPrice}
										</td>
										<td className="px-4 py-3">{item.stock}</td>
										<td className="px-4 py-3 hidden md:table-cell">
											<span className="rounded-full bg-accent/10 px-2 py-1 text-xs text-accent">
												{item.category}
											</span>
										</td>
										<td className="px-4 py-3 text-center">
											<div className="flex justify-center gap-3">
												<FaRegTrashCan
													className="cursor-pointer text-red-600"
													onClick={() => {
														setProductToDelete(item.productID);
														setIsDeleteConfirmVisible(true);
													}}
												/>
												<FaRegEdit
													className="cursor-pointer text-accent"
													onClick={() =>
														navigate("/admin/update-product", {
															state: item,
														})
													}
												/>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</div>
	);
}
