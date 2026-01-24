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

async function checkZCareers() {
  try {
    console.log('🔍 Checking Z careers for duplicates...');

    // Find all Z careers
    const zCareers = await prisma.career.findMany({
      where: {
        name: {
          startsWith: 'Z',
          mode: 'insensitive'
        }
      },
      orderBy: { name: 'asc' }
    });

    console.log(`\nFound ${zCareers.length} careers starting with 'Z':`);
    zCareers.forEach(career => {
      console.log(`  - ${career.name}`);
    });

    // Check for duplicates in Z careers
    const careerNames = zCareers.map(c => c.name.toLowerCase());
    const duplicates = careerNames.filter((name, index) => careerNames.indexOf(name) !== index);

    if (duplicates.length === 0) {
      console.log('\n✅ No duplicates found in Z careers!');
      process.exit(0);
    } else {
      console.log(`\n❌ Found ${duplicates.length} duplicate(s):`, duplicates);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

checkZCareers();
