import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const projects = await prisma.project.findMany({
    select: { slug: true, architectureDiagram: true },
  });
  console.log(JSON.stringify(projects, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
