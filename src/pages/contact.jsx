import React, { useState } from "react";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

const Mail = ({ size = 16 }) => (
  <span style={{ fontSize: size, lineHeight: 1 }}>✉️</span>
);
const MapPin = ({ size = 16 }) => (
  <span style={{ fontSize: size, lineHeight: 1 }}>📍</span>
);
const Phone = ({ size = 16 }) => (
  <span style={{ fontSize: size, lineHeight: 1 }}>📞</span>
);
const X = ({ size = 16 }) => (
  <span style={{ fontSize: size, lineHeight: 1 }}>❌</span>
);
const Check = ({ size = 16 }) => (
  <span style={{ fontSize: size, lineHeight: 1 }}>✅</span>
);

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length) return;

    try {
      setStatus("sending");
      // Simulate API call
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus(null), 2500);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus(null), 2500);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b bg-primary py-12 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1 bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-extrabold mb-2">Get in touch</h1>
            <p className="text-gray-600">
              Questions, collaborations or hello — we’d love to hear from you.
              Fill the form or use any of the contacts below.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-100">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Office</div>
                  <div className="font-medium">
                    No 245/5, Ransiri Uyana, Baddegama Rd, Galle
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-100">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Call us</div>
                  <div className="font-medium">+94 11 234 5678</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gray-100">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">hello@crystalbeautyclear.lk</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between font-serif shadow-xl p-5 bg-primary to-black rounded-lg">
            <div className="text-sm text-accent">Follow us</div>
            <div className="flex gap-8">
              <a
                className="text-gray-300 hover:text-gray-700"
                aria-label="Facebook"
              >
                <a href="https://facebook.com" className="text-accent"><BsFacebook /></a>
              </a>
              <a
                className="text-gray-300 hover:text-gray-700"
                aria-label="Instagram"
              >
                <a href="https://instagram.com" className="text-accent"><BsInstagram /></a>
              </a>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="md:col-span-1">
                <label className="text-sm font-medium text-gray-700">
                  Full name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                    errors.name ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              <div className="md:col-span-1">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`mt-2 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                    errors.email ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 border-gray-200"
                  placeholder="Brief subject (optional)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className={`mt-2 w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                    errors.message ? "border-red-300" : "border-gray-200"
                  }`}
                  placeholder="Tell us a little about your inquiry..."
                />
                {errors.message && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.message}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  We normally reply within 1‑2 business days.
                </div>

                <div className="flex items-center gap-3">
                  {status === "success" && (
                    <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-lg">
                      <Check size={16} /> Sent
                    </div>
                  )}
                  {status === "error" && (
                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-lg">
                      <X size={16} /> Error
                    </div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 shadow hover:bg-indigo-700 focus:outline-none"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending..." : "Send message"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="h-[400px] grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden shadow">
              <iframe
                title="Our location"
                loading="lazy"
                className="w-full h-64 md:h-full"
                src="https://www.scribblemaps.com/api/maps/images/dYRkXF2zeW_thumb_1200x630.jpg"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-3">
                Other ways to contact
              </h3>
              <p className="text-gray-600 mb-4">
                Prefer to reach out differently? Here are quick links and
                business hours.
              </p>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Support</div>
                    <div className="font-medium">
                      support@crystalbeautyclear.lk
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Sales</div>
                    <div className="font-medium">+94 11 234 5678</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 rounded">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Hours</div>
                    <div className="font-medium">
                      Monday to Friday: 9:00 AM - 5:00 PM
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-6 flex gap-3">
                <a className="px-4 py-2 border rounded-lg text-sm">Live chat</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


