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

To open it on your phone, keep your phone and Mac on the same Wi-Fi and open the Network URL printed by Next. On this Mac it is usually:

```text
http://192.168.0.106:3000
```

If port `3000` is already busy, stop the old server with `Ctrl+C` in the terminal that is running it, then run `npm run dev` again.

## Checks

```bash
npm run lint
npm run build
npm run verify:visual
```

## Preview Production Locally

```bash
npm run build
npm run preview
```

Open:

```text
http://localhost:3000
```

For mobile testing, open the Network URL printed by `npm run preview`.

## Deploy To Vercel

1. Push the project to GitHub.
2. Go to Vercel and choose `Add New Project`.
3. Import the GitHub repository.
4. Keep the default framework preset as `Next.js`.
5. Use these commands:

```text
Install Command: npm install
Build Command: npm run build
Output Directory: leave the Vercel default
```

No custom environment variables are required for the current portfolio.

## CV

The download button uses:

```text
public/Hassan_Mezher_CV.pdf
```
