import { Link } from "react-router-dom";
import UserDataMobile from "./userDataMobile";
import { MdMenu } from "react-icons/md";

export default function MobileNav({ onClose }) {
  return (
    <div className="w-[280px] max-w-[80%] bg-primary h-full flex flex-col">

      <div className="h-[96px] bg-accent flex items-center justify-center relative">
        <button
          className="absolute left-4 text-white text-3xl"
          onClick={onClose}
          aria-label="Close menu"
        >
         <MdMenu></MdMenu>
        </button>

        <img src="/logo.png" className="h-[100px] object-contain" alt="CBC logo" />
      </div>
      <nav className="flex-1 text-secondary">
        <Link to="/" className="block px-6 py-5 border-b border-secondary/10 text-lg" onClick={onClose}>
          Home
        </Link>

        <Link to="/products" className="block px-6 py-5 border-b border-secondary/10 text-lg" onClick={onClose}>
          Products
        </Link>

        <Link to="/about" className="block px-6 py-5 border-b border-secondary/10 text-lg" onClick={onClose}>
          About
        </Link>

        <Link to="/contact" className="block px-6 py-5 border-b border-secondary/10 text-lg" onClick={onClose}>
          Contact
        </Link>

        <Link to="/cart" className="block px-6 py-5 border-b border-secondary/10 text-lg" onClick={onClose}>
          Cart
        </Link>
      </nav>

      <div className="p-6 border-t border-secondary/10">
        <UserDataMobile />
      </div>
    </div>
  );
}
