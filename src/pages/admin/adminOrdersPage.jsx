import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderModal from "../../components/orderInfoModal";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoading) {
			const token = localStorage.getItem("token");
			if (token == null) {
				navigate("/login");
				return;
			}
			axios
				.get(import.meta.env.VITE_API_URL + "/api/orders", {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((response) => {
					setOrders(response.data);
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	const filteredOrders = useMemo(() => {
		if (!search) return orders;
		const q = search.toLowerCase();
		return orders.filter(
			(o) =>
				o.orderID.toLowerCase().includes(q) ||
				o.customerName.toLowerCase().includes(q) ||
				o.email.toLowerCase().includes(q) ||
				o.phone.toLowerCase().includes(q) ||
				o.status.toLowerCase().includes(q)
		);
	}, [search, orders]);

	return (
		<div className="w-full h-full flex flex-col">

			<OrderModal
				isModalOpen={isModalOpen}
				closeModal={() => setIsModalOpen(false)}
				selectedOrder={selectedOrder}
				refresh={() => setIsLoading(true)}
			/>
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
				<div>
					<h1 className="text-2xl font-semibold text-secondary">
						Orders
					</h1>
					<p className="text-sm text-secondary/60">
						Manage customer orders
					</p>
				</div>

				<input
					type="text"
					placeholder="Search orders..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full md:w-[320px] rounded-xl border border-secondary/20 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
				/>
			</div>

			<div className="flex-1 bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-y-auto">
				<div className="border-b border-secondary/10 px-6 py-3 text-sm text-secondary">
					Showing {filteredOrders.length} of {orders.length} orders
				</div>

				<div className="h-full overflow-auto">
					{isLoading ? (
						<div className="flex justify-center items-center h-full">
							<Loader />
						</div>
					) : (
						<table className="w-full min-w-[1000px] text-left text-sm">
							<thead className="sticky top-0 z-10 bg-secondary text-white">
								<tr>
									<th className="px-4 py-3 text-xs font-semibold uppercase">
										Order ID
									</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">
										Items
									</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">
										Customer
									</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">
										Email
									</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">
										Phone
									</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">
										Address
									</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">
										Total
									</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase text-center">
										Status
									</th>
									<th className="px-4 py-3 text-xs font-semibold uppercase">
										Date
									</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-secondary/10">
								{filteredOrders.map((item) => (
									<tr
										key={item.orderID}
										onClick={() => {
											setSelectedOrder(item);
											setIsModalOpen(true);
										}}
										className="cursor-pointer hover:bg-accent/5 transition"
									>
										<td className="px-4 py-3 font-mono">
											{item.orderID}
										</td>
										<td className="px-4 py-3">
											{item.items.length} items
										</td>
										<td className="px-4 py-3 font-medium">
											{item.customerName}
										</td>
										<td className="px-4 py-3 text-secondary/70">
											{item.email}
										</td>
										<td className="px-4 py-3 text-secondary/70">
											{item.phone}
										</td>
										<td className="px-4 py-3 max-w-[260px] truncate">
											{item.address}
										</td>
										<td className="px-4 py-3 font-semibold">
											LKR {item.total.toFixed(2)}
										</td>
										<td className="px-4 py-3 text-center">
											<StatusBadge status={item.status} />
										</td>
										<td className="px-4 py-3 text-secondary/70">
											{new Date(item.date).toLocaleDateString()}
										</td>
									</tr>
								))}

								{filteredOrders.length === 0 && (
									<tr>
										<td
											colSpan={9}
											className="py-12 text-center text-secondary/60"
										>
											No matching orders found.
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


function StatusBadge({ status }) {
	const base =
		"inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";

	if (status === "Pending")
		return <span className={`${base} bg-yellow-100 text-yellow-700`}>Pending</span>;

	if (status === "Completed")
		return <span className={`${base} bg-green-100 text-green-700`}>Completed</span>;

	if (status === "Cancelled")
		return <span className={`${base} bg-red-100 text-red-700`}>Cancelled</span>;

	return (
		<span className={`${base} bg-secondary/10 text-secondary`}>
			{status}
		</span>
	);
}
