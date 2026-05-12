# كرسي — Kursi Website

Marketing website for **Kursi** — a WhatsApp-based barbershop booking platform for Jordan.

Live at: [kursi.now](https://kursi.now) (served via GitHub Pages)

## Pages

| File | Page |
|---|---|
| `index.html` | Homepage / Landing page |
| `pricing.html` | Pricing plans |
| `about.html` | About us / our story |
| `contact.html` | Contact us |
| `privacy.html` | Privacy policy (EN + AR) |
| `terms.html` | Terms of service (EN + AR) |

## Tech Stack

- Plain HTML + CSS + vanilla JS — no build tools, no frameworks
- Mobile-first, fully responsive
- Arabic RTL throughout (`dir="rtl"`)
- System fonts only
- GitHub Pages compatible (static files)

## Structure

```
kursi-website/
├── index.html
├── pricing.html
├── about.html
├── contact.html
├── privacy.html
├── terms.html
├── css/
│   └── style.css       ← shared design system
├── js/
│   └── main.js         ← mobile menu, FAQ accordion, scroll
├── images/
│   └── .gitkeep
├── CNAME               ← kursi.now
├── .gitignore
└── README.md
```

## Design Tokens

| Token | Value |
|---|---|
| Primary | `#1a1a2e` |
| Accent | `#7f77dd` |
| CTA (WhatsApp green) | `#25D366` |
| Max width | `1200px` |
| Border radius (cards) | `12px` |

## GitHub Pages Setup

1. Push to `kursi-admin/kursi-landing`
2. Settings → Pages → Source: `main` branch, root `/`
3. Custom domain: `kursi.now` (CNAME file already included)
4. Enable HTTPS

## Contact

- admin@kursi.now
- support@kursi.now
- WhatsApp: +962 79 507 0844
