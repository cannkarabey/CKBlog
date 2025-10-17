# 🌐 CKBlog — Modern Vue 3 Personal Blog & Admin Panel

> **Entire structure and frontend updated October 2025**

Learn frontend architecture, modular Vue 3 development, and build a scalable personal blog system powered by mock API & admin dashboard.

---

## 🧱 Project Overview

**CKBlog** is a **modern personal blog and portfolio website** built with **Vue 3 + Composition API**.  
It allows users to publish blog posts, display projects, and manage content through a comprehensive **Admin Panel**.  
Frontend development is fully decoupled from backend using a **Mock API system**, enabling independent development and testing.

---

## 🛠️ Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | Vue 3 (Composition API), TypeScript, Vite |
| **Routing** | Vue Router |
| **State Management** | Pinia |
| **HTTP Client** | Axios |
| **i18n** | vue-i18n |
| **SEO & Meta** | @vueuse/head |
| **Styling** | CSS (Global Variables) |

---

## 🧩 Features at a Glance

### 🎨 Frontend & UI
- **Multi-language Support (TR/EN)** using `vue-i18n`  
- **Dynamic SEO & Open Graph tags** via `useSeo` composable  
- **Dark Mode** with global theme state  
- **Responsive Design** using CSS variables  
- **Modern Layouts:** `MainLayout` and `AdminLayout`

### ⚙️ State & Logic
- `authStore`: manages user session, login tokens  
- `uiStore`: controls theme, UI states  
- Centralized `axios` instance with interceptors for authorization

### 🧰 Admin Panel
- Route guards (`requiresAdmin`) for authorization  
- CRUD screens for posts, projects, and media  
- Modular sidebar + admin layout  
- Generic table (`AdminTable.vue`) and media picker (`MediaPicker.vue`)

---

## 🧠 Mock API System

> Develop and test without a backend!

| Config | Description |
|:--------|:-------------|
| `.env.local` | Set environment variables |
| `VITE_USE_MOCK=1` | Enables mock mode |
| `/src/mocks/` | Contains static data for posts and projects |

All API calls go through `/src/adapters/http.ts`, which defines a centralized Axios instance.  
Interceptors automatically handle **Authorization headers** and error responses.

---

## 📂 Project Structure

```plaintext
src/
 ├─ adapters/      # Axios instance & interceptors
 ├─ api/           # API modules (auth, posts, projects)
 ├─ assets/        # Static assets (images, fonts)
 ├─ components/    # Reusable UI components
 ├─ composables/   # Vue 3 reusable logic (useSeo, useAuth, etc.)
 ├─ i18n/          # Language files (tr.json, en.json)
 ├─ layouts/       # MainLayout, AdminLayout
 ├─ mocks/         # Mock API data
 ├─ pages/         # Route views (Home, Blog, Admin)
 ├─ router/        # Router setup & guards
 ├─ stores/        # Pinia store modules
 └─ styles/        # Global CSS (base.css)
🚀 Getting Started
1️⃣ Clone the Repository
bash
Copy code
git clone <repository-url>
cd ckblog
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Setup Environment
Create .env.local file:

bash
Copy code
VITE_USE_MOCK=1
4️⃣ Run Development Server
bash
Copy code
npm run dev
Open http://localhost:5173

🧭 Table of Contents
Project Overview

Tech Stack

Features at a Glance

Mock API System

Project Structure

Getting Started

Current Progress

Developer Notes

📈 Current Progress
Status	Description
✅	Base Vue 3 structure completed
✅	Home, Blog, Projects, About pages implemented
✅	TR/EN i18n system functional
✅	Dynamic SEO titles & OG meta tags
✅	Fully working Admin Panel (mock mode)
✅	Dark Mode added
⚙️	Blog filtering & pagination (in progress)
⚙️	Project detail page redesign (planned)
⚙️	Markdown editor integration (planned)
⚙️	Real API connection + sitemap.xml (pending backend)

🔧 Recommended Setup
Tool	Purpose
VS Code + Volar	Vue 3 language support
Node.js 18+	Recommended runtime
Git + GitHub	Version control & CI/CD
Mock API Mode	For isolated frontend testing

👨‍💻 Developer Notes
CKBlog was designed as a scalable and educational frontend architecture for Vue developers.
Its modular structure, i18n integration, and admin dashboard make it ideal for personal websites and blog-based portfolios.
The use of mock APIs allows complete frontend independence during development.
