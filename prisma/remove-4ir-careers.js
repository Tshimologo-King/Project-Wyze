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
        process.env[key.trim()] = value;
      }
    }
  });
}

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  connectTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
  adapter,
  log: ["error"],
});

// Careers to remove - AI and 4IR related
const careersToRemove = [
  "Artificial Intelligence (AI) Specialist",
  "Data Scientist",
];

async function main() {
  try {
    console.log("Starting to remove 4IR/AI-related careers...\n");

    let removedCount = 0;
    let notFoundCount = 0;

    for (const careerName of careersToRemove) {
      const career = await prisma.career.findUnique({
        where: { name: careerName },
      });

      if (career) {
        await prisma.career.delete({
          where: { name: careerName },
        });
        console.log(`🗑️  Removed: ${careerName}`);
        removedCount++;
      } else {
        console.log(`⏭️  Not found: ${careerName}`);
        notFoundCount++;
      }
    }

    console.log(`\n✨ Removal complete!`);
    console.log(`   Removed: ${removedCount} careers`);
    console.log(`   Not found: ${notFoundCount} careers`);
    
    // Get total count
    const totalCareers = await prisma.career.count();
    console.log(`   Total careers in database: ${totalCareers}`);
    console.log(`\n📝 Note: 4IR/AI careers will be re-enabled once subscription features are implemented.`);
  } catch (error) {
    console.error("Error removing careers:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
