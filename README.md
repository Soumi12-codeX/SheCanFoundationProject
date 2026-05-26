# 🌸 She Can Foundation – Full-Stack Submission

A beautifully designed, feature-complete Full-Stack application developed for the **She Can Foundation Internship Selection Task**. 

This project goes far beyond a simple static form—it implements a contemporary, responsive user interface backed by a live cloud database engine, client-side input validation, an admin telemetry panel, and secure data-purging actions.

---

## 🔗 Live Deployments
* **Live Application URL:** https://she-can-foundation-task-sigma.vercel.app/
* **Admin Dashboard URL:**  https://she-can-foundation-task-sigma.vercel.app/admin
* **Secure Portal Key:** `admin123` *(Default testing password)*

---

## 🛠️ The Tech Stack
* **Frontend Architecture:** Semantic HTML5, Modern CSS3 Core (Custom Properties, Backdrop-Filter, CSS Grid, Flexbox)
* **Design Language:** Plus Jakarta Sans & Cormorant Garamond typography, contemporary glassmorphism accents, fluid background gradient blurs
* **Backend Engine:** Supabase RESTful Engine (PostgREST API Engine Layer)
* **Database Infrastructure:** Live PostgreSQL Cloud Instances
* **Asynchronous Transport Protocol:** Native Browser Fetch Client API using `async/await` syntax structures


---

## ⚡ Functional Feature Walkthrough

### 1. Unified Form Core & Data Ingestion
* **How it functions:** Captures structured feedback variables from the client. The ingestion pipeline runs asynchronously, parsing parameters straight to the cloud tables through JSON payloads.
* **Security Layer:** Includes automatic standard HTML5 validation blocks alongside an `escapeHtml()` mitigation utility built directly into DOM injection points to prevent Cross-Site Scripting (XSS) payload exploits.

### 2. Live Supabase Engine Integration
* **How it functions:** Employs optimized direct endpoints utilizing connection security credentials (`anon` public API tokens combined with explicit Row-Level Security parameters).
* **Telemetry Ordering:** Requests to the server automatically append data filter conditions (`?order=created_at.desc`), making sure incoming entries instantly float gracefully to the absolute top of the monitoring layout.

### 3. Secured Portal Lock Screen (`admin.html`)
* **How it functions:** When an evaluator opens the admin area, a lock screen component prevents the data script from executing. Entering the password reveals the layout and signals the backend engine to pull database records.

### 4. Dynamic Data Rows & Context-Aware Badging
* **How it functions:** Incoming data inputs (such as choosing a contact context like "volunteer", "internship", or "donation") are read by the layout engine and translated instantly into color-coded pill tags on the fly.

### 5. Optimistic CRUD Row Deletion
* **How it functions:** Clicking the "Delete" button targets the individual row identifier using standard relational syntax qualifiers (`?id=eq.${id}`). Once the remote server confirms the execution, an optimistic UI fade animation takes effect, dropping the entry from the viewport without calling a full layout refresh.

---

## 📂 Repository File Blueprint
```text
├── index.html        # Main landing view containing the application form
├── style.css         # Global style design & contact page custom layouts
├── script.js         # Contact page form submission & validation handlers
├── admin.html        # Password-protected admin panel view structure
├── adminStyle.css    # Admin dashboard specific layout & badge designs
├── adminScript.js    # Security gate, API data loading, & CRUD deletion logic
└── vercel.json       # For vercel deployment
