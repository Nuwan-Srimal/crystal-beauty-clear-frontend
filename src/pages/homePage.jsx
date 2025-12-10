import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import { ProductPage } from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";

export default function HomePage() {
    return (
        <div className="w-full min-h-screen bg-primary flex flex-col">
            {/* HEADER */}
            <Header />

            {/* CONTENT WRAPPER */}
            <div className="max-w-7xl w-full mx-auto px-4 py-6">

                <Routes path="/">
                    {/* HOME SECTION */}
                    <Route
                        path="/"
                        element={
                            <div className="text-center mt-16">
                                <h1 className="text-4xl font-bold text-secondary">
                                    Welcome to Crystal Beauty Clear
                                </h1>
                                <p className="text-secondary/70 mt-3 text-lg">
                                    Discover beauty & skincare curated just for you ✨
                                </p>

                                {/* CTA */}
                                <div className="mt-8 flex justify-center gap-4">
                                    <button className="px-6 py-3 bg-accent text-white rounded-xl shadow-md hover:opacity-90 transition">
                                        Shop Now
                                    </button>
                                    <button className="px-6 py-3 border border-secondary text-secondary rounded-xl hover:bg-secondary hover:text-white transition">
                                        Learn More
                                    </button>
                                </div>

                                {/* Decorative Section */}
                                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="p-6 bg-white rounded-xl shadow-sm border border-accent/20">
                                        <h3 className="text-xl font-semibold text-secondary">Premium Care</h3>
                                        <p className="text-secondary/70 text-sm mt-2">
                                            Experience high-quality skincare trusted by thousands.
                                        </p>
                                    </div>

                                    <div className="p-6 bg-white rounded-xl shadow-sm border border-accent/20">
                                        <h3 className="text-xl font-semibold text-secondary">Fast Delivery</h3>
                                        <p className="text-secondary/70 text-sm mt-2">
                                            Islandwide delivery with real-time tracking.
                                        </p>
                                    </div>

                                    <div className="p-6 bg-white rounded-xl shadow-sm border border-accent/20">
                                        <h3 className="text-xl font-semibold text-secondary">100% Safe</h3>
                                        <p className="text-secondary/70 text-sm mt-2">
                                            Dermatologist-approved safe & gentle products.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    <Route path="/products" element={<ProductPage />} />
                    <Route path="/contact" element={<h1 className="text-secondary text-3xl">Contact Us</h1>} />
                    <Route path="/about" element={<h1 className="text-secondary text-3xl">About Us</h1>} />
                    <Route path="/overview/:id" element={<ProductOverview />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/*" element={<h1 className="text-red-500 text-3xl">404 Not Found</h1>} />
                </Routes>
            </div>

            {/* FOOTER */}
            <footer className="mt-auto py-6 bg-secondary text-white text-center">
                <p>© {new Date().getFullYear()} Crystal Beauty Clear — All rights reserved.</p>
            </footer>
        </div>
    );
}
