
---

```markdown
# 🎨 FX Creations Studio — Full Stack Web Application  

FX Creations Studio is a **multi-role web platform** built using **Next.js, Tailwind CSS, Laravel (PHP)**, and **MySQL**.  
It includes separate **Admin and Client panels**, fully integrated backend APIs, and **automated email handling** via PHPMailer.  

---

## 🧩 Tech Stack  

### 💻 Frontend  
- **Next.js 14** (React framework for SSR and routing)  
- **Tailwind CSS** for modern responsive UI  
- **Axios** for API communication  

### ⚙️ Backend  
- **Laravel 10 (PHP)** — REST API backend  
- **PHPMailer** — Email notifications and form submissions  
- **MySQL** — Relational database managed via **XAMPP**  

### 🧰 Tools & Environment  
- VS Code, Postman, GitHub  
- XAMPP for local backend environment  
- Vercel for frontend hosting  
- Git-based CI/CD setup  

---

## 🧱 Project Structure  

```

fx_creations_full/
│
├── frontend/        # Next.js + Tailwind client
├── admin/           # Next.js admin dashboard
├── backend/         # Laravel + PHPMailer backend
└── README.md

````

---

## 🚀 Getting Started  

### 🔹 Frontend Setup  
```bash
cd frontend
npm install
npm run dev
````

Frontend runs at: **[http://localhost:3000](http://localhost:3000)**

### 🔹 Admin Setup

```bash
cd admin
npm install
npm run dev
```

Admin panel runs at: **[http://localhost:3001](http://localhost:3001)**

### 🔹 Backend Setup (Laravel)

```bash
cd backend
composer install
php artisan migrate
php artisan serve
```

Backend runs at: **[http://localhost:8000](http://localhost:8000)**

> ⚠️ Make sure **XAMPP (MySQL & Apache)** is running before starting the backend.

---

## ✉️ Email Integration

All contact forms and order confirmations use **PHPMailer** with SMTP configuration.
Update your `.env` file with correct mail credentials:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_email@gmail.com
MAIL_FROM_NAME="FX Creations Studio"
```

---

## 🌐 Deployment

* **Frontend** → [Vercel](https://vercel.com)
* **Backend** → Hosted on any PHP-supported server (e.g., cPanel, Hostinger, or Laravel Forge)
* **Database** → MySQL (remote or XAMPP local instance)

---

## 📸 Features

✅ Responsive and elegant UI with Tailwind CSS
✅ Separate admin and client dashboards
✅ Secure API communication between frontend and backend
✅ PHPMailer integration for automated emails
✅ MySQL database for persistent data
✅ Deployed and version-controlled via GitHub

---

## 🔗 Repositories

* 🌐 Frontend → [fx_creations_studio_frontend](https://github.com/kishanth29/fx_creations_studio_frontend)
* 🛠️ Admin → [fx_creations_admin](https://github.com/kishanth29/fx_creations_admin)
* ⚙️ Backend → [fx_creation_backend](https://github.com/kishanth29/fx_creation_backend)
* 🧩 Combined Repo → [fx_creations_full](https://github.com/kishanth29/fx_creations_full)

---

## 👨‍💻 Author

**Nanthakumar Kishanth**
Full Stack Developer | AI-Integrated Software Engineer
🌍 [GitHub Profile](https://github.com/kishanth29)

````

---

You can copy that into your **`README.md`** and commit it:

```bash
git add README.md
git commit -m "Added detailed project README for FX Creations full stack app"
git push
````

