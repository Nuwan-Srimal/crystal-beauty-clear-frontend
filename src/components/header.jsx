import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import UserData from "./userData";
import UserDataMobile from "./userDataMobile";

export default function Header() {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header
      className="w-full bg-gradient-to-r from-accent/95 to-accent/80 text-white h-[96px] px-6 lg:px-10 sticky top-0 z-50 backdrop-blur-sm shadow-md"
      role="banner"
    >
      <div className="max-w-7xl mx-auto h-full flex items-center relative">
        {/* Desktop logo */}
        <img
          src="/logo.png"
          className="hidden lg:block h-[180px] w-[170px] object-contain absolute left"
          alt="Site logo"
        />

        {/* Mobile Logo*/}
        <div className="lg:hidden w-full flex items-center justify-center relative">
          <MdMenu
            className="absolute left-4 text-3xl cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
            role="button"
            tabIndex={0}
          />
          <img
            src="/logo.png"
            className="h-[64px] w-[160px] object-contain"
            alt="Site logo"
          />
        </div>

        {/* Sidebar mobile */}
        {isSideBarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-[110] text-secondary"
            aria-hidden={false}
          >
            {/* Sidebar panel */}
            <div className="w-[300px] max-w-[80%] bg-primary h-full flex flex-col relative transform translate-x-0 transition-transform duration-300 ease-out">
              {/* Mobile header sidebar */}
              <div className="lg:hidden h-[96px] w-full bg-accent flex items-center justify-center relative px-4">
                <MdMenu
                  className="absolute left-3 text-white text-3xl cursor-pointer"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close menu"
                />
                <img
                  src="/logo.png"
                  className="h-[64px] w-[150px] object-contain"
                  alt="Site logo"
                />
              </div>

              <nav className="mt-4 flex-1 overflow-auto" aria-label="Mobile navigation">
                <a href="/" className="block p-4 border-b border-secondary/10 hover:bg-accent/10">
                  Home
                </a>
                <a href="/products" className="block p-4 border-b border-secondary/10 hover:bg-accent/10">
                  Products
                </a>
                <a href="/about" className="block p-4 border-b border-secondary/10 hover:bg-accent/10">
                  About
                </a>
                <a href="/contact" className="block p-4 border-b border-secondary/10 hover:bg-accent/10">
                  Contact
                </a>
                <a href="/cart" className="block p-4 border-b border-secondary/10 hover:bg-accent/10">
                  Cart
                </a>
              </nav>

              <div className="lg:hidden absolute bottom-6 left-0 w-full flex justify-center items-center gap-4 px-6">
                <UserDataMobile />
              </div>
            </div>
          </div>
        )}

        <div className="hidden lg:flex h-full w-full items-center justify-center text-lg gap-8">
          <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-white/30 rounded">
            Home
          </Link>
          <Link to="/products" className="focus:outline-none focus:ring-2 focus:ring-white/30 rounded">
            Products
          </Link>
          <Link to="/about" className="focus:outline-none focus:ring-2 focus:ring-white/30 rounded">
            About
          </Link>
          <Link to="/contact" className="focus:outline-none focus:ring-2 focus:ring-white/30 rounded">
            Contact
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4 absolute right-6 top-0 h-full">
          <div className="flex items-center justify-end w-[240px]">
            <UserData />
          </div>

          <Link
            to="/cart"
            className="h-full flex items-center justify-center text-3xl p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
            aria-label="View cart"
            title="Cart"
          >
            <BsCart3 />
          </Link>
        </div>
      </div>
    </header>
  );
}
