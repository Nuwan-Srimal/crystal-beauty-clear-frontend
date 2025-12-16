import { Route, Routes, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { ProductPage } from "./productPage";
import ProductOverview from "./productOverview";
import CartPage from "./cart";
import CheckoutPage from "./checkout";
import AboutPage from "./about";
import ContactPage from "./contact";
import axios from "axios";
import { useEffect, useState } from "react";
// import CustomerReviews from "./customerReviews";

export default function HomePage() {
  const [isAdmin, setIsAdmin] = useState(false);

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.role === "admin") {
          setIsAdmin(true);
        }
      })
      .catch(() => {});
  }, []);
  return (
    <div className="w-full min-h-screen bg-primary flex flex-col">
      <Header />

      <div className="w-full flex-1">
        <Routes path="/">
          <Route
            path="/"
            element={
              <div className="w-full">
                <section className="w-full px-4 py-12 sm:py-16 md:py-24">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary leading-tight">
                        Glow Inside Out
                        <span className="block text-accent mt-2 text-2xl sm:text-3xl md:text-4xl font-semibold">
                          Curated Skincare & Beauty
                        </span>
                      </h1>

                      <p className="text-secondary/70 text-base sm:text-lg md:text-xl max-w-2xl">
                        Handpicked favourites, dermatologist-approved
                        formulations and islandwide delivery. Discover clean,
                        effective products that make self care feel effortless.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <Link to="/products" className="w-full sm:w-auto">
                          <button className="w-full px-8 py-4 bg-accent text-white rounded-lg font-semibold hover:opacity-95 transition-all shadow-md">
                            Shop Now
                          </button>
                        </Link>

                        <Link to="/about" className="w-full sm:w-auto">
                          <button className="w-full px-6 py-4 border-2 border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary hover:text-white transition-all">
                            Learn More
                          </button>
                        </Link>
                        {isAdmin && (
                          <Link to="/admin" className="w-full sm:w-auto">
                            <button className="w-full px-6 py-4 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition-all shadow-md">
                              Go to Admin Dashboard
                            </button>
                          </Link>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                          <h3 className="font-bold text-secondary mb-1">
                            Premium Care
                          </h3>
                          <p className="text-sm text-secondary/60">
                            Dermatologist-approved
                          </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                          <h3 className="font-bold text-secondary mb-1">
                            Fast Delivery
                          </h3>
                          <p className="text-sm text-secondary/60">
                            Islandwide, tracked
                          </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                          <h3 className="font-bold text-secondary mb-1">
                            Secure Payments
                          </h3>
                          <p className="text-sm text-secondary/60">
                            Multiple options
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center">
                      <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl p-[1px] rounded-[28px] shadow-[0_0_40px_rgba(236,72,153,0.65)]">
                        <div className="bg-rose-100 rounded-[25px] p-3 w-full shadow-[inset_0_0_20px_rgba(255,255,255,0.6)]">
                          <div className="relative w-full h-[260px] sm:h-[320px] md:h-[420px] rounded-2xl overflow-hidden ring-4 ring-pink-300/70 shadow-[0_0_30px_rgba(236,72,153,0.55)]">
                            <img
                              src={"/home.jpg"}
                              alt="Crystal Beauty hero"
                              className="w-full h-full object-cover scale-105 transition-transform duration-1000 hover:scale-100"
                              loading="lazy"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/25 via-transparent to-transparent" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="w-full px-4 py-16 bg-white">
                  <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-8">
                      Explore by category
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      <Link to="/products">
                        <div className="bg-primary p-8 rounded-2xl hover:shadow-lg transition-all border border-accent/10 h-full">
                          <h3 className="text-2xl font-bold text-secondary mb-2">
                            Skincare
                          </h3>
                          <p className="text-secondary/60">
                            Serums, moisturizers & cleansers
                          </p>
                        </div>
                      </Link>

                      <Link to="/products">
                        <div className="bg-primary p-8 rounded-2xl hover:shadow-lg transition-all border border-accent/10 h-full">
                          <h3 className="text-2xl font-bold text-secondary mb-2">
                            Makeup
                          </h3>
                          <p className="text-secondary/60">
                            Lipsticks, foundations & more
                          </p>
                        </div>
                      </Link>

                      <Link to="/products">
                        <div className="bg-primary p-8 rounded-2xl hover:shadow-lg transition-all border border-accent/10 h-full">
                          <h3 className="text-2xl font-bold text-secondary mb-2">
                            Body
                          </h3>
                          <p className="text-secondary/60">
                            Lotions & self-care
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </section>

                <section className="w-full px-4 py-16">
                  <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-4 text-center">
                      Why Choose Crystal Beauty Clear
                    </h2>

                    <p className="text-secondary/70 text-center mb-12 max-w-2xl mx-auto">
                      Experience the difference with our carefully curated
                      selection of premium beauty products.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl">🌟</span>
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-2">
                          100% Authentic
                        </h3>
                        <p className="text-secondary/70">
                          All products sourced directly from authorized
                          distributors
                        </p>
                      </div>

                      <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl">🚚</span>
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-2">
                          Fast Delivery
                        </h3>
                        <p className="text-secondary/70">
                          Island-wide delivery with real-time tracking
                        </p>
                      </div>

                      <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl">💝</span>
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-2">
                          Expert Care
                        </h3>
                        <p className="text-secondary/70">
                          Dermatologist-approved formulations for all skin types
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* <CustomerReviews /> */}
              </div>
            }
          />

          <Route path="/products" element={<ProductPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/overview/:id" element={<ProductOverview />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/*"
            element={
              <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className="text-red-500 text-3xl">404 Not Found</h1>
              </div>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
