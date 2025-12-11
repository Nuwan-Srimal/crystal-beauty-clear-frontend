import { LuSquareDot } from "react-icons/lu";


export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-secondary font-serif text-4xl font-semibold">About Us</h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Welcome to Crystal Beauty Clear - where elegance meets quality. We bring you premium
          cosmetic products crafted to enhance your natural glow.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="w-full">
          <img
            src="https://www.dbhealthcare.lk/wp-content/uploads/2025/03/Cosmetology-4-2-1.png"
            alt="About Crystal Beauty Clear"
            className="w-full h-[400px] rounded-xl shadow-lg"
          />
        </div>

        <div>
          <h2 className="text-secondary text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Crystal Beauty Clear began its journey with a simple vision — to bring high-quality, affordable, and trustworthy beauty products directly to every customer. Over the years, we noticed that many people struggled to find genuine cosmetics, skincare, and personal care items when they needed them the most. That insight inspired us to build a platform where premium beauty products are always within reach.
          </p>
          <br />
          <p className="text-gray-600 leading-relaxed">
            Today, Crystal Beauty Clear stands proudly as a growing online destination for cosmetics, self-care essentials, and wellness products, offering customers a smooth and reliable shopping experience backed by exceptional service.
          </p>

          <div className="mt-6">
            <h3 className="text-secondary text-xl font-semibold mb-2">Why Choose Us?</h3>

            <ul className="space-y-2 text-gray-600">
              <li>✨ Premium-quality cosmetic products</li>
              <li>🌿 Safe, cruelty-free formulations</li>
              <li>💎 Designed for every skin type</li>
              <li>🚚 Fast shipping & great support</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-secondary text-2xl font-bold text-left mt-16 mb-8">The Crystal Beauty Clear Way</h2>
        <p className="text-gray-600 font-serif p-6 rounded-xl shadow-md bg-black/5 backdrop-blur leading-relaxed text-justify">
          At Crystal Beauty Clear, our mission is to empower individuals to embrace their unique beauty through high-quality, accessible cosmetic products. We envision a world where everyone can confidently express themselves and feel radiant in their own skin. By prioritizing quality, safety, and customer satisfaction, we strive to be the go-to destination for all beauty needs, fostering a community that celebrates diversity and self-care.
        </p>
        <h2 className="text-secondary text-2xl font-bold text-left mt-8 mb-8">Our Vision</h2>
        <p className="text-gray-600 font-serif p-6 rounded-xl shadow-md bg-black/5 backdrop-blur leading-relaxed text-justify">
          “To become a leading beauty and wellness platform that provides effortless access to premium personal care products and exceptional customer experiences.”
        </p>
        <h2 className="text-secondary text-2xl font-bold text-left mt-8 mb-8">Our Mission</h2>
        <p className="text-gray-600 font-serif p-6 rounded-xl shadow-md bg-black/5 backdrop-blur leading-relaxed text-justify">
          <LuSquareDot className="inline text-accent mr-2" />
          Empower our customers by offering high-quality skincare, cosmetics, and wellness products
          <br />
          <LuSquareDot className="inline text-accent mr-2" />
          Build long-term, meaningful relationships with customers, employees, and partners
          <br />
          <LuSquareDot className="inline text-accent mr-2" />
          Deliver excellent service through a skilled and professional support team
          <br />
          <LuSquareDot className="inline text-accent mr-2" />
          Continuously innovate to improve convenience, trust, and overall satisfaction
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 text-center mt-16">
        <div className="p-6 rounded-xl shadow-md bg-black/5 backdrop-blur">
          <h3 className="text-secondary text-3xl font-bold">1K+</h3>
          <p className="text-gray-400">Happy Customers</p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-black/5 backdrop-blur">
          <h3 className="text-secondary text-3xl font-bold">10+</h3>
          <p className="text-gray-400">Products</p>
        </div>

        <div className="p-6 rounded-xl shadow-md bg-black/5 backdrop-blur">
          <h3 className="text-secondary text-3xl font-bold">4.9★</h3>
          <p className="text-gray-400">Customer Rating</p>
        </div>
      </div>
    </div>
  );
}
