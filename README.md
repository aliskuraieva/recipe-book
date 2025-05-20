# 🍲 Recipe Book — Fullstack Test Project

This is a full-stack web application for browsing and viewing recipe details using [TheMealDB API](https://www.themealdb.com/api.php).  
It includes:

- **Backend**: Node.js API (NestJS or Express) to proxy and filter recipes
- **Frontend**: React (Vite) app to display and interact with recipe data

---

## 🗂️ Project Structure

```
recipe-book/
├── backend/   # Nest.js or Express backend
└── frontend/  # Vite + React frontend
```

---

## ⚙️ Requirements

- Node.js v18+
- npm v9+ or yarn
- Internet connection (TheMealDB is a public API)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aliskuraieva/recipe-book
cd recipe-book
```

---

## 📦 Backend Setup (`/backend`)

---

## 🚀 Installation & Run Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm

---

## 📦 Backend (NestJS)

### 📁 Location

`/backend`

### 🛠 Installation Commands

# Go to backend folder

```bash
cd backend
```

# Install Nest CLI globally if not installed

```bash
npm install -g @nestjs/cli
```

# Create the NestJS project (already done)

```bash
nest new backend
```

# Install dependencies

```bash
npm install
```

### Create environment file

```bash
cp .env.example .env
```

Example `.env` file:

```env
RECIPE_API_BASE_URL=https://www.themealdb.com/api/json/v1/1
```

### Start the backend server

```bash
npm run start:dev
```

> Backend runs at: `http://localhost:3000`

### Backend API Routes

- `GET /recipes` — list of recipes (with filters)
  - `?ingredient=chicken_breast`
  - `?category=Seafood`
  - `?country=Canadian`
- `GET /recipes/:id` — full info for a recipe

---

## 💻 Frontend (React + Vite)

### 📁 Location

`/frontend`

### 🛠 Installation Commands

# Go to frontend folder

```bash
cd frontend
```

# Create a new Vite React project (already done)

```bash
npm create vite@latest frontend --template react-ts
```

# Navigate and install dependencies

```bash
cd frontend
npm install
```

# Start development server

```bash
npm run dev
```

### Create environment file

```bash
cp .env.example .env
```

Example `.env` file:

```env
API_BASE_URL=http://localhost:3000
```

### Start the frontend server

```bash
npm run dev
```

> Frontend runs at: `http://localhost:5173`

---

## ✨ Features

- View all recipes
- Filter by ingredient, category, or country
- View detailed info about a recipe
- Navigate to filtered views by clicking ingredients/country/category
- Sidebar showing similar recipes by category
- Responsive layout and clean UI

---

## 🛠 Developer Tools

### Code Quality

- ESLint
- Prettier

### Run linter

```bash
npm run lint
```

---

## 📬 Contact

Created by [Alisa](mailto:alisa.mogila@gmail.com)

---

## 📝 License

This project is for educational and evaluation purposes only.  
Recipe data provided by [TheMealDB](https://www.themealdb.com/api.php).
