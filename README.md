# Adarsh Singh — Portfolio

Senior Frontend Engineer | React · TypeScript · Shopify Plus · Node.js

## 🚀 Deploy to Vercel (Recommended)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. Vercel auto-detects Vite. Use these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy** — done! ✅

> `vercel.json` is already configured for SPA routing and asset caching.

## 💻 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🔧 Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/       # All UI components
│   ├── styles/       # Component CSS files
│   └── utils/        # Utilities (scrollLock, splitText, etc.)
├── data/             # Project & content data
├── pages/            # Route pages (ProjectDetail)
└── context/          # React context (LoadingProvider)
public/
├── images/           # Project images (replace placeholder.webp)
└── models/           # 3D character model
```

## 🖼️ Adding Project Images

Replace `/public/images/placeholder.webp` with real project screenshots.
In `src/data/projects.ts`, update each project's `image` field:
```ts
image: "/images/your-project-screenshot.webp",
images: ["/images/proj1.webp", "/images/proj2.webp"], // gallery
```

## 📧 Contact

adarshsingh55555ac@gmail.com  
[linkedin.com/in/adarshvinodkumarsingh](https://linkedin.com/in/adarshvinodkumarsingh)  
[github.com/adarsh22-dev](https://github.com/adarsh22-dev)
# adarsh.singh.portfolio
