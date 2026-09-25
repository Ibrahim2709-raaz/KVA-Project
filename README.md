# Kamloops Volleyball Association Website

A fast, accessible, multi-page website for the Kamloops Volleyball Association (KVA). The site helps youth athletes, adult players, families, coaches, and community partners find the right volleyball opportunity in Kamloops.

## Live site

[ibrahim2709-raaz.github.io/KVA-Project](https://ibrahim2709-raaz.github.io/KVA-Project/)

## Highlights

- Consistent, responsive design system across all pages
- Youth program and tryout guidance
- Adult league and division information
- Optimized photo and video gallery
- Accessible contact form with native and enhanced validation
- Keyboard-friendly navigation, skip links, visible focus states, and reduced-motion support
- Search-friendly titles, descriptions, `robots.txt`, sitemap, and custom 404 page
- Zero-build static architecture for reliable GitHub Pages hosting

## Technology

- Semantic HTML5
- Modern CSS with custom properties, grid, flexbox, and responsive layouts
- Vanilla JavaScript with progressive enhancement
- Web3Forms for contact form delivery
- GitHub Pages for hosting and deployment

The project intentionally avoids a framework. For a content-focused site of this size, static HTML, shared CSS, and a small JavaScript file provide excellent performance, accessibility, and maintainability without a build pipeline or runtime dependency.

## Project structure

```text
KVA-Project/
├── assets/
│   ├── site.css           # Shared design system and responsive styles
│   └── site.js            # Navigation, reveal, slider, and form behavior
├── About Us/              # Organization story and values
├── Adult Club/            # Adult league information
├── Contact Us/            # Contact form and details
├── Gallery/               # Photos and videos
├── Images/                # Shared image assets
├── Youth club/            # Youth program and tryout information
├── 404.html               # Branded not-found page
├── index.html             # Homepage
├── robots.txt             # Search crawler guidance
└── sitemap.xml            # Public page index
```

## Run locally

Clone the repository and serve the project root with any static web server:

```bash
git clone https://github.com/Ibrahim2709-raaz/KVA-Project.git
cd KVA-Project
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Content maintenance

- Shared styles belong in `assets/site.css`.
- Shared interaction behavior belongs in `assets/site.js`.
- Keep season-specific dates, fees, and availability current before publishing them.
- Add descriptive alternative text to meaningful images.
- Compress new images and prefer broadly supported MP4 video for web delivery.
- Test navigation and forms with both keyboard and mobile layouts.

## Deployment

The `main` branch deploys automatically through GitHub Pages. After a merge or direct update, verify the latest Pages workflow and then check the live site.

## Author

[Ibrahim Salman](https://github.com/Ibrahim2709-raaz)
