import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const formatLKR = (n) =>
	new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }).format(
		n ?? 0
	);

const statusBadgeClass = (status) => {
	const base =
		"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
	switch ((status || "").toLowerCase()) {
		case "paid":
		case "completed":
			return `${base} bg-green-500/10 text-green-600`;
		case "shipped":
		case "processing":
			return `${base} bg-blue-500/10 text-blue-600`;
		case "cancelled":
		case "canceled":
			return `${base} bg-red-500/10 text-red-600`;
		default:
			return `${base} bg-accent/10 text-accent`;
	}
};

export default function OrderModal({
	isModalOpen,
	selectedOrder,
	closeModal,
	refresh,
}) {
    const [status,setStatus] = useState(selectedOrder?.status);
	if (!isModalOpen || !selectedOrder) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50"
			onClick={closeModal}
		>
			<div
				className="relative w-[92vw] max-w-3xl rounded-2xl border border-secondary/10 bg-primary shadow-xl"
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
			>
				{/* Header */}
				<div className="flex items-start justify-between gap-4 border-b border-secondary/10 px-6 py-4">
					<div className="space-y-1">
						<h2 className="text-lg font-semibold text-secondary">
							Order #{selectedOrder.orderID}
						</h2>
						<div className="flex items-center gap-2 text-xs text-secondary/60">
							<span className={statusBadgeClass(selectedOrder.status)}>
								{selectedOrder.status}
							</span>
							<span>•</span>
							<span>
								{new Date(selectedOrder.date).toLocaleString(undefined, {
									year: "numeric",
									month: "short",
									day: "2-digit",
									hour: "2-digit",
									minute: "2-digit",
								})}
							</span>
						</div>
					</div>

					<button
						onClick={closeModal}
						className="rounded-xl border border-secondary/10 px-2.5 py-1.5 text-secondary/70 hover:bg-accent/10 hover:text-secondary transition"
						aria-label="Close"
					>
						✕
					</button>
				</div>

				{/* Body */}
				<div className="max-h-[70vh] overflow-y-auto px-6 py-5">
					{/* Summary */}
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-secondary/5">
							<h3 className="mb-3 text-sm font-semibold text-secondary">
								Customer
							</h3>
							<dl className="space-y-2 text-sm">
								<div className="flex justify-between">
									<dt className="text-secondary/60">Name</dt>
									<dd className="font-medium text-secondary">
										{selectedOrder.customerName}
									</dd>
								</div>
								<div className="flex justify-between">
									<dt className="text-secondary/60">Email</dt>
									<dd className="font-medium text-secondary">
										{selectedOrder.email}
									</dd>
								</div>
								<div className="flex justify-between">
									<dt className="text-secondary/60">Phone</dt>
									<dd className="font-medium text-secondary">
										{selectedOrder.phone}
									</dd>
								</div>
								<div className="flex items-start justify-between">
									<dt className="text-secondary/60">Address</dt>
									<dd className="max-w-[60%] text-right font-medium text-secondary">
										{selectedOrder.address}
									</dd>
								</div>
							</dl>
						</div>

						<div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-secondary/5">
							<h3 className="mb-3 text-sm font-semibold text-secondary">
								Payment
							</h3>
							<dl className="space-y-2 text-sm">
								<div className="flex justify-between">
									<dt className="text-secondary/60">Items</dt>
									<dd className="font-medium text-secondary">
										{selectedOrder.items?.length ?? 0}
									</dd>
								</div>
								<div className="flex justify-between">
									<dt className="text-secondary/60">Total</dt>
									<dd className="font-semibold text-secondary">
										{formatLKR(selectedOrder.total)}
									</dd>
								</div>
							</dl>
						</div>
					</div>

					{/* Items */}
					<div className="mt-5 rounded-xl bg-white shadow-sm ring-1 ring-secondary/5">
						<div className="border-b border-secondary/10 px-4 py-3 text-sm font-semibold text-secondary">
							Line Items
						</div>
						<ul className="divide-y divide-secondary/10">
							{selectedOrder.items?.map((it) => {
								const lineTotal = (it.quantity ?? 0) * (it.price ?? 0);
								return (
									<li
										key={it.productID}
										className="flex items-center gap-4 px-4 py-3"
									>
										<img
											src={it.image}
											alt={it.name}
											className="h-14 w-14 flex-none rounded-xl object-cover ring-1 ring-secondary/10"
										/>
										<div className="min-w-0 flex-1">
											<div className="flex items-baseline justify-between gap-4">
												<p className="truncate font-medium text-secondary">
													{it.name}
												</p>
												<p className="text-sm text-secondary/70">
													{formatLKR(it.price)}
												</p>
											</div>
											<div className="mt-1 flex items-center justify-between text-xs text-secondary/60">
												<span className="font-mono">PID: {it.productID}</span>
												<span>Qty: {it.quantity}</span>
												<span className="font-semibold text-secondary">
													{formatLKR(lineTotal)}
												</span>
											</div>
										</div>
									</li>
								);
							})}
							{!selectedOrder.items?.length && (
								<li className="px-4 py-6 text-center text-sm text-secondary/60">
									No items.
								</li>
							)}
						</ul>
					</div>
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between gap-3 border-t border-secondary/10 px-6 py-4">
					<span className="text-sm text-secondary/60">
						{selectedOrder.items?.length ?? 0} items •{" "}
						{formatLKR(selectedOrder.total)}
					</span>
					<select
						defaultValue={selectedOrder.status}
                        onChange={(e)=>setStatus(e.target.value)}
						className="
    w-full rounded-xl border border-secondary/20 bg-white 
    px-3 py-2 text-sm text-secondary shadow-sm
    focus:border-accent focus:ring-2 focus:ring-accent/20 
    transition
  "
					>
						<option value="processing">Processing</option>
						<option value="shipped">Shipped</option>
						<option value="completed">Completed</option>
						<option value="cancelled">Cancelled</option>
						<option value="refunded">Refunded</option>
						<option value="pending">Pending</option>
					</select>

					<div className="flex items-center gap-2">
						<button
                            onClick={()=>{
                                const token = localStorage.getItem("token");
                                axios.put(
                                    `${import.meta.env.VITE_API_URL}/api/orders/status/${selectedOrder.orderID}`,
                                    { status : status },
                                    { headers: { Authorization: `Bearer ${token}` } }
                                )
                                .then(() => {
                                    toast.success("Order status updated");
                                    closeModal();
                                    refresh();
                                })
                                .catch((err) => {
                                    console.error(err);
                                    toast.error("Failed to update order status");
                                });
                            }}
							disabled={status == selectedOrder.status}
							className="rounded-2xl bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
						>
							Update
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}