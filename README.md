# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## How to run 

# Dietly Frontend

Frontend untuk aplikasi Dietly menggunakan React dan Vite.

Frontend membutuhkan backend Dietly agar fitur login, meal tracking, weight tracking, dan prediction dapat digunakan.

---

## Prerequisites

Pastikan sudah terinstall:

- Node.js
- npm
- Git

Backend Dietly juga harus sudah tersedia dan dapat dijalankan.

---

## 1. Clone Repository

Clone repository frontend:

bash
git clone https://github.com/bagasuy/dietly-frontend

Masuk ke folder:

cd dietly-frontend
## 2. Install Dependencies

Jalankan:

npm install

Tunggu sampai proses selesai.

## 3. Setup Environment Variables

Buat file:

.env

di root project:

dietly-frontend/
├── .env
├── package.json
├── src/
└── ...

Isi:

VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1

Jangan upload .env ke GitHub.

## 4. Pastikan Backend Berjalan

Sebelum menjalankan frontend, pastikan backend Dietly sudah berjalan.

Backend harus tersedia di:

http://127.0.0.1:8000/

Frontend menggunakan API:

http://127.0.0.1:8000/api/v1

Jika backend belum berjalan, beberapa fitur aplikasi tidak akan berfungsi.

## 5. Jalankan Frontend

Jalankan:

npm run dev

Vite akan menampilkan alamat aplikasi, biasanya:

http://localhost:5173/

Buka alamat tersebut di browser.

## 6. Menjalankan Full Application

Karena backend dan frontend berada di repository yang berbeda, keduanya harus dijalankan secara terpisah.

## Terminal 1 — Backend

Masuk ke repository backend:

cd dietly-backend

Aktifkan virtual environment:

source .venv/bin/activate

Jalankan:

python manage.py runserver

Backend:

http://127.0.0.1:8000/

## Terminal 2 — Frontend

Buka terminal baru.

Masuk ke repository frontend:

cd dietly-frontend

Jalankan:

npm run dev

Frontend:

http://localhost:5173/

Kemudian buka frontend di browser:

http://localhost:5173/
