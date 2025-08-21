import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get(import.meta.env.VITE_API_URL + "/api/products")
			.then((response) => {
				console.log(response.data);
				setProducts(response.data);
			});
	}, []);

	return (
		<div className="w-full min-h-full">
			<Link to="/admin/add-product"  className="fixed right-[50px] bottom-[50px] text-5xl hover:text-accent">
                <CiCirclePlus  />
            </Link>
            {/* Page container */}
			<div className="mx-auto max-w-7xl p-6">
				{/* Card */}
				<div className="rounded-2xl border border-secondary/10 bg-primary shadow-sm">
					{/* Header bar */}
					<div className="flex items-center justify-between gap-4 border-b border-secondary/10 px-6 py-4">
						<h1 className="text-lg font-semibold text-secondary">Products</h1>
						<span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
							{products.length} items
						</span>
					</div>

					{/* Table wrapper for responsive scrolling */}
					<div className="overflow-x-auto">
						<table className="w-full min-w-[880px] text-left">
							<thead className="bg-secondary text-white">
								<tr>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
										Image
									</th>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
										Product ID
									</th>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
										Product Name
									</th>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
										Product Price
									</th>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
										Labelled Price
									</th>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide">
										Category
									</th>
									<th className="sticky top-0 z-10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-center">
										Actions
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-secondary/10">
								{products.map((item) => {
									return (
										<tr
											key={item.productID}
											className="odd:bg-white even:bg-primary hover:bg-accent/5 transition-colors"
										>
											<td className="px-4 py-3">
												<img
													src={item.images?.[0]}
													alt={item.name}
													className="h-16 w-16 rounded-lg object-cover ring-1 ring-secondary/15"
												/>
											</td>
											<td className="px-4 py-3 font-mono text-sm text-secondary/80">
												{item.productID}
											</td>
											<td className="px-4 py-3 font-medium text-secondary">
												{item.name}
											</td>
											<td className="px-4 py-3 text-secondary/90">
												<span className="rounded-md bg-secondary/5 px-2 py-1 text-sm">
													LKR {item.price}
												</span>
											</td>
											<td className="px-4 py-3 text-secondary/70">
												<span className="text-sm line-through">
													LKR {item.labelledPrice}
												</span>
											</td>
											<td className="px-4 py-3">
												<span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
													{item.category}
												</span>
											</td>
											<td className="px-4 py-3">
												<div className="flex items-center justify-center gap-3">
													<FaRegTrashCan
														className="cursor-pointer rounded-lg p-2 text-secondary/70 ring-1 ring-secondary/10 hover:bg-accent/10 hover:text-accent transition"
														size={36}
														title="Delete"
														aria-label="Delete product"
													/>
													<FaRegEdit
														className="cursor-pointer rounded-lg p-2 text-secondary/70 ring-1 ring-secondary/10 hover:bg-accent/10 hover:text-accent transition"
														size={36}
														title="Edit"
														aria-label="Edit product"
													/>
												</div>
											</td>
										</tr>
									);
								})}
								{products.length === 0 && (
									<tr>
										<td
											className="px-4 py-12 text-center text-secondary/60"
											colSpan={7}
										>
											No products to display.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}