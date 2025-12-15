import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";

function ProductDeleteConfirm(props) {
	const productID = props.productID;
	const close = props.close;
	const refresh = props.refresh;

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
			.catch(() => {
				toast.error("Failed to delete product");
			});
	}

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
			<div className="w-[420px] rounded-2xl bg-white p-6 shadow-xl">
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
				.then((response) => {
					setProducts(response.data);
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	return (
		<div className="w-full h-full flex flex-col overflow-hidden">

			{isDeleteConfirmVisible && (
				<ProductDeleteConfirm
					refresh={() => setIsLoading(true)}
					productID={productToDelete}
					close={() => setIsDeleteConfirmVisible(false)}
				/>
			)}

			<Link
				to="/admin/add-product"
				className="fixed right-8 bottom-8 z-50 rounded-full bg-accent p-3 text-white shadow-lg hover:scale-105 transition"
				title="Add Product"
			>
				<CiCirclePlus size={34} />
			</Link>

			<div className="flex items-center justify-between mb-4">
				<div>
					<h1 className="text-2xl font-semibold text-secondary">
						Products
					</h1>
					<p className="text-sm text-secondary/60">
						Manage your store products
					</p>
				</div>

				<span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
					{products.length} items
				</span>
			</div>

			<div className="flex-1 rounded-2xl bg-white shadow border border-secondary/10 overflow-hidden">

				<div className="h-full overflow-x-auto overflow-y-auto">
					{isLoading ? (
						<div className="flex h-full items-center justify-center">
							<Loader />
						</div>
					) : (
						<table className="w-full min-w-[1000px] text-left text-sm">
							<thead className="sticky top-0 z-10 bg-secondary text-white">
								<tr>
									<th className="px-4 py-3 text-xs font-semibold uppercase">Image</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">Product ID</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">Name</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">Price</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">Labelled</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">Stock</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">Category</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase text-center">Actions</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-secondary/10">
								{products.map((item) => (
									<tr
										key={item.productID}
										className="hover:bg-accent/5 transition"
									>
										<td className="px-4 py-3">
											<img
												src={item.images?.[0]}
												alt={item.name}
												className="h-14 w-14 rounded-lg object-cover ring-1 ring-secondary/15"
											/>
										</td>
										<td className="px-4 py-3 font-mono text-secondary/80">
											{item.productID}
										</td>
										<td className="px-4 py-3 font-medium">
											{item.name}
										</td>
										<td className="px-4 py-3">
											LKR {item.price}
										</td>
										<td className="px-4 py-3 text-secondary/60 line-through">
											LKR {item.labelledPrice}
										</td>
										<td className="px-4 py-3">
											{item.stock}
										</td>
										<td className="px-4 py-3">
											<span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
												{item.category}
											</span>
										</td>
										<td className="px-4 py-3">
											<div className="flex justify-center gap-3">
												<FaRegTrashCan
													size={34}
													className="cursor-pointer rounded-lg p-2 text-secondary/70 ring-1 ring-secondary/10 hover:bg-red-50 hover:text-red-600 transition"
													onClick={() => {
														setProductToDelete(item.productID);
														setIsDeleteConfirmVisible(true);
													}}
												/>
												<FaRegEdit
													size={34}
													className="cursor-pointer rounded-lg p-2 text-secondary/70 ring-1 ring-secondary/10 hover:bg-accent/10 hover:text-accent transition"
													onClick={() => {
														navigate("/admin/update-product", {
															state: item,
														});
													}}
												/>
											</div>
										</td>
									</tr>
								))}

								{products.length === 0 && (
									<tr>
										<td
											colSpan={8}
											className="py-12 text-center text-secondary/60"
										>
											No products to display.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</div>
	);
}
