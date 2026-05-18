# SmartLeads Dashboard

A full-stack Lead Management System built with the MERN stack, TypeScript, and clean architecture.

---

## Tech Stack

**Frontend:** React 18, TypeScript, Tailwind CSS, Zustand, React Hook Form + Zod, Axios, React Router v6

**Backend:** Node.js, Express, TypeScript, MongoDB + Mongoose, JWT, bcryptjs, Zod

**DevOps:** Docker, Docker Compose, Nginx

---

## Features

- ✅ JWT Authentication (Register / Login / Protected Routes)
- ✅ Full CRUD for Leads
- ✅ Advanced Filtering: status, source, search (debounced), sort
- ✅ Server-side Pagination (10 per page)
- ✅ Role-Based Access Control (Admin / Sales)
- ✅ CSV Export (Admin only, respects active filters)
- ✅ Debounced Search (500ms)
- ✅ Dark Mode support
- ✅ Responsive UI
- ✅ Loading & empty states

---

## Project Structure

```
smart-leads/
├── backend/
│   ├── src/
│   │   ├── config/         # DB connection
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # auth, error, validate
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routers
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript interfaces & enums
│   │   ├── utils/          # jwt, apiResponse, validators
│   │   └── app.ts          # Express entry point
│   ├── Dockerfile
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI + feature components
│   │   │   └── ui/         # Button, Input, Select, Modal, Badge
│   │   ├── hooks/          # useLeads, useDebounce, useDarkMode
│   │   ├── layouts/        # DashboardLayout
│   │   ├── pages/          # Login, Register, Dashboard, Leads
│   │   ├── services/       # API calls (auth, leads)
│   │   ├── store/          # Zustand auth store
│   │   ├── types/          # Shared TypeScript types
│   │   └── utils/          # formatDate, validators (Zod), helpers
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## Local Development

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)

### 1. Clone & install

```bash
git clone <your-repo-url>
cd smart-leads

# Backend
cd backend
cp .env.example .env   # fill in your values
npm install
npm run dev            # runs on :5000

# Frontend (new terminal)
cd ../frontend
cp .env.example .env
npm install
npm run dev            # runs on :5173
```

### 2. Environment variables

### 3. Environment templates

Create the following files before submitting or sharing the repo:

- `backend/.env.example`
- `frontend/.env.example`

They should mirror the keys shown below (with safe placeholder values).

**backend/.env**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-leads
JWT_SECRET=your_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```

---

## Docker (All-in-one)

```bash
# From project root
docker-compose up --build
```

Services:
- Frontend → http://localhost:5173
- Backend  → http://localhost:5000
- MongoDB  → localhost:27017

---

## API Documentation

### Auth

| Method | Endpoint             | Access | Body |
|--------|----------------------|--------|------|
| POST   | /api/auth/register   | Public | `{ name, email, password, role? }` |
| POST   | /api/auth/login      | Public | `{ email, password }` |

### Leads

| Method | Endpoint              | Access | Description |
|--------|-----------------------|--------|-------------|
| GET    | /api/leads            | All    | List with filters & pagination |
| GET    | /api/leads/:id        | All    | Single lead |
| POST   | /api/leads            | Admin  | Create lead |
| PUT    | /api/leads/:id        | Admin  | Update lead |
| DELETE | /api/leads/:id        | Admin  | Delete lead |
| GET    | /api/leads/export/csv | Admin  | CSV download |

### Query Parameters for GET /api/leads

| Param  | Values                            | Example           |
|--------|-----------------------------------|-------------------|
| status | New, Contacted, Qualified, Lost   | `?status=Qualified` |
| source | Website, Instagram, Referral      | `?source=Instagram` |
| search | any string                        | `?search=rahul` |
| sort   | latest (default), oldest          | `?sort=oldest` |
| page   | number (default: 1)               | `?page=2` |

### Example response (paginated)

```json
{
  "success": true,
  "data": [ { "_id": "...", "name": "Rahul", "email": "...", "status": "Qualified", "source": "Instagram", "createdAt": "..." } ],
  "page": 1,
  "totalPages": 5,
  "total": 48,
  "limit": 10
}
```

---

## Roles

| Feature       | Admin | Sales |
|---------------|-------|-------|
| View leads    | ✅    | ✅    |
| Search/filter | ✅    | ✅    |
| Create lead   | ✅    | ❌    |
| Edit lead     | ✅    | ❌    |
| Delete lead   | ✅    | ❌    |
| Export CSV    | ✅    | ❌    |

---

## Deployment

- **Frontend** → [Vercel](https://vercel.com) — connect repo, set `VITE_API_URL` env var
- **Backend** → [Render](https://render.com) or [Railway](https://railway.app) — set all env vars
- **MongoDB** → [MongoDB Atlas](https://cloud.mongodb.com)

Live demo (add your link): <your-deployment-url>

---

## Evaluation Checklist

- [x] TypeScript throughout — no `any`, proper interfaces/enums
- [x] Small reusable components (Button, Input, Select, Badge, Modal)
- [x] Custom hooks (useLeads, useDebounce, useDarkMode)
- [x] Service layer separates API calls from UI
- [x] Backend: controller → service → model pattern
- [x] Zod validation on both frontend and backend
- [x] Centralized error handling middleware
- [x] Auth middleware + role-based authorization
- [x] Debounced search (500ms)
- [x] Server-side pagination with metadata
- [x] CSV export with active filters
- [x] Loading states, empty states, error states
- [x] Responsive design
- [x] Dark mode
- [x] Docker Compose

---

## Submission Checklist

- GitHub Repository URL
- Deployment Link
- Updated Resume
- API Documentation (this README)
- Setup Instructions (this README)
- `.env.example` files in `backend/` and `frontend/`
