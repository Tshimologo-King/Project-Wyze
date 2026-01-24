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

const wCareers = [
  {
    name: "Welder (Trade)",
    industry: "Trades / Manufacturing",
    description:
      "A skilled artisan who uses heat and specialized equipment to fuse metal parts together.",
    whatItIs:
      "A highly skilled tradesperson essential for mining, maritime, and construction industries across South Africa.",
    whatTheyDo:
      "Work on oil rigs and ship hulls in Durban, structural steel for buildings in Sandton, and various metal fabrication projects. They use gas and electric arc welding to join metal components.",
    skillsNeeded: [
      "Gas and electric arc welding",
      "Blueprint reading",
      "Metallurgy",
      "High safety awareness",
      "Hand tool operation",
      "Quality control",
      "Problem-solving",
    ],
    certifications: [
      "Trade qualification in Welding",
      "Red Seal trade test certification",
      "Safety certifications",
      "Welding certifications by type (MIG, TIG, Arc)",
    ],
    tertiaryInstitutions: [
      "False Bay TVET College",
      "Northlink College",
      "Southern African Institute of Welding (SAIW)",
      "Various TVET Colleges",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    name: "Web Developer",
    industry: "Information Technology",
    description:
      "A tech specialist who builds and maintains websites and web applications.",
    whatItIs:
      "A skilled technology professional who creates and maintains digital experiences for web-based platforms.",
    whatTheyDo:
      "Build and maintain websites and applications for corporations or international clients. They are crucial for e-commerce platforms like Takealot and banking portals like Capitec, working with HTML, CSS, JavaScript, and modern frameworks.",
    skillsNeeded: [
      "HTML and CSS",
      "JavaScript",
      "React or Node.js frameworks",
      "Database design",
      "API development",
      "Problem-solving",
      "Version control (Git)",
    ],
    certifications: [
      "Degree in Computer Science or related field",
      "Full-stack developer certifications",
      "Framework-specific certifications (React, Node.js)",
      "Web development bootcamp certificates",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Cape Town (UCT)",
      "University of Johannesburg (UJ)",
      "HyperionDev",
      "CodeSpace",
    ],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
  {
    name: "Winemaker (Oenologist)",
    industry: "Agriculture / Food & Beverage",
    description:
      "A scientist and artist who manages the entire wine-making process from grape harvesting to final bottling.",
    whatItIs:
      "A specialized professional who combines chemistry and sensory expertise to produce high-quality wines for local and export markets.",
    whatTheyDo:
      "Work in the Cape Winelands for estates like Spier and Kanonkop, managing grape harvesting, fermentation, chemical balance, and flavor profiles. They ensure wines meet international quality standards.",
    skillsNeeded: [
      "Viticulture",
      "Chemistry and fermentation science",
      "Sensory evaluation",
      "Laboratory management",
      "Yeast and microbiology knowledge",
      "Quality control",
      "Project management",
    ],
    certifications: [
      "BSc in Oenology",
      "Diploma in Viticulture",
      "Wine tasting certifications",
      "Laboratory certifications",
    ],
    tertiaryInstitutions: [
      "Stellenbosch University",
      "Elsenburg Agricultural Training Institute",
    ],
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2cab2707c?w=800&q=80",
  },
  {
    name: "Water Care Works / Process Controller",
    industry: "Engineering / Environment",
    description:
      "A technical specialist who operates and maintains machinery and chemical processes in water treatment plants.",
    whatItIs:
      "An environmental technician responsible for ensuring safe drinking water and proper wastewater treatment for communities.",
    whatTheyDo:
      "Work for municipalities or water boards like Rand Water or Umgeni Water, operating treatment machinery, monitoring chemical processes, and testing water quality to ensure safety and environmental compliance.",
    skillsNeeded: [
      "Chemical dosing knowledge",
      "Mechanical troubleshooting",
      "Water quality testing",
      "Environmental monitoring",
      "Equipment operation",
      "Safety protocols",
      "Data recording",
    ],
    certifications: [
      "Diploma in Water Care or Chemical Engineering",
      "Water treatment operator certifications",
      "Chemical safety certifications",
      "Environmental monitoring training",
    ],
    tertiaryInstitutions: [
      "Durban University of Technology (DUT)",
      "Tshwane University of Technology (TUT)",
      "Vaal University of Technology (VUT)",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    name: "Warehouse Manager",
    industry: "Logistics & Supply Chain",
    description:
      "A logistics professional responsible for receiving, storing, and dispatching goods in warehouse environments.",
    whatItIs:
      "A supply chain management specialist who oversees the central hub of inventory operations for major retailers.",
    whatTheyDo:
      "Manage warehouse operations for retail giants like Shoprite or Woolworths, overseeing staff, inventory accuracy, dispatch, and health and safety compliance. They optimize storage, reduce costs, and ensure timely deliveries.",
    skillsNeeded: [
      "Warehouse Management System (WMS) software",
      "Leadership and team management",
      "Inventory management",
      "Health and Safety (OHS) knowledge",
      "Logistics planning",
      "Problem-solving",
      "Financial awareness",
    ],
    certifications: [
      "Diploma in Logistics or Supply Chain Management",
      "WMS software certifications",
      "OHSAS/OHS training",
      "Forklift operations certification",
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
    name: "Wholesale and Retail (W&R) Manager",
    industry: "Retail & Commerce",
    description:
      "A management professional who oversees daily operations of large-scale retail stores or wholesale distribution centers.",
    whatItIs:
      "A business manager responsible for maximizing sales, managing inventory, and leading teams in retail environments.",
    whatTheyDo:
      "Manage operations for retailers like Makro, Game, or Pick n Pay, focusing on sales targets, stock levels, staff training, and customer service. They implement strategies to improve profitability and store performance.",
    skillsNeeded: [
      "Financial management",
      "Staff training and development",
      "Merchandising",
      "Customer relationship management",
      "Sales analysis",
      "Leadership",
      "Problem-solving",
    ],
    certifications: [
      "BCom in Business Management or related field",
      "W&RSETA learnership programs",
      "Retail management certifications",
      "Financial management training",
    ],
    tertiaryInstitutions: [
      "University of Johannesburg (UJ)",
      "W&RSETA (Wholesale and Retail SETA)",
      "Rosebank College",
      "Various business schools",
    ],
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80",
  },
  {
    name: "Wildlife Biologist / Conservationist",
    industry: "Science / Environment / Conservation",
    description:
      "A scientist who studies wild animals and their interactions with the ecosystem.",
    whatItIs:
      "A dedicated conservation professional working to protect wildlife populations and habitats across South Africa.",
    whatTheyDo:
      "Work for SANParks, Ezemvelo KZN Wildlife, or private reserves to manage animal populations, track migrations, and develop strategies to combat poaching and habitat loss. They conduct field research and data analysis.",
    skillsNeeded: [
      "Data collection and analysis",
      "GIS mapping",
      "Animal behavior analysis",
      "Field research methodology",
      "Conservation strategy development",
      "Problem-solving",
      "Communication skills",
    ],
    certifications: [
      "BSc in Wildlife Biology or Conservation",
      "MSc/PhD in Conservation or related field",
      "GIS certifications",
      "Field research certifications",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Rhodes University",
      "University of Cape Town (UCT)",
    ],
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add W careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of wCareers) {
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
