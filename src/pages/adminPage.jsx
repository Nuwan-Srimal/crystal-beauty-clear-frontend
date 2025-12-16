import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import AdminProductPage from "./admin/adminProductPage";
import AddProductPage from "./admin/adminAddNewProduct";
import UpdateProductPage from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import AdminUsersPage from "./admin/usersPage";
import AdminDashboard from "./admin/adminDashboard";
import { HiOutlineHome } from "react-icons/hi";


export default function AdminPage() {
  const navigate = useNavigate();
  const [userLoaded, setUserLoaded] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState("user");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login to access admin panel");
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.role !== "admin") {
          toast.error("You are not authorized to access admin panel");
          navigate("/");
          return;
        }

        const name =
          res.data.username ||
          res.data.firstName ||
          (res.data.email ? res.data.email.split("@")[0] : "user");

        const image =
          res.data.profileImage ||
          res.data.avatar ||
          res.data.image ||
          null;

        setUserName(name);
        setProfileImage(image);
        setUserLoaded(true);
      })
      .catch(() => {
        toast.error("Session expired. Please login again");
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  return (
    <div className="w-full h-screen bg-accent/40 flex flex-col lg:flex-row gap-4 p-3 sm:p-4 text-secondary overflow-hidden">

      {/* Sidebar */}
      <div className="w-full lg:w-[280px] bg-white/70 rounded-2xl shadow-lg p-4 flex flex-col">
        <div className="flex items-center gap-3 bg-accent rounded-xl p-3 mb-6">
          <img src="/logo.png" alt="CBC" className="h-10" />
          <span className="text-white text-base sm:text-lg font-semibold">
            Admin Panel
          </span>
        </div>
        
        <nav className="flex lg:flex-col flex-row lg:gap-2 gap-1 text-sm font-medium overflow-x-auto lg:overflow-visible">
          <NavItem to="/" icon={<HiOutlineHome />} label="Home" />
          <NavItem to="/admin" icon={<FaChartLine />} label="Dashboard" />
          <NavItem to="/admin/orders" icon={<MdShoppingCartCheckout />} label="Orders" />
          <NavItem to="/admin/products" icon={<BsBox2Heart />} label="Products" />
          <NavItem to="/admin/users" icon={<HiOutlineUsers />} label="Users" />
        </nav>

        <div className="hidden lg:block mt-auto text-xs text-secondary/50 text-center pt-6">
          © Crystal Beauty Clear
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white/70 rounded-2xl shadow-lg overflow-hidden flex flex-col">

        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-secondary/10">
          <h1 className="text-lg sm:text-xl font-semibold">
            Admin Dashboard
          </h1>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3"
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shadow"
                />
              ) : (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold shadow">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold">{userName}</span>
                <span className="text-xs text-secondary/60">
                  Administrator
                </span>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border z-50">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-accent/10 rounded-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {userLoaded ? (
            <Routes path="/">
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/products" element={<AdminProductPage />} />
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="/update-product" element={<UpdateProductPage />} />
              <Route path="/users" element={<AdminUsersPage />} />
            </Routes>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl
      hover:bg-accent/10 hover:text-accent transition whitespace-nowrap"
    >
      <span className="text-lg">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
