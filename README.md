# 🌟 Crystal Beauty Clear (CBC)

Modern e-commerce platform for beauty and skincare products built with React, Vite, and Tailwind CSS.

![Crystal Beauty Clear](./public/logo.png)

## ✨ Features

- 🛍️ **Product Catalog** - Browse skincare, makeup & body care products
- 🔍 **Real-time Search** - Find products instantly with advanced filtering
- 🛒 **Shopping Cart** - Persistent cart with seamless checkout
- 🔐 **Authentication** - Secure login with Google OAuth & JWT
- 👑 **Admin Dashboard** - Complete product, order & user management
- 📱 **Responsive Design** - Mobile-first, modern glassmorphism UI

## 🛠️ Tech Stack

- **React 19** + **Vite** + **Tailwind CSS**
- **React Router** for navigation
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Google OAuth** for authentication

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/Nuwan-Srimal/cbc-frontend.git
   cd cbc-frontend
   npm install
   ```

2. **Environment Setup**
   ```env
   VITE_API_URL=your_backend_api_url
   VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 Key Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with product categories |
| `/products` | Product catalog with search |
| `/cart` | Shopping cart & checkout |
| `/login` | User authentication |
| `/admin` | Admin dashboard (admin only) |

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Application pages
│   └── admin/     # Admin panel pages
├── utils/         # Helper functions
└── App.jsx        # Main app component
```

## � Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
npm run lint     # Code linting
```

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add feature'`
4. Push branch: `git push origin feature/my-feature`
5. Submit pull request

---

**Built with ❤️ for Crystal Beauty Clear**
