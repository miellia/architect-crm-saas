# Architect CRM — Technical Documentation

>Customer Relationship Management platform built with Next.js, MongoDB, and Clerk.

---

## Table of Contents

- [1. Project Overview](#1-project-overview)
- [2. Core Features](#2-core-features)
- [3. System Architecture](#3-system-architecture)
- [4. Tech Stack](#4-tech-stack)
- [5. Project Structure](#5-project-structure)
- [6. Data Models](#6-data-models)
- [7. API Design](#7-api-design)
- [8. State Management](#8-state-management)
- [9. Authentication & Authorization](#9-authentication--authorization)
- [10. Key Design Decisions](#10-key-design-decisions)
- [11. Getting Started](#11-getting-started)
- [12. Future Improvements](#12-future-improvements)

---

## 1. Project Overview

### Purpose

Architect CRM is a full-stack, multi-tenant SaaS application designed for managing professional relationships, sales pipelines, and business analytics. It provides a dashboard, contact management system, and a Kanban-style deal pipeline, all secured with user authentication and data isolation.

### Target Users

| Audience | Use Case |
|----------|----------|
| **Small Businesses** | Manage client relationships and sales pipeline |
| **Sales Teams** | Track deals through Prospecting → Qualification → Proposal → Closed Won |
| **Freelancers / Consultants** | Maintain a personal CRM with private data |
| **Architectural Firms** | Enterprise contract management (domain-specific branding) |

### Key Principles

- **Privacy by default** — Each user sees only their own data. Users can only access their  own data.
- **API-first** — All mutations flow through RESTful API routes. The frontend never writes directly to the database.
- **Pessimistic updates** — UI state updates only after the API confirms success, ensuring data consistency.

---

## 2. Core Features

### Contact Management
- Full CRUD operations (create, read, update, delete)
- Searchable/filterable contact table (by name and email)
- Contact detail pages with associated deals
- CSV export of the current contact view
- Inline editing via modal forms with Zod validation

### Deals Pipeline
- Kanban board with four stages: **Prospecting → Qualification → Proposal → Closed Won**
- Drag-and-drop deal movement between stages
- Stage-based filtering via pill toggles
- New deal creation modal with contact picker
- Real-time deal count and value aggregation per column

### Dashboard Analytics
- Performance overview with computed statistics:
  - Total Revenue (sum of all deal values)
  - Active Deals (deals not in "won" stage)
  - Total Contacts (with date-range filtering)
  - Conversion Rate (won deals / total deals)
- Date range cycling (Last 30 / 60 / 90 days / All Time)
- JSON data export (contacts + deals)
- Recent activity timeline
- Upcoming tasks feed

### Authentication
- Clerk-powered sign-in / sign-up flows
- Middleware-level route protection
- Automatic redirect of unauthenticated users to `/sign-in`
- `<UserButton />` in the navigation bar for session management

### Multi-User Data Isolation
- Every database document is stamped with a `userId` field
- All API queries are scoped to the authenticated user's ID
- Users cannot read, modify, or delete data belonging to other users

---

## 3. System Architecture

### High-Level Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌──────────────────┐     ┌───────────┐
│   UI Layer  │────▶│   Zustand   │────▶│  Next.js API     │────▶│  MongoDB  │
│  (React)    │◀────│   (Cache)   │◀────│  Routes          │◀────│           │
└─────────────┘     └─────────────┘     └──────────────────┘     └───────────┘
                                              │
                                              ▼
                                        ┌───────────┐
                                        │   Clerk   │
                                        │  (Auth)   │
                                        └───────────┘
```

### Layer Responsibilities

| Layer | Technology | Responsibility |
|-------|-----------|----------------|
| **UI** | React 19, Tailwind CSS | Renders pages, handles user interactions, dispatches actions |
| **State** | Zustand | Reactive UI cache. Stores contacts & deals in memory after API fetch |
| **API** | Next.js Route Handlers | RESTful CRUD endpoints. Validates auth, queries MongoDB, serializes responses |
| **Database** | MongoDB + Mongoose | Persistent storage. Schema validation, indexing, and document relationships |
| **Auth** | Clerk | User authentication, session management, middleware-level route protection |

### Request Lifecycle (Example: Creating a Contact)

1. User fills out the contact form and clicks "Save"
2. `ContactForm` calls `useCrmStore.addContact(data)`
3. Zustand action fires `axios.post('/api/contacts', data)`
4. API route handler:
   - Extracts `userId` from Clerk's `auth()`
   - Validates required fields (`name`, `email`)
   - Calls `Contact.create({ ...body, userId })`
   - Serializes the Mongoose document (converts `_id` to `id`, strips `userId`)
   - Returns `201 Created` with the serialized contact
5. Zustand receives the response and prepends it to the contacts array
6. React re-renders the contact table with the new entry

---

## 4. Tech Stack

### Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.2.2 | React framework with App Router |
| `react` | 19.2.4 | UI library |
| `tailwindcss` | 4.x | Utility-first CSS |
| `lucide-react` | 1.7.x | Icon library |
| `clsx` + `tailwind-merge` | — | Conditional class utilities |

### State Management

| Package | Version | Purpose |
|---------|---------|---------|
| `zustand` | 5.x | Lightweight reactive store |
| `axios` | 1.14.x | HTTP client for API communication |

### Backend

| Package | Version | Purpose |
|---------|---------|---------|
| `mongoose` | 9.4.x | MongoDB ODM with schema validation |
| Next.js Route Handlers | — | RESTful API endpoints (`/api/*`) |

### Authentication

| Package | Version | Purpose |
|---------|---------|---------|
| `@clerk/nextjs` | 7.x | Auth provider, middleware, server-side `auth()` |

### Form Handling

| Package | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | 7.x | Performant form state management |
| `zod` | 4.x | Schema-based form validation |

---

## 5. Project Structure

```
architect-crm/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Dashboard (/)
│   │   ├── layout.tsx                # Root layout (ClerkProvider, nav, init)
│   │   ├── contacts/
│   │   │   ├── page.tsx              # Contact list (/contacts)
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Contact detail (/contacts/:id)
│   │   ├── deals/
│   │   │   └── page.tsx              # Deals pipeline (/deals)
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx          # Clerk sign-in
│   │   ├── sign-up/
│   │   │   └── [[...sign-up]]/
│   │   │       └── page.tsx          # Clerk sign-up
│   │   └── api/
│   │       ├── contacts/
│   │       │   ├── route.ts          # GET all, POST create
│   │       │   └── [id]/
│   │       │       └── route.ts      # GET one, PUT update, DELETE
│   │       └── deals/
│   │           ├── route.ts          # GET all, POST create
│   │           └── [id]/
│   │               └── route.ts      # PUT update, DELETE
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SideNavBar.tsx        # Dynamic sidebar with usePathname
│   │   │   └── TopNavBar.tsx         # Top bar with Clerk UserButton
│   │   ├── contacts/
│   │   │   ├── ContactTable.tsx      # Filterable table with CSV export
│   │   │   ├── ContactForm.tsx       # Create/edit form
│   │   │   └── AssociatedDeal.tsx    # Deal display on contact detail
│   │   ├── deals/
│   │   │   ├── KanbanColumn.tsx      # Pipeline column container
│   │   │   ├── KanbanCard.tsx        # Individual deal card
│   │   │   └── DealForm.tsx          # Deal creation form
│   │   └── shared/
│   │       ├── Modal.tsx             # Reusable modal overlay
│   │       ├── PageHeader.tsx        # Page title + action buttons
│   │       ├── StatCard.tsx          # Dashboard metric card
│   │       ├── TimelineItem.tsx      # Activity timeline entry
│   │       ├── ContactAvatar.tsx     # Initials avatar
│   │       ├── StoreInitializer.tsx  # Fetches data on mount
│   │       └── NewRecordModal.tsx    # Global contact creation modal
│   ├── lib/
│   │   └── db.ts                     # Mongoose connection singleton
│   ├── models/
│   │   ├── Contact.ts                # Contact Mongoose schema
│   │   └── Deal.ts                   # Deal Mongoose schema
│   ├── store/
│   │   └── useCrmStore.ts            # Zustand store (contacts, deals, UI state)
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   └── middleware.ts                 # Clerk route protection
├── .env.local                        # Environment variables
├── package.json
└── tsconfig.json
```

---

## 6. Data Models

### Contact

```typescript
interface IContact {
  _id: ObjectId;           // MongoDB auto-generated
  userId: string;          // Clerk user ID (indexed)
  name: string;            // Required
  email: string;           // Required
  phone: string;           // Required
  company: string;         // Required
  createdAt: Date;         // Default: Date.now
}
```

### Deal

```typescript
interface IDeal {
  _id: ObjectId;           // MongoDB auto-generated
  userId: string;          // Clerk user ID (indexed)
  title: string;           // Required
  value: number;           // Required (dollar amount)
  stage: DealStage;        // "lead" | "qualified" | "proposal" | "won"
  contactId: ObjectId;     // Reference to Contact (required)
}
```

### Frontend Types (Serialized)

The API strips `_id` and `userId` before returning data to the frontend. The client works with:

```typescript
interface Contact {
  id: string;              // Stringified _id
  name: string;
  email: string;
  phone: string;
  company: string;
  createdAt: Date;
}

interface Deal {
  id: string;              // Stringified _id
  title: string;
  value: number;
  stage: DealStage;
  contactId: string;       // Stringified ObjectId
}
```

### Data Isolation Logic

Every database query includes `userId` as a filter condition:

```typescript
// READ — only user's data
Contact.find({ userId })

// CREATE — stamp ownership
Contact.create({ ...body, userId })

// UPDATE — scoped to user
Contact.findOneAndUpdate({ _id: id, userId }, body)

// DELETE — scoped to user
Contact.findOneAndDelete({ _id: id, userId })
```

---

## 7. API Design

### Contacts

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/contacts` | List all contacts for current user | ✅ |
| `POST` | `/api/contacts` | Create a new contact | ✅ |
| `GET` | `/api/contacts/[id]` | Get single contact by ID | ✅ |
| `PUT` | `/api/contacts/[id]` | Update a contact | ✅ |
| `DELETE` | `/api/contacts/[id]` | Delete contact + cascade delete deals | ✅ |

### Deals

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/deals` | List all deals for current user | ✅ |
| `POST` | `/api/deals` | Create a new deal | ✅ |
| `PUT` | `/api/deals/[id]` | Update a deal (stage, value, etc.) | ✅ |
| `DELETE` | `/api/deals/[id]` | Delete a deal | ✅ |

### Response Format

**Success:**
```json
{ "id": "abc123", "name": "Elena Rodriguez", "email": "elena@example.com", ... }
```

**Error:**
```json
{ "error": "Name and email are required" }
```

### Status Codes

| Code | Usage |
|------|-------|
| `200` | Successful read/update/delete |
| `201` | Successful creation |
| `400` | Validation error or bad request |
| `401` | Unauthorized (no valid session) |
| `404` | Resource not found (or not owned by user) |
| `500` | Internal server error |

---

## 8. State Management

### Zustand Store (`useCrmStore`)

The store acts as a **reactive UI cache** — not a source of truth. MongoDB is the source of truth.

```
┌──────────────────────────────────────────────────┐
│                  useCrmStore                     │
├──────────────────────────────────────────────────┤
│  State:                                          │
│    contacts: Contact[]                           │
│    deals: Deal[]                                 │
│    isLoaded: boolean                             │
│    isNewRecordModalOpen: boolean                 │
│                                                  │
│  Actions:                                        │
│    fetchInitialData()     → GET /api/contacts    │
│                           → GET /api/deals       │
│    addContact(data)       → POST /api/contacts   │
│    updateContact(id, d)   → PUT /api/contacts/id │
│    deleteContact(id)      → DELETE /api/contacts │
│    addDeal(data)          → POST /api/deals      │
│    updateDeal(id, d)      → PUT /api/deals/id    │
│    deleteDeal(id)         → DELETE /api/deals/id │
│    getContactById(id)     → local lookup         │
│    getDealsByContact(id)  → local filter         │
│    setNewRecordModalOpen() → UI toggle           │
└──────────────────────────────────────────────────┘
```

### Sync Strategy: Pessimistic Updates

```typescript
// Every mutation follows this pattern:
addContact: async (c) => {
  const res = await axios.post('/api/contacts', c);  // 1. Call API first
  set((state) => ({ contacts: [res.data, ...state.contacts] }));  // 2. Update UI after success
}
```

- The UI does **not** update until the API responds with a `2xx` status.
- If the API call fails, the UI remains unchanged (no stale state).
- `getContactById` and `getDealsByContact` are synchronous local lookups for read performance.

### Initialization

On app mount, `<StoreInitializer />` calls `fetchInitialData()` once:

```typescript
// Fires a parallel fetch for both collections
const [contactsRes, dealsRes] = await Promise.all([
  axios.get('/api/contacts'),
  axios.get('/api/deals')
]);
set({ contacts: contactsRes.data, deals: dealsRes.data, isLoaded: true });
```

---

## 9. Authentication & Authorization

### Clerk Integration

| Component | Location | Purpose |
|-----------|----------|---------|
| `<ClerkProvider>` | `layout.tsx` | Wraps entire app with auth context |
| `<ClerkLoading>` | `layout.tsx` | Shows loading spinner during auth initialization |
| `<ClerkLoaded>` | `layout.tsx` | Renders app shell only after auth is ready |
| `<SignIn />` | `/sign-in` | Clerk's pre-built sign-in UI |
| `<SignUp />` | `/sign-up` | Clerk's pre-built sign-up UI |
| `<UserButton />` | `TopNavBar.tsx` | User avatar with session controls |
| `auth()` | API routes | Server-side user ID extraction |

### Middleware Route Protection

```typescript
// src/middleware.ts
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();  // Redirects to /sign-in if unauthenticated
  }
});
```

**Protected routes:** `/`, `/contacts`, `/deals`, `/api/*`
**Public routes:** `/sign-in`, `/sign-up`

### API-Level Authorization

Every API route independently verifies the user:

```typescript
const { userId } = await auth();
if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
```

This provides **defense in depth** — even if middleware is bypassed, the API routes refuse unauthenticated requests.

---

## 10. Key Design Decisions

### Why MongoDB over SQL?

| Factor | MongoDB | SQL (PostgreSQL) |
|--------|---------|-------------------|
| **Schema flexibility** | ✅ Contacts and deals can evolve without migrations | ❌ Requires ALTER TABLE |
| **JSON-native** | ✅ Documents map directly to JavaScript objects | ❌ Requires ORM translation |
| **Multi-tenancy** | ✅ Simple `userId` field per document | ✅ Also possible but more complex |
| **Deployment** | ✅ MongoDB Atlas free tier | ✅ Various options |

MongoDB was chosen for its natural fit with JavaScript-heavy full-stack projects and schema evolution speed during early-stage development.

### Why Zustand over Redux / Context API?

| Factor | Zustand | Redux | Context API |
|--------|---------|-------|-------------|
| **Boilerplate** | Minimal | Heavy (actions, reducers, types) | Low but messy at scale |
| **Bundle size** | ~1KB | ~7KB+ | 0 (built-in) |
| **Async actions** | First-class | Requires middleware (thunk/saga) | Manual |
| **DevEx** | Simple `create()` API | Steep learning curve | Re-render issues |

Zustand provides a clean, minimal API that works naturally with async operations (API calls) without additional middleware.

### Why Clerk over NextAuth / Custom Auth?

| Factor | Clerk | NextAuth | Custom |
|--------|-------|----------|--------|
| **Time to implement** | Minutes | Hours | Days |
| **Pre-built UI** | ✅ SignIn, SignUp, UserButton | ❌ Build your own | ❌ Build your own |
| **Multi-tenancy** | ✅ Built-in | ❌ Manual | ❌ Manual |
| **Maintenance** | Managed service | Self-maintained | Full ownership |

Clerk was chosen for rapid iteration. The pre-built components and server-side `auth()` helper eliminate 90% of authentication boilerplate.

---

## 11. Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- [Clerk](https://clerk.com) account with application keys

### Environment Variables

Create a `.env.local` file in the project root:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/architect-crm
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/sign-in` if not authenticated.

### Production Build

```bash
npm run build
npm start
```

### Deployment (Vercel)

1. Connect the repository to [Vercel](https://vercel.com)
2. Add environment variables in the Vercel dashboard
3. Deploy — Vercel auto-detects Next.js and configures the build

---

## 12. Future Improvements

| Priority | Feature | Description |
|----------|---------|-------------|
| 🔴 High | **Roles & Permissions** | Admin/member roles, team-level data sharing |
| 🔴 High | **Error Toasts** | User-facing feedback for failed API operations |
| 🟡 Medium | **Pagination** | Server-side pagination for large datasets |
| 🟡 Medium | **Notifications** | In-app notifications for deal updates and task reminders |
| 🟡 Medium | **Email Integration** | Send/track emails directly from contact profiles |
| 🟢 Low | **Advanced Analytics** | Charts with real data (recharts/chart.js), revenue forecasting |
| 🟢 Low | **Activity Logging** | Audit trail of all create/update/delete operations |
| 🟢 Low | **Import/Export** | Bulk CSV import, vCard integration |
| 🟢 Low | **Dark Mode Toggle** | User-controlled theme switching (CSS vars already in place) |

---

## License

This project is proprietary software. All rights reserved.

---

Built with Next.js, React, MongoDB, and Clerk.
