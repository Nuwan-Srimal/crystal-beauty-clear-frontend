import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function UserDataMobile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token != null) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="relative flex items-center">
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-[120] bg-black/40 flex items-center justify-center">
          <div className="w-[280px] bg-primary rounded-xl p-5 shadow-xl">
            <p className="text-center text-secondary mb-5">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-3">
              <button
                className="flex-1 bg-accent text-white py-2 rounded-lg"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>

              <button
                className="flex-1 border border-secondary/30 py-2 rounded-lg"
                onClick={() => setIsLogoutConfirmOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="w-5 h-5 border-2 border-white border-b-transparent rounded-full animate-spin" />
      )}

      {/* LOGGED IN */}
      {user && (
        <div className="relative">
          {/* PROFILE ICON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-white bg-primary"
            aria-label="Profile menu"
          >
            <img src={user.image} alt="profile" className="w-full h-full object-cover" />
          </button>

          {/* DROPDOWN MENU */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-[160px] bg-primary rounded-lg shadow-xl overflow-hidden z-50">
              
              {/* ACCOUNT → SETTINGS */}
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-black hover:bg-secondary/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>

              {/* ORDERS */}
              <Link
                to="/orders"
                className="block px-4 py-2 text-sm text-black hover:bg-secondary/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>

              {/* LOGOUT */}
              <button
                className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-500/10"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLogoutConfirmOpen(true);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* NOT LOGGED IN */}
      {!loading && !user && (
        <Link to="/login" className="text-white text-2xl" aria-label="Login">
          <FaUserCircle />
        </Link>
      )}
    </div>
  );
}
