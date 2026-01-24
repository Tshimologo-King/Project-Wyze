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

const xCareers = [
  {
    name: "X-Ray Technician (Diagnostic Radiographer)",
    industry: "Healthcare",
    description:
      "A healthcare professional who uses medical imaging equipment to create X-ray images that help doctors diagnose injuries and diseases.",
    whatItIs:
      "A registered imaging technician who operates diagnostic radiography equipment to produce medical images for clinical diagnosis.",
    whatTheyDo:
      "Work in hospitals like Mediclinic or Netcare, operating X-ray equipment and positioning patients to capture diagnostic images. They are crucial for diagnosing broken bones, lung infections like TB, and other medical conditions.",
    skillsNeeded: [
      "Operating digital radiography equipment",
      "Patient positioning",
      "Radiation safety protocols",
      "Image analysis",
      "Patient care",
      "Quality assurance",
      "Medical knowledge",
    ],
    certifications: [
      "Diploma in Radiography or Medical Imaging (3-4 years)",
      "HPCSA (Health Professions Council of South Africa) registration",
      "Radiation safety certifications",
      "Specialized radiography modality training",
    ],
    tertiaryInstitutions: [
      "Cape Peninsula University of Technology (CPUT)",
      "University of Johannesburg (UJ)",
      "Durban University of Technology (DUT)",
      "Tshwane University of Technology (TUT)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "XML Developer",
    industry: "Information Technology",
    description:
      "A software developer who specializes in Extensible Markup Language to structure, store, and transport data between systems.",
    whatItIs:
      "A data integration specialist who ensures different software applications communicate effectively through XML protocols.",
    whatTheyDo:
      "Work in banking and logistics sectors (Standard Bank, Santam) ensuring different software applications can communicate. They design XML schemas, create XSLT transformations, and enable secure financial transactions and data exchange.",
    skillsNeeded: [
      "XML schema design",
      "XSLT transformations",
      "Data integration",
      "Java or C# programming",
      "Database integration",
      "Problem-solving",
      "Documentation skills",
    ],
    certifications: [
      "Degree in Computer Science or Information Systems",
      "XML certifications",
      "Web services and API development certifications",
      "Database certifications",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Johannesburg (UJ)",
      "University of Pretoria (UP)",
    ],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
  {
    name: "Xenobiologist (Astrobiologist)",
    industry: "Science / Research",
    description:
      "A scientist who studies the possibility of life beyond Earth and extraterrestrial biological systems.",
    whatItIs:
      "A specialized research scientist exploring extremophiles and the potential for life on other planets, contributing to SA's space research leadership.",
    whatTheyDo:
      "Work in SA's space science sector leveraging the Square Kilometre Array (SKA) and SARAO. Study extremophiles in deep mines or deserts to understand how life might survive on other planets. Conduct cutting-edge research in astrobiology and xenobiology.",
    skillsNeeded: [
      "Microbiology",
      "Chemistry and biochemistry",
      "Genetics",
      "Data modeling",
      "Research methodology",
      "Scientific writing",
      "Problem-solving",
    ],
    certifications: [
      "BSc in Biological Sciences or Astrobiology",
      "MSc/PhD in Astrobiology or related field",
      "Research methodology certifications",
      "Laboratory certifications",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Cape Town (UCT)",
      "University of Pretoria (UP)",
      "Research institutions (SARAO, SKA)",
    ],
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3649cda?w=800&q=80",
  },
  {
    name: "XRF (X-Ray Fluorescence) Analyst",
    industry: "Science / Mining & Geology",
    description:
      "A technical specialist who uses XRF spectrometers to determine the elemental composition of materials.",
    whatItIs:
      "A specialized laboratory technician who analyzes ore and material composition using X-ray fluorescence technology.",
    whatTheyDo:
      "Work in mining and geology sectors analyzing ore samples to determine concentrations of gold, platinum, or chrome. Help mining companies decide where to dig and optimize extraction strategies using XRF spectroscopy.",
    skillsNeeded: [
      "Operating XRF spectrometers",
      "Sample preparation",
      "Laboratory data analysis",
      "Analytical chemistry",
      "Quality assurance",
      "Documentation",
      "Problem-solving",
    ],
    certifications: [
      "Diploma or Degree in Analytical Chemistry or Geology",
      "XRF equipment certifications",
      "Laboratory analysis certifications",
      "Safety and quality assurance certifications",
    ],
    tertiaryInstitutions: [
      "University of Johannesburg (UJ)",
      "University of the Witwatersrand (Wits)",
      "Tshwane University of Technology (TUT)",
      "Mining and geology training centers",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add X careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of xCareers) {
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
