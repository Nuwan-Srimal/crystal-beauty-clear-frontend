import { Route, Routes, Link } from "react-router-dom";
import Header from "../components/header";
import { ProductPage } from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import AboutPage from "./about";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen bg-primary flex flex-col">
            {/* HEADER */}
            <Header />

            {/* CONTENT WRAPPER */}
            <div className="w-full">
                <Routes path="/">
                    {/* HOME SECTION */}
                    <Route
                        path="/"
                        element={
                            <div className="w-full">
                                {/* HERO SECTION */}
                                <div className="w-full px-4 py-16 md:py-24">
                                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                        {/* LEFT CONTENT */}
                                        <div>
                                            <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold text-secondary mb-6">
                                                Glow Inside Out {" "}
                                                <span className="text-accent align">
                                                    Curated Skincare & Beauty
                                                </span>
                                            </h1>
                                            <p className="text-secondary/70 text-lg mb-8 leading-relaxed">
                                                Handpicked favourites, dermatologist-approved formulations and 
                                                islandwide delivery. Discover clean, effective products that make 
                                                self-care simple.
                                            </p>

                                            {/* CTA Buttons */}
                                            <div className="flex flex-wrap gap-4 mb-12">
                                                <Link to="/products">
                                                    <button className="px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-all shadow-md">
                                                        Shop Now
                                                    </button>
                                                </Link>
                                                <Link to="/about">
                                                    <button className="px-8 py-4 border-2 border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary hover:text-white transition-all">
                                                        Learn More
                                                    </button>
                                                </Link>
                                            </div>

                                            {/* FEATURE CARDS */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                                    <h3 className="font-bold text-secondary mb-1">Premium Care</h3>
                                                    <p className="text-sm text-secondary/60">Dermatologist-approved</p>
                                                </div>
                                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                                    <h3 className="font-bold text-secondary mb-1">Fast Delivery</h3>
                                                    <p className="text-sm text-secondary/60">Islandwide, tracked</p>
                                                </div>
                                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                                    <h3 className="font-bold text-secondary mb-1">Secure Payments</h3>
                                                    <p className="text-sm text-secondary/60">Multiple options</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT IMAGE */}
                                        <div className="relative">
                                            <div className="bg-white w-[790px] h-[500px] rounded-3xl shadow-2xl p-2 aspect-ratio flex items-center justify-center">
                                                <img src={"/home.jpg"} className="w-[800px] h-full object-contain mx-auto rounded-2xl" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* EXPLORE BY CATEGORY */}
                                <div className="w-full px-4 py-16 bg-white">
                                    <div className="max-w-7xl mx-auto">
                                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12">
                                            Explore by category
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <Link to="/products">
                                                <div className="bg-primary p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-accent/10">
                                                    <h3 className="text-2xl font-bold text-secondary mb-2">Skincare</h3>
                                                    <p className="text-secondary/60">Serums, moisturizers & cleansers</p>
                                                </div>
                                            </Link>
                                            <Link to="/products">
                                                <div className="bg-primary p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-accent/10">
                                                    <h3 className="text-2xl font-bold text-secondary mb-2">Makeup</h3>
                                                    <p className="text-secondary/60">Lipsticks, foundations & more</p>
                                                </div>
                                            </Link>
                                            <Link to="/products">
                                                <div className="bg-primary p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-accent/10">
                                                    <h3 className="text-2xl font-bold text-secondary mb-2">Body</h3>
                                                    <p className="text-secondary/60">Lotions & self-care</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* WHY CHOOSE US SECTION */}
                                <div className="w-full px-4 py-16">
                                    <div className="max-w-7xl mx-auto">
                                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 text-center">
                                            Why Choose Crystal Beauty Clear
                                        </h2>
                                        <p className="text-secondary/70 text-center mb-12 max-w-2xl mx-auto">
                                            Experience the difference with our carefully curated selection of premium beauty products
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <span className="text-3xl">🌟</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-secondary mb-2">100% Authentic</h3>
                                                <p className="text-secondary/70">
                                                    All products sourced directly from authorized distributors
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <span className="text-3xl">🚚</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-secondary mb-2">Fast Delivery</h3>
                                                <p className="text-secondary/70">
                                                    Island-wide delivery with real-time tracking
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <span className="text-3xl">💝</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-secondary mb-2">Expert Care</h3>
                                                <p className="text-secondary/70">
                                                    Dermatologist-approved formulations for all skin types
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* PROMOTIONAL SECTION */}
                                <div className="w-full px-4 py-16 bg-white">
                                    <div className="max-w-5xl mx-auto bg-gradient-to-br from-accent to-accent/80 rounded-3xl p-12 text-center shadow-xl">
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                            Special Offers Just for You
                                        </h2>
                                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                                            Subscribe to our newsletter and get exclusive deals, beauty tips, and early access to new products
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                            <input 
                                                type="email" 
                                                placeholder="Enter your email"
                                                className="flex-1 px-6 py-3 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white"
                                            />
                                            <button className="px-8 py-3 bg-white text-accent rounded-lg font-bold hover:shadow-lg transition-all">
                                                Subscribe
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/contact" element={<div className="max-w-7xl mx-auto px-4 py-12"><h1 className="text-secondary text-3xl">Contact Us</h1></div>} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/*" element={<div className="max-w-7xl mx-auto px-4 py-12"><h1 className="text-red-500 text-3xl">404 Not Found</h1></div>} />
                </Routes>
            </div>

            {/* FOOTER */}
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
        </div>
    );
}