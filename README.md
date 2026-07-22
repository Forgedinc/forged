# FORGED

> Premium streetwear e-commerce. First Drop 09.09.2026.

Built with **Next.js 15**, **React 18**, **Tailwind CSS**, **Framer Motion**, **MongoDB** and **Stripe Checkout**.

---

## Windows 11 setup (npm)

### 1. Requirements

- **Node.js 20 LTS or newer** → https://nodejs.org (comes bundled with npm)
- **Git** (optional) → https://git-scm.com
- **VS Code** → https://code.visualstudio.com
- **MongoDB** → either install locally (https://www.mongodb.com/try/download/community) or use a free cluster on MongoDB Atlas (https://www.mongodb.com/cloud/atlas)

Verify Node & npm from PowerShell:

```powershell
node --version    # should print v20.x or higher
npm --version     # should print 10.x or higher
```

### 2. Install dependencies

Open the project folder in VS Code, open the integrated terminal (`` Ctrl + ` ``) and run:

```powershell
npm install
```

This will install everything from `package.json` (Next 15, React, Tailwind, Framer Motion, MongoDB driver, etc.).

### 3. Environment variables

Copy the example file to `.env.local`:

```powershell
copy .env.local.example .env.local
```

Then edit `.env.local` with your values:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=forged
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_your_key_here
```

> If you don't have MongoDB installed you can leave `MONGO_URL` as is — the app will still work without persisting orders (checkout works in mock mode).
>
> If you don't have a Stripe key, leave `STRIPE_SECRET_KEY` empty — the checkout will simulate a successful payment and redirect to `/success`.

### 4. Run the dev server

```powershell
npm run dev
```

Open your browser at **http://localhost:3000**.

### 5. Access the shop

- **Landing page**: `/`
- **Password gate**: `/gate` — use password **`forged001`**
- **Shop**: `/shop`
- **Product page**: `/shop/vault-hoodie-obsidian` (and other slugs)
- **Checkout**: `/checkout`

---

## Build for production

```powershell
npm run build
npm start
```

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it into https://vercel.com/new
3. Add the environment variables in the Vercel dashboard (same as `.env.local`).
4. Deploy.

---

## Project structure

```
forged/
├── app/
│   ├── api/[[...path]]/route.js   → Backend API (products, gate, checkout, Stripe)
│   ├── gate/page.js               → Password gate
│   ├── shop/page.js               → Product listing
│   ├── shop/[slug]/page.js        → Product detail
│   ├── checkout/page.js           → Checkout form
│   ├── success/page.js
│   ├── cancel/page.js
│   ├── page.js                    → Landing (black + FORGED logo)
│   ├── layout.js
│   ├── providers.js
│   ├── sitemap.js
│   └── globals.css
├── components/
│   ├── Navbar.js
│   ├── CartDrawer.js
│   ├── Countdown.js
│   ├── CursorEffect.js
│   └── Footer.js
├── lib/
│   ├── cart-context.js            → React Context for cart state
│   ├── products.js                → Product catalog (8 items)
│   └── utils.js
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── .env.local.example
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── components.json
└── package.json
```

---

## Troubleshooting on Windows

**"npm run dev" doesn't start**
1. Make sure Node.js is 20+ (`node --version`).
2. Delete `node_modules` and `package-lock.json`, then run `npm install` again.
3. If PowerShell blocks scripts, run once as admin: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

**MongoDB connection error**
- If you don't need order persistence, ignore — the app still runs.
- Otherwise install MongoDB Community or use Atlas.

**Port 3000 already in use**
- Run `npm run dev -- -p 3001` to use port 3001.

---

## Password

**`forged001`**
