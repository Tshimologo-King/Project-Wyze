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
  // Find all careers starting with T
  const tCareers = await prisma.career.findMany({
    where: {
      name: {
        startsWith: "T",
        mode: "insensitive",
      },
    },
    orderBy: { name: "asc" },
  });

  console.log(`Found ${tCareers.length} careers starting with 'T':`);
  tCareers.forEach(career => {
    console.log(`- ${career.name}`);
  });

  // Check for duplicates
  const careerNames = tCareers.map(c => c.name.toLowerCase());
  const duplicates = careerNames.filter((name, index) => careerNames.indexOf(name) !== index);

  if (duplicates.length > 0) {
    console.log(`\n⚠️  Found ${duplicates.length} duplicate(s):`);
    duplicates.forEach(name => console.log(`  - ${name}`));
  } else {
    console.log(`\n✅ No duplicates found in T careers!`);
  }

  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
