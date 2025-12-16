import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderModal from "../../components/orderInfoModal";

/* ================= ORDERS PAGE ================= */

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
      if (!token) {
        navigate("/login");
        return;
      }
      axios
        .get(import.meta.env.VITE_API_URL + "/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setOrders(res.data);
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
    <div className="w-full h-full flex flex-col overflow-hidden">

      {/* Order Modal */}
      <OrderModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        selectedOrder={selectedOrder}
        refresh={() => setIsLoading(true)}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-secondary">
            Orders
          </h1>
          <p className="text-xs sm:text-sm text-secondary/60">
            Manage customer orders
          </p>
        </div>

        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[320px] rounded-xl border border-secondary/20 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="mb-2 text-xs sm:text-sm text-secondary/60">
        Showing {filteredOrders.length} of {orders.length} orders
      </div>

      {/* ================= MOBILE VIEW (CARDS) ================= */}
      <div className="sm:hidden space-y-3 overflow-y-auto">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          filteredOrders.map((item) => (
            <div
              key={item.orderID}
              onClick={() => {
                setSelectedOrder(item);
                setIsModalOpen(true);
              }}
              className="rounded-2xl bg-white shadow border border-secondary/10 p-4 cursor-pointer hover:bg-accent/5 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-mono text-secondary/60">
                    {item.orderID}
                  </p>
                  <h3 className="font-semibold text-secondary">
                    {item.customerName}
                  </h3>
                </div>
                <StatusBadge status={item.status} />
              </div>

              <div className="mt-2 text-xs text-secondary/60 break-all">
                {item.email}
              </div>

              <div className="mt-3 flex justify-between items-center text-sm">
                <span>{item.items.length} items</span>
                <span className="font-semibold">
                  LKR {item.total.toFixed(2)}
                </span>
              </div>

              <div className="mt-1 text-[11px] text-secondary/50">
                {new Date(item.date).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= DESKTOP VIEW (TABLE) ================= */}
      <div className="hidden sm:flex flex-1 bg-white rounded-2xl shadow-lg border border-secondary/10 overflow-hidden">
        <div className="w-full overflow-x-auto overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          ) : (
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="sticky top-0 z-10 bg-secondary text-white">
                <tr>
                  <th className="px-4 py-3 text-xs uppercase">Order ID</th>
                  <th className="px-4 py-3 text-xs uppercase">Items</th>
                  <th className="px-4 py-3 text-xs uppercase">Customer</th>
                  <th className="px-4 py-3 text-xs uppercase hidden sm:table-cell">
                    Email
                  </th>
                  <th className="px-4 py-3 text-xs uppercase hidden md:table-cell">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-xs uppercase hidden lg:table-cell">
                    Address
                  </th>
                  <th className="px-4 py-3 text-xs uppercase">Total</th>
                  <th className="px-4 py-3 text-xs uppercase text-center">
                    Status
                  </th>
                  <th className="px-4 py-3 text-xs uppercase hidden sm:table-cell">
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
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {item.email}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {item.phone}
                    </td>
                    <td className="px-4 py-3 truncate hidden lg:table-cell max-w-[260px]">
                      {item.address}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      LKR {item.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
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

/* ================= STATUS BADGE ================= */

function StatusBadge({ status }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold";

  if (status === "Pending")
    return (
      <span className={`${base} bg-yellow-100 text-yellow-700`}>
        Pending
      </span>
    );

  if (status === "Completed")
    return (
      <span className={`${base} bg-green-100 text-green-700`}>
        Completed
      </span>
    );

  if (status === "Cancelled")
    return (
      <span className={`${base} bg-red-100 text-red-700`}>
        Cancelled
      </span>
    );

  return (
    <span className={`${base} bg-accent/70 text-black`}>
      {status}
    </span>
  );
}
