# Dietly Frontend

Frontend untuk aplikasi Dietly, sebuah aplikasi web untuk membantu pengguna mencatat konsumsi makanan, memantau berat badan, dan melihat prediksi perkembangan berat badan.

Frontend dibangun menggunakan React dan Vite, serta berkomunikasi dengan backend Dietly melalui REST API.

---

## Tech Stack

- React
- Vite
- React Router
- Axios
- ESLint

---

## Requirements

Sebelum menjalankan frontend, pastikan perangkat sudah memiliki:

- Git
- Node.js
- npm
- Akses ke repository frontend Dietly
- Backend Dietly yang sudah dapat dijalankan

Backend dan frontend harus berjalan pada komputer yang sama untuk local development.

---

## 1. Clone Repository

Clone repository frontend:

```bash

git clone https://github.com/bagasuy/dietly-frontend.git

```

Masuk ke folder project:

```bash

cd dietly-frontend

```

Pastikan file package.json tersedia:

```bash

ls

```

Contoh struktur project:

```text

dietly-frontend/

├── package.json

├── src/

├── public/

└── ...

```

---

## 2. Install Dependencies

Install seluruh dependency yang dibutuhkan:

```bash

npm install

```

Perintah ini akan membaca package.json dan menginstall dependency frontend Dietly.

---

## 3. Configure Environment Variables

Frontend menggunakan file .env untuk menentukan alamat backend API.

Buat file .env di root project, yaitu folder yang sama dengan package.json.

Contoh struktur:

```text

dietly-frontend/

├── .env

├── package.json

├── src/

└── ...

```

Isi file .env:

```env

VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1

```

VITE_API_BASE_URL digunakan sebagai base URL untuk request API dari frontend ke backend.

Jangan commit file .env ke GitHub.

---

## 4. Pastikan Backend Berjalan

Frontend membutuhkan backend Dietly agar fitur yang menggunakan API dapat berjalan.

Backend harus berjalan pada:

```text

http://127.0.0.1:8000/

```

API base URL:

```text

http://127.0.0.1:8000/api/v1/

```

Jika backend belum berjalan, fitur berikut tidak akan berfungsi dengan baik:

- Login
- Register
- Profile
- Meal tracking
- Weight tracking
- Prediction

Untuk setup backend, lihat README pada repository dietly-backend.

---

## 5. Run Frontend

Setelah dependency dan environment variable selesai dikonfigurasi, jalankan development server:

```bash

npm run dev

```

Vite biasanya menjalankan frontend pada:

```text

http://localhost:5173/

```

Buka alamat tersebut melalui browser.

---

## 6. Run Full Application

Karena backend dan frontend berada di repository yang berbeda, keduanya harus dijalankan secara terpisah.

### Terminal 1 — Backend

Masuk ke repository backend:

```bash

cd dietly-backend

```

Aktifkan virtual environment sesuai sistem operasi dan setup backend.

Kemudian jalankan:

```bash

python manage.py runserver

```

Backend:

```text

http://127.0.0.1:8000/

```

### Terminal 2 — Frontend

Buka terminal baru.

Masuk ke repository frontend:

```bash

cd dietly-frontend

```

Jalankan:

```bash

npm run dev

```

Frontend:

```text

http://localhost:5173/

```

Setelah kedua server berjalan, buka:

```text

http://localhost:5173/

```

---

## Main Features

Frontend Dietly menyediakan beberapa halaman dan fitur utama.

### Public Pages

- Landing Page
- Login
- Register

### Authenticated Pages

- Dashboard
- Tracker
- Profile

---

## Dashboard

Dashboard digunakan untuk melihat ringkasan data nutrisi dan perkembangan pengguna.

Dashboard menampilkan:

- Total calories
- Current weight
- Weight progress
- Prediction
- Recent meals

Dashboard membantu pengguna melihat kondisi dan perkembangan mereka dalam satu halaman.

---

## Tracker

Tracker digunakan untuk mencatat dan memantau data nutrisi pengguna.

Fitur yang tersedia:

- Mencatat makanan
- Melihat meal history
- Mencatat berat badan
- Melihat weight progress
- Membuat prediction
- Melihat hasil prediction

---

## Profile

Profile digunakan untuk melihat dan memperbarui informasi pengguna.

Data yang dapat diperbarui:

- Height
- Current weight
- Target weight
- Daily calorie goal

Username dan email ditampilkan sebagai informasi akun.

---

## API Communication

Frontend menggunakan Axios untuk berkomunikasi dengan backend Dietly.

API service dipisahkan berdasarkan fitur:

```text

src/services/

├── api.js

├── auth.js

├── diet.js

└── prediction.js

```

### Authentication

Digunakan untuk:

- Register
- Login
- Get current user
- Update current user
- Logout

### Diet

Digunakan untuk:

- Get diet entries
- Create diet entry
- Update diet entry
- Delete diet entry
- Get weight history
- Create weight history

### Prediction

Digunakan untuk:

- Get prediction history
- Create prediction

---

## Project Structure

Struktur utama project frontend:

```text

dietly-frontend/

├── public/

│

├── src/

│ ├── components/

│ │ ├── dashboard/

│ │ └── tracker/

│ │

│ ├── pages/

│ │ ├── Dashboard.jsx

│ │ ├── Landing.jsx

│ │ ├── Login.jsx

│ │ ├── Profile.jsx

│ │ ├── Register.jsx

│ │ └── Tracker.jsx

│ │

│ ├── services/

│ │ ├── api.js

│ │ ├── auth.js

│ │ ├── diet.js

│ │ └── prediction.js

│ │

│ ├── App.jsx

│ ├── App.css

│ └── main.jsx

│

├── .env

├── package.json

└── README.md

```

---

## Available Scripts

### Development

Menjalankan development server:

```bash

npm run dev

```

### Lint

Menjalankan ESLint untuk memeriksa kode:

```bash

npm run lint

```

### Production Build

Membuat production build menggunakan Vite:

```bash

npm run build

```

---

## Development Notes

Frontend dan backend Dietly dikembangkan sebagai dua repository terpisah.

```text

Dietly

├── dietly-frontend

│ └── React + Vite

│

└── dietly-backend

└── Django + Django REST Framework

```

Frontend bertanggung jawab terhadap:

- User interface
- User interaction
- Client-side routing
- API communication

Backend bertanggung jawab terhadap:

- REST API
- Authentication
- Database
- Business logic
- Prediction API

Alur komunikasi aplikasi:

```text

User

↓

React Frontend

↓

Axios

↓

Django REST API

↓

PostgreSQL

```

---

## Repository

### Frontend

https://github.com/bagasuy/dietly-frontend

### Backend

https://github.com/bagasuy/dietly-backend