import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-auto bg-secondary text-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Crystal Beauty Clear</h3>
                        <p className="text-white/70 text-sm">
                            Your trusted partner for premium beauty and skincare products in Sri Lanka.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li><Link to="/products" className="hover:text-accent transition">Shop</Link></li>
                            <li><Link to="/about" className="hover:text-accent transition">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-accent transition">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Customer Service</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li><a href="#" className="hover:text-accent transition">Delivery Info</a></li>
                            <li><a href="#" className="hover:text-accent transition">Return Policy</a></li>
                            <li><a href="#" className="hover:text-accent transition">FAQs</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>📧 info@crystalbeauty.lk</li>
                            <li>📞 +94 11 234 5678</li>
                            <li>📍 Colombo, Sri Lanka</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/20 pt-8 text-center text-sm text-white/60">
                    <p>© {new Date().getFullYear()} Crystal Beauty Clear — All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}