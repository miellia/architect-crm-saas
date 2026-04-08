## Author

Built by Mir Issa Ellia

- GitHub: https://github.com/miellia
- Portfolio: #
- Contact: miellia.dev@gmail.com

# Architect CRM

A full-stack CRM platform built with Next.js, MongoDB, and Clerk. Manage contacts, track deals through a visual pipeline, and view performance analytics — all with complete per-user data isolation.

---

## Features

- **Contact Management** — Create, edit, delete, search, and export contacts as CSV
- **Deals Pipeline** — Kanban board with drag-and-drop across four stages (Lead → Qualified → Proposal → Won)
- **Dashboard** — Real-time stats (revenue, active deals, conversion rate) with date-range filtering and JSON export
- **Authentication** — Sign-in / sign-up via Clerk with protected routes and session management
- **Multi-User Isolation** — Every record is scoped to the authenticated user. No cross-user data access.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| State | [Zustand](https://zustand-demo.pmnd.rs) |
| Database | [MongoDB](https://www.mongodb.com) + [Mongoose](https://mongoosejs.com) |
| Auth | [Clerk](https://clerk.com) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

---

## Screens

### Dashboard (`/`)
Performance overview with stat cards, sales chart, upcoming tasks, and recent activity timeline.

### Contacts (`/contacts`)
Searchable contact table with inline editing, CSV export, and contact detail pages (`/contacts/[id]`).

### Deals (`/deals`)
Kanban pipeline with stage filtering, deal creation modal, and drag-and-drop stage transitions.

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance ([Atlas](https://www.mongodb.com/atlas) or local)
- [Clerk](https://clerk.com) account

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/architect-crm.git
cd architect-crm

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/architect-crm
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to sign in.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                # Dashboard
│   ├── layout.tsx              # Root layout (ClerkProvider, nav)
│   ├── contacts/               # Contact list + detail pages
│   ├── deals/                  # Deals pipeline
│   ├── sign-in/                # Clerk sign-in
│   ├── sign-up/                # Clerk sign-up
│   └── api/
│       ├── contacts/           # Contact CRUD endpoints
│       └── deals/              # Deal CRUD endpoints
├── components/
│   ├── layout/                 # SideNavBar, TopNavBar
│   ├── contacts/               # ContactTable, ContactForm
│   ├── deals/                  # KanbanColumn, KanbanCard, DealForm
│   └── shared/                 # Modal, PageHeader, StatCard, etc.
├── lib/
│   └── db.ts                   # Mongoose connection singleton
├── models/
│   ├── Contact.ts              # Contact schema (userId indexed)
│   └── Deal.ts                 # Deal schema (userId indexed)
├── store/
│   └── useCrmStore.ts          # Zustand store
├── types/
│   └── index.ts                # TypeScript interfaces
└── middleware.ts               # Clerk route protection
```

---

## Future Improvements

- **Roles & Permissions** — Team workspaces with admin/member access
- **Notifications** — In-app alerts for deal updates and reminders
- **Email Integration** — Send and track emails from contact profiles
- **Advanced Analytics** — Interactive charts and revenue forecasting
- **Pagination** — Server-side pagination for large datasets
- **Dark Mode** — User-controlled theme toggle

---

## License

This project is proprietary software. All rights reserved.
