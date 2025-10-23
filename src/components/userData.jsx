import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Click-outside to close menu
  useEffect(() => {
    function onDocClick(e) {
      if (!menuOpen) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    function onEsc(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [menuOpen]);

  const initials =
    user?.firstName || user?.lastName
      ? `${(user?.firstName ?? "")[0] ?? ""}${(user?.lastName ?? "")[0] ?? ""}`.toUpperCase()
      : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setMenuOpen(false);
    window.location.href = "/login";
  };

  return (
    <div className="w-full flex items-center justify-center">
      {/* Loading state */}
      {loading && (
        <div
          className="h-9 w-9 rounded-full border-2 border-primary border-b-transparent animate-spin"
          role="status"
          aria-label="Loading"
        />
      )}

      {/* Logged-out CTA */}
      {!loading && !user && (
        <a
          href="/login"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          Login
        </a>
      )}

      {/* Logged-in menu */}
      {user && (
        <div className="relative flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-full bg-primary/80 px-3 py-1.5 shadow-sm ring-1 ring-secondary/10">
            {/* Avatar */}
            {user.image ? (
              <img
                src={user.image}
                alt={`${user.firstName ?? "User"} avatar`}
                className="h-9 w-9 rounded-full ring-2 ring-accent/50 object-cover"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-accent text-white ring-2 ring-accent/50 flex items-center justify-center text-sm font-bold">
                {initials}
              </div>
            )}

            {/* Name + role (optional) */}
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-secondary">
                {user.firstName ?? "User"}
              </span>
              {user.role && (
                <span className="text-[11px] text-secondary/70">{user.role}</span>
              )}
            </div>

            {/* Menu button */}
            <button
              ref={btnRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-secondary/80 hover:bg-secondary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setMenuOpen(true);
                  // focus first item after opening (next tick)
                  setTimeout(() => {
                    const first = menuRef.current?.querySelector("button[data-menu-item]");
                    first?.focus();
                  }, 0);
                }
              }}
              title="Open menu"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0 5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
              </svg>
            </button>
          </div>

          {/* Dropdown */}
          {menuOpen && (
            <div
              ref={menuRef}
              role="menu"
              aria-label="User menu"
              className="absolute right-0 top-12 z-50 w-56 origin-top-right rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-secondary/10 animate-in fade-in zoom-in duration-100"
            >
              <MenuItem
                onClick={() => (window.location.href = "/settings")}
                label="Account Settings"
              />
              <MenuItem
                onClick={() => (window.location.href = "/orders")}
                label="Orders"
              />
              <div className="my-1 h-px bg-secondary/10" />
              <MenuItem
                destructive
                onClick={handleLogout}
                label="Logout"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MenuItem({ label, onClick, destructive = false }) {
  return (
    <button
      data-menu-item
      onClick={onClick}
      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
        destructive
          ? "text-red-600 hover:bg-red-50"
          : "text-secondary hover:bg-primary"
      }`}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          const next = e.currentTarget.parentElement?.querySelectorAll("[data-menu-item]");
          if (!next) return;
          const items = Array.from(next);
          const idx = items.indexOf(e.currentTarget);
          items[(idx + 1) % items.length]?.focus();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          const next = e.currentTarget.parentElement?.querySelectorAll("[data-menu-item]");
          if (!next) return;
          const items = Array.from(next);
          const idx = items.indexOf(e.currentTarget);
          items[(idx - 1 + items.length) % items.length]?.focus();
        }
      }}
    >
      {label}
    </button>
  );
}