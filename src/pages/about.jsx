import { LuSquareDot } from "react-icons/lu";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-secondary text-4xl font-semibold tracking-tight">About Us</h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Welcome to Crystal Beauty Clear - where elegance meets quality. We bring you premium
          cosmetic products crafted to enhance your natural glow.
        </p>

        <div className="mx-auto mt-6 h-0.5 w-24 bg-gradient-to-r from-accent to-accent/50 rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="w-full">
          <img
            src="https://www.dbhealthcare.lk/wp-content/uploads/2025/03/Cosmetology-4-2-1.png"
            alt="About Crystal Beauty Clear"
            className="w-full h-[400px] rounded-xl shadow-lg object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <h2 className="text-secondary text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed rounded-xl">
            Crystal Beauty Clear began its journey with a simple vision - to bring high-quality, affordable, and trustworthy beauty products directly to every customer. Over the years, we noticed that many people struggled to find genuine cosmetics, skincare, and personal care items when they needed them the most. That insight inspired us to build a platform where premium beauty products are always within reach.
          </p>
          <br />
          <p className="text-gray-600 leading-relaxed">
            Today, Crystal Beauty Clear stands proudly as a growing online destination for cosmetics, self-care essentials, and wellness products, offering customers a smooth and reliable shopping experience backed by exceptional service.
          </p>

          <div className="mt-6">
            <h3 className="text-secondary text-xl font-semibold mb-2">Why Choose Us?</h3>

            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="mt-1">✨</span>
                <span>Premium-quality cosmetic products</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1">🌿</span>
                <span>Safe, cruelty-free formulations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1">💎</span>
                <span>Designed for every skin type</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1">🚚</span>
                <span>Fast shipping & great support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-10">
        <div>
          <h2 className="text-secondary text-2xl font-bold mb-4">The Crystal Beauty Clear Way</h2>
          <p className="text-gray-600 p-6 rounded-xl shadow-md bg-white/60 backdrop-blur-md leading-relaxed text-justify">
            At Crystal Beauty Clear, our mission is to empower individuals to embrace their unique beauty through high-quality, accessible cosmetic products. We envision a world where everyone can confidently express themselves and feel radiant in their own skin. By prioritizing quality, safety, and customer satisfaction, we strive to be the go-to destination for all beauty needs, fostering a community that celebrates diversity and self-care.
          </p>
        </div>

        <div>
          <h2 className="text-secondary text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600 p-6 rounded-xl shadow-md bg-white/60 backdrop-blur-md leading-relaxed text-justify">
            “To become a leading beauty and wellness platform that provides effortless access to premium personal care products and exceptional customer experiences.”
          </p>
        </div>

        <div>
          <h2 className="text-secondary text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 p-6 rounded-xl shadow-md bg-white/60 backdrop-blur-md leading-relaxed">
            <span className="flex items-start gap-3 mb-3">
              <LuSquareDot className="inline text-accent mt-1" />
              <span>Empower our customers by offering high-quality skincare, cosmetics, and wellness products</span>
            </span>

            <span className="flex items-start gap-3 mb-3">
              <LuSquareDot className="inline text-accent mt-1" />
              <span>Build long-term, meaningful relationships with customers, employees, and partners</span>
            </span>

            <span className="flex items-start gap-3 mb-3">
              <LuSquareDot className="inline text-accent mt-1" />
              <span>Deliver excellent service through a skilled and professional support team</span>
            </span>

            <span className="flex items-start gap-3">
              <LuSquareDot className="inline text-accent mt-1" />
              <span>Continuously innovate to improve convenience, trust, and overall satisfaction</span>
            </span>
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-secondary text-3xl font-bold mb-6">Numbers That Define Us</h3>
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-xl shadow-md bg-white/60 backdrop-blur-md">
            <h3 className="text-secondary text-3xl font-bold">1K+</h3>
            <p className="text-gray-400 mt-2">Happy Customers</p>
          </div>

          <div className="p-6 rounded-xl shadow-md bg-white/60 backdrop-blur-md">
            <h3 className="text-secondary text-3xl font-bold">10+</h3>
            <p className="text-gray-400 mt-2">Products</p>
          </div>

          <div className="p-6 rounded-xl shadow-md bg-white/60 backdrop-blur-md">
            <h3 className="text-secondary text-3xl font-bold">4.9★</h3>
            <p className="text-gray-400 mt-2">Customer Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
