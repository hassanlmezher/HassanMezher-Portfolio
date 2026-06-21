# Hassan Mezher Portfolio

Modern portfolio website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Three.js.

## Run Locally

Use Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

If port `3000` is already busy, stop the old server with `Ctrl+C` in the terminal that is running it, then run `npm run dev` again.

## Checks

```bash
npm run lint
npm run build
npm run verify:visual
```

## Preview The Static Export

```bash
npm run build
npm run preview
```

## Deploy To GitHub Pages

This repo includes `.github/workflows/deploy.yml`.

1. Push the project to GitHub.
2. Go to the repository settings.
3. Open `Pages`.
4. Set `Source` to `GitHub Actions`.
5. Push to `main` or run the workflow manually.

The workflow automatically handles the GitHub Pages base path:

- `username.github.io` repositories deploy at `/`
- normal project repositories deploy at `/<repo-name>/`

## CV

The download button uses:

```text
public/Hassan_Mezher_CV.pdf
```
