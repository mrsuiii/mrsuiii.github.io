# Emery Fathan Zwageri — Portfolio

Static site (HTML/CSS/JS, no build step). Content sourced from the LaTeX CV.

- Local preview: open `index.html`, or `python3 -m http.server`
- Deploy (GitHub Pages): `.github/workflows/pages.yml` publishes the site on every push to `main`.
  One-time setup: Settings > Pages > Source: **GitHub Actions**. With the repo named
  `mrsuiii.github.io` the site is served at https://mrsuiii.github.io.
- Deploy (Vercel): also auto-deploys from `main` (Framework preset: Other, no build command, output dir `.`).
