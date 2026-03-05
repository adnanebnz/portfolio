import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const slugs = [
  "tawsil-star-vtc",
  "tawsil-star-expeditor",
  "da-mall",
  "algeria-eats",
  "wamidh",
  "waffir",
  "dzhikers",
  "movies-app",
];

async function main() {
  for (const slug of slugs) {
    await prisma.project.updateMany({
      where: { slug },
      data: { architectureDiagram: true },
    });
    console.log("✅", slug);
  }
  console.log("🎉 Done!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
