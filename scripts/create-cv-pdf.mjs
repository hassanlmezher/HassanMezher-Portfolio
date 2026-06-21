import { mkdir, writeFile } from "node:fs/promises";

const output = "public/Hassan-Mezher-CV.pdf";

const lines = [
  { text: "Hassan Mezher", size: 24, y: 760 },
  { text: "Full-Stack Web Developer", size: 14, y: 733 },
  { text: "Lebanon | hassanmezher084@gmail.com | LinkedIn: placeholder | GitHub: placeholder", size: 10, y: 713 },
  { text: "Summary", size: 15, y: 675 },
  {
    text: "Computer Science graduate and full-stack web developer building fast, scalable, user-focused web applications across frontend and backend systems.",
    size: 10,
    y: 655,
  },
  { text: "Experience", size: 15, y: 615 },
  { text: "Full-Stack Developer Intern - Hurdle Solutions, Remote, United States | Feb 2026 - Present", size: 11, y: 594 },
  { text: "- Collaborated with a remote development team to build and maintain modern web applications.", size: 10, y: 575 },
  { text: "- Developed frontend and backend features using React, TypeScript, Next.js, Node.js, and SQL databases.", size: 10, y: 558 },
  { text: "- Participated in code reviews, Git workflows, and Agile development practices.", size: 10, y: 541 },
  { text: "- Worked with modern frameworks and tools to deliver scalable and maintainable solutions.", size: 10, y: 524 },
  { text: "Education", size: 15, y: 484 },
  { text: "Computer Science Graduate - ESGT CNAM | 2023 - 2026", size: 11, y: 463 },
  { text: "Projects", size: 15, y: 423 },
  { text: "Shopora - Full-stack e-commerce platform with buyer, seller, and admin roles.", size: 10, y: 402 },
  { text: "Family ToDo App - Collaborative group task management with lists, invites, and assignments.", size: 10, y: 385 },
  { text: "Notes App - Secure notes app with authentication, CRUD, ownership checks, and API testing.", size: 10, y: 368 },
  { text: "Budgeting App - Finance tracker for income, expenses, timestamps, and reports.", size: 10, y: 351 },
  { text: "E-commerce UI - Responsive frontend with filters, sorting, favorites, and cart sidebar.", size: 10, y: 334 },
  { text: "Trap Maze Game - JavaScript browser game with levels, localStorage, audio, and win states.", size: 10, y: 317 },
  { text: "Skills", size: 15, y: 277 },
  { text: "Frontend: React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Zustand", size: 10, y: 256 },
  { text: "Backend: Node.js, Express.js, REST APIs, SQL, PostgreSQL, MongoDB, Mongoose, Prisma, Drizzle ORM", size: 10, y: 239 },
  { text: "Tools: Git, GitHub, Docker basics, Supabase, Postman, Playwright, Vercel, PM2", size: 10, y: 222 },
  { text: "Programming: Java, Python basics, Object-Oriented Programming, Algorithms, Problem Solving", size: 10, y: 205 },
];

function escapePdfText(value) {
  return value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

const content = [
  "0.08 0.12 0.18 rg",
  "0 0 612 792 re",
  "f",
  "0.95 0.98 1 rg",
  ...lines.flatMap(({ text, size, y }) => [
    "BT",
    `/F1 ${size} Tf`,
    `50 ${y} Td`,
    `(${escapePdfText(text)}) Tj`,
    "ET",
  ]),
].join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [0];

for (const [index, object] of objects.entries()) {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
}

const xrefOffset = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (const offset of offsets.slice(1)) {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

await mkdir("public", { recursive: true });
await writeFile(output, pdf);
console.log(`Generated ${output}`);
