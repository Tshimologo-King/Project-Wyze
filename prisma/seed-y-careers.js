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

const yCareers = [
  {
    name: "Youth Worker (Child & Youth Care Worker)",
    industry: "Social Services / Education",
    description:
      "A professional dedicated to the protection, development, and counseling of vulnerable children and teenagers.",
    whatItIs:
      "A registered social professional who provides therapeutic support and life skills training to at-risk youth.",
    whatTheyDo:
      "Work in schools, community centers, or for the Department of Social Development facilitating therapeutic programs for youth facing abuse or neglect. They act as mediators in dysfunctional family settings and provide crisis intervention.",
    skillsNeeded: [
      "Crisis intervention",
      "Life-skills training",
      "Empathy and compassion",
      "Knowledge of Children's Act",
      "Trauma-informed care",
      "Communication skills",
      "Problem-solving",
    ],
    certifications: [
      "Degree in Child & Youth Care Work",
      "SACSSP (South African Council for Social Service Professions) registration",
      "Trauma counseling training",
      "Child protection certifications",
    ],
    tertiaryInstitutions: [
      "Nelson Mandela University (NMU)",
      "University of Venda",
      "Durban University of Technology (DUT)",
      "University of Johannesburg (UJ)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Yoga Instructor",
    industry: "Health & Wellness",
    description:
      "A wellness professional who teaches physical postures, breathing techniques, and meditation to improve health and mindfulness.",
    whatItIs:
      "A certified wellness educator who guides clients through yoga practice for physical and mental wellbeing.",
    whatTheyDo:
      "Teach yoga classes in private studios, gyms like Virgin Active, or work as corporate wellness consultants. The industry is growing rapidly in urban hubs like Cape Town and Johannesburg.",
    skillsNeeded: [
      "Knowledge of biomechanics",
      "Injury prevention",
      "Sequence design",
      "Philosophy and spirituality",
      "Teaching and communication",
      "First aid knowledge",
      "Client assessment",
    ],
    certifications: [
      "Yoga Instructor certification (200-hour minimum)",
      "CATHSSETA accreditation",
      "REPSSA certification",
      "Yoga Alliance registration",
    ],
    tertiaryInstitutions: [
      "Trifocus Fitness Academy",
      "Soul Space Studio",
      "Yoga Alliance accredited centers",
      "Various wellness training institutions",
    ],
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  },
  {
    name: "Yard Manager (Logistics)",
    industry: "Logistics & Transportation",
    description:
      "A logistics specialist responsible for overseeing vehicle, equipment, and stock movement within a company's yard or terminal.",
    whatItIs:
      "A senior logistics professional managing yard operations for heavy transport and mining sectors.",
    whatTheyDo:
      "Oversee truck loading and unloading, maintain forklifts, coordinate fleet movement, and ensure all yard activity complies with health and safety standards. They optimize efficiency and reduce costs through effective inventory control.",
    skillsNeeded: [
      "Fleet coordination",
      "Inventory control (FIFO)",
      "Staff supervision",
      "Safety enforcement",
      "Problem-solving",
      "Equipment maintenance knowledge",
      "Planning and organization",
    ],
    certifications: [
      "Diploma in Logistics or Supply Chain Management",
      "Forklift operations certification",
      "OHSAS/OHS training",
      "Yard management certifications",
    ],
    tertiaryInstitutions: [
      "University of Johannesburg (UJ)",
      "Rosebank College",
      "IMM Graduate School",
      "Various logistics training providers",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116577-c277275794f1?w=800&q=80",
  },
  {
    name: "YouTuber / YouTube Content Creator",
    industry: "Media & Entertainment",
    description:
      "A digital media professional who produces video content for YouTube to build an audience and generate revenue.",
    whatItIs:
      "A recognized career path in 2026 where content creators build audiences and generate income through ads and brand deals.",
    whatTheyDo:
      "Produce, edit, and publish video content on YouTube. Creators like Mogelingz operate as small businesses, hiring editors and videographers. They grow audiences through consistent, quality content and monetize through advertising and sponsorships.",
    skillsNeeded: [
      "Video editing (Premiere Pro, CapCut)",
      "Storytelling and scripting",
      "SEO optimization",
      "Social media marketing",
      "Audience engagement",
      "Photography and lighting",
      "Audio engineering",
    ],
    certifications: [
      "No formal degree required",
      "Digital film and media courses",
      "YouTube Creator certification",
      "Video editing software certifications",
    ],
    tertiaryInstitutions: [
      "AFDA (Film and Performing Arts School)",
      "Vega School",
      "YouTube Creator Academy",
      "Online courses and bootcamps",
    ],
    image:
      "https://images.unsplash.com/photo-1533928298208-27ff66555d0d?w=800&q=80",
  },
  {
    name: "Yarn Technician / Textile Technologist",
    industry: "Manufacturing / Textiles",
    description:
      "A technical specialist who manages production and quality of yarn and fabric in textile manufacturing.",
    whatItIs:
      "A specialized technician who ensures textile quality and optimizes production processes in manufacturing facilities.",
    whatTheyDo:
      "Work in manufacturing hubs of KwaZulu-Natal or the Western Cape, monitoring yarn usage, reducing waste, and ensuring chemical properties of dyed fabrics meet specifications. They troubleshoot production issues and maintain quality standards.",
    skillsNeeded: [
      "Lean manufacturing",
      "Quality control and testing",
      "Textile chemistry",
      "Mechanical troubleshooting",
      "Data analysis",
      "Safety awareness",
      "Problem-solving",
    ],
    certifications: [
      "Diploma in Textile Technology",
      "Quality management certifications",
      "Textile chemistry training",
      "Lean manufacturing certifications",
    ],
    tertiaryInstitutions: [
      "Cape Peninsula University of Technology (CPUT)",
      "Durban University of Technology (DUT)",
      "Various textile training institutes",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add Y careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of yCareers) {
    const existingCareer = await prisma.career.findUnique({
      where: { name: career.name },
    });

    if (existingCareer) {
      console.log(`⏭️  Skipped (already exists): ${career.name}`);
      skippedCount++;
    } else {
      await prisma.career.create({ data: career });
      console.log(`✅ Added: ${career.name}`);
      addedCount++;
    }
  }

  const totalCareers = await prisma.career.count();

  console.log(`
✨ Seed complete!
   Added: ${addedCount}
   Skipped: ${skippedCount}
   Total careers in database: ${totalCareers}`);

  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
