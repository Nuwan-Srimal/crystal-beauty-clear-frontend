import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import UserData from "./userData";
import UserDataMobile from "./userDataMobile";
import MobileNav from "./mobileNavigation";

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-center h-8 leading-none"
    >
      {children}
    </Link>
  );
}

function Divider() {
  return <div className="w-px scale-120 h-8 bg-accent" />;
}

export default function Header() {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header
      className="w-full h-[96px] bg-accent text-white sticky top-0 z-50 shadow-md"
      role="banner"
    >
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 grid grid-cols-3 items-center">
        <div className="flex items-center">
          <button
            className="lg:hidden text-3xl"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <MdMenu />
          </button>

          <Link to="/" className="hidden lg:flex items-center">
            <img
              src="/logo.png"
              className="h-[100px] -ml-[25px] scale-180 object-contain"
              alt="CBC logo"
            />
          </Link>
        </div>
        {/* mobile logo */}
        <div className="flex justify-center items-center">
          <Link to="/" className="lg:hidden">
            <img
              src="/logo.png"
              className="h-[100px] object-contain"
              alt="CBC logo"
            />
          </Link>

          <nav className="hidden lg:flex -ml-20 items-center gap-10 rounded-full bg-primary/80 text-black px-6 py-2 text-xl font-medium">
            <NavLink to="/">Home</NavLink>
            <Divider />
            <NavLink to="/products">Products</NavLink>
            <Divider />
            <NavLink to="/about">About</NavLink>
            <Divider />
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>

        <div className="flex items-center justify-end gap-3">
          {/*desktop*/}
          <div className="hidden lg:block w-[240px]">
            <UserData />
          </div>

          {/*mobile userprofile*/}
          <div className="lg:hidden">
            <UserDataMobile />
          </div>

          <Link
            to="/cart"
            className="hidden lg:flex text-3xl p-2 rounded-full hover:bg-white/10 transition mr-[-45px]"
            aria-label="View cart"
          >
            <BsCart3 />
          </Link>
        </div>
      </div>

      {isSideBarOpen && (
        <div className="fixed inset-0 bg-black/60 z-[110]">
          <MobileNav onClose={() => setIsSidebarOpen(false)} />
        </div>
      )}
    </header>
  );
}
