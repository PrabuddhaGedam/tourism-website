# 🌍 10X THINK Tourism — Website

A modern, premium, fully responsive tourism website built with pure HTML5, CSS3, and vanilla JavaScript.

---

## 📁 File Structure

```
10x-think-tourism/
├── index.html       ← Main HTML file (all sections)
├── style.css        ← Complete CSS (animations, dark mode, responsive)
├── script.js        ← All JavaScript functionality
└── README.md        ← This file
```

---

## ✨ Features

### Sections

| #   | Section                   | Features                                                                                |
| --- | ------------------------- | --------------------------------------------------------------------------------------- |
| 1   | **Hero Banner**           | Auto-rotating slideshow (4 slides), zoom animation, stats bar, scroll hint              |
| 2   | **Search**                | Destination, check-in/out dates, travelers, form validation                             |
| 3   | **Featured Destinations** | 7 cards (Goa, Kashmir, Dubai, Bali, Thailand, Maldives, Europe) with modal detail popup |
| 4   | **Holiday Packages**      | 5 package types with color-coded cards                                                  |
| 5   | **Why Choose Us**         | 5 USP cards with icons and hover animation                                              |
| 6   | **Testimonials**          | Auto-scrolling carousel with 6 reviews                                                  |
| 7   | **Gallery**               | Masonry grid with hover effects and lightbox                                            |
| 8   | **Blog**                  | 3 travel guide cards                                                                    |
| 9   | **About Us**              | Mission & Vision with floating badge                                                    |
| 10  | **FAQ**                   | Accordion with smooth open/close                                                        |
| 11  | **Contact**               | Form with validation + Google Maps embed + WhatsApp button                              |
| 12  | **Footer**                | Links, social icons, newsletter subscription                                            |

### Extra Features

- 🌙 **Dark / Light Mode Toggle** — persists via localStorage
- 📱 **Fully Mobile Responsive** — tested from 320px to 4K
- 🎞 **Scroll Reveal Animations** — staggered entrance with IntersectionObserver
- 🖼 **Lightbox Gallery** — click any photo to zoom
- 💬 **Floating WhatsApp Button** — with tooltip
- ⬆️ **Back to Top Button** — smooth scroll
- 🔍 **Search Form Validation** — all fields required with date logic
- 📬 **Contact Form Validation** — live validation with success feedback
- 📧 **Newsletter Subscription** — with success notification
- 🗺 **Destination Modals** — rich detail popup for each destination
- 🍔 **Hamburger Mobile Nav** — accessible with aria attributes
- 🔗 **Active Nav Link Highlight** — follows scroll position
- 🏎 **Performance Optimized** — lazy-loaded images, passive scroll listeners

---

## 🎨 Design System

### Color Palette

| Name          | Hex       | Usage                           |
| ------------- | --------- | ------------------------------- |
| Navy Blue     | `#0A2540` | Primary brand, navbar, footer   |
| Sky Blue      | `#00B4D8` | CTAs, links, accents            |
| Golden Yellow | `#FFD166` | Highlight, hero badge, ratings  |
| White         | `#FFFFFF` | Backgrounds, text on dark       |
| Off White     | `#F4F8FC` | Section alternating backgrounds |

### Typography

| Role    | Font             | Usage                    |
| ------- | ---------------- | ------------------------ |
| Display | Playfair Display | Section titles, hero     |
| Body    | Inter            | Paragraphs, UI labels    |
| Utility | Space Grotesk    | Numbers, eyebrows, brand |

---

## 🚀 Getting Started

### Option 1 — Open Directly

Just double-click `index.html` — no server needed for basic use.

### Option 2 — Local Server (recommended for maps)

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```

Then open `http://localhost:8000`

---

## 🔧 Customization Guide

### Change Business Details

In `index.html`, search and replace:

- `+91 99999 99999` → Your phone number
- `hello@10xthink.com` → Your email
- `123, Travel Plaza, MG Road, Nagpur` → Your address
- WhatsApp link (`wa.me/919999999999`) → Your WhatsApp number

### Update Google Maps

Find the `<iframe>` inside `#contact` section and replace the `src` with your own Google Maps embed URL:

1. Go to maps.google.com → your location → Share → Embed a map → Copy HTML

### Add Real Package Prices

Update prices in `destData` object in `script.js` and the `.dest-price` spans in `index.html`.

### Connect a Backend (Contact Form)

In `script.js`, find the `contactForm submit` handler and replace the `setTimeout` simulation with a real `fetch()` to your backend or a service like Formspree / EmailJS.

```javascript
// Example with Formspree
const response = await fetch("https://formspree.io/f/YOUR_ID", {
  method: "POST",
  body: new FormData(contactForm),
  headers: { Accept: "application/json" },
});
```

---

## 📦 External Dependencies (CDN — no npm needed)

| Library        | Purpose                                | CDN                  |
| -------------- | -------------------------------------- | -------------------- |
| Google Fonts   | Playfair Display, Inter, Space Grotesk | fonts.googleapis.com |
| Font Awesome 6 | All icons                              | cdnjs.cloudflare.com |

Everything else is vanilla HTML5 + CSS3 + JavaScript.

---

## 🌐 SEO Checklist

- ✅ Semantic HTML5 tags (`<nav>`, `<section>`, `<article>`, `<footer>`, `<main>`)
- ✅ Meta description and keywords
- ✅ Open Graph meta tags
- ✅ `alt` text on all images
- ✅ `aria-label` on interactive elements
- ✅ Heading hierarchy (h1 → h2 → h3 → h4)
- ✅ Lazy loading on below-fold images
- ✅ Canonical URL ready (add `<link rel="canonical">`)

---

## 📱 Browser Support

| Browser                 | Support |
| ----------------------- | ------- |
| Chrome 90+              | ✅ Full |
| Firefox 88+             | ✅ Full |
| Safari 14+              | ✅ Full |
| Edge 90+                | ✅ Full |
| Mobile Safari (iOS 14+) | ✅ Full |
| Chrome Android          | ✅ Full |

---

## 📄 License

Built for **10X THINK Tourism**. All rights reserved © 2025.

---

_Made with ❤ for extraordinary travel experiences._
