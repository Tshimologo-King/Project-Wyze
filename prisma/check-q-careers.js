// Load environment from Next.js context
const path = require("path");
const fs = require("fs");

// Read .env.local directly
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach(line => {
    if (line.trim() && !line.startsWith("#")) {
      const [key, ...valueParts] = line.split("=");
      if (key && valueParts.length > 0) {
        let value = valueParts.join("=").trim();
        // Remove surrounding quotes
        value = value.replace(/^["']|["']$/g, "");
        process.env[key] = value;
      }
    }
  });
}

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const careers = await prisma.career.findMany({
    where: {
      name: {
        contains: "Q",
        mode: "insensitive"
      }
    },
    select: { id: true, name: true },
    orderBy: { name: "asc" }
  });

  console.log(`Found ${careers.length} careers starting with 'Q':`);
  careers.forEach(career => {
    console.log(`  - ${career.name}`);
  });

  // Check for duplicates
  const nameCount = {};
  let hasDuplicates = false;
  careers.forEach(career => {
    nameCount[career.name] = (nameCount[career.name] || 0) + 1;
    if (nameCount[career.name] > 1) {
      hasDuplicates = true;
    }
  });

  if (hasDuplicates) {
    console.log("\n⚠️  DUPLICATES FOUND:");
    Object.entries(nameCount).forEach(([name, count]) => {
      if (count > 1) {
        console.log(`  - "${name}" appears ${count} times`);
      }
    });
  } else {
    console.log("\n✅ No duplicates found in Q careers!");
  }

  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
