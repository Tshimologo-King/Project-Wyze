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

const uCareers = [
  {
    name: "UX (User Experience) Designer",
    industry: "Design / Technology",
    description:
      "A digital specialist who focuses on the logic and flow of a product—ensuring smooth, logical, and satisfying user interactions with websites or apps.",
    whatItIs:
      "A user-centered designer who ensures digital products are intuitive and solve customer frustrations through research and testing.",
    whatTheyDo:
      "Conduct user research, create wireframes, and test prototypes. They work in SA's fintech and e-commerce sectors (Absa, Takealot, Discovery) to improve how customers interact with digital products.",
    skillsNeeded: [
      "User research and interviews",
      "Wireframing",
      "Usability testing",
      "Empathy and user empathy mapping",
      "Prototyping",
      "Information architecture",
      "Analytics interpretation",
    ],
    certifications: [
      "Bachelor's degree in Design, Computer Science, or Information Systems",
      "UX Design certifications",
      "Google UX Design Certificate",
      "Figma/Sketch certifications",
    ],
    tertiaryInstitutions: [
      "Vega School",
      "Red & Yellow",
      "University of Cape Town (UCT)",
      "Specialized UX bootcamps",
    ],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    name: "UI (User Interface) Designer",
    industry: "Design / Technology",
    description:
      "A designer who focuses on the visual look of a product—creating visually appealing buttons, icons, spacing, and color schemes.",
    whatItIs:
      "A visual designer who ensures digital products are aesthetically appealing while maintaining brand identity and usability.",
    whatTheyDo:
      "Create high-fidelity designs and visual systems for digital products. Working alongside UX designers, they ensure banking apps look trustworthy and modern while maintaining brand consistency.",
    skillsNeeded: [
      "Visual design",
      "Typography",
      "Color theory",
      "High-fidelity prototyping",
      "Design systems",
      "Brand guidelines adherence",
      "Design tools proficiency",
    ],
    certifications: [
      "Bachelor's degree in Visual Arts or Graphic Design",
      "UI Design certifications",
      "Figma/Sketch expert certification",
      "Design systems training",
    ],
    tertiaryInstitutions: [
      "Stellenbosch University (Visual Arts)",
      "Greenside Design Center",
      "Inscape",
      "Red & Yellow",
    ],
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    name: "Urologist",
    industry: "Healthcare / Medicine",
    description:
      "A medical doctor specializing in the diagnosis and treatment of disorders of the urinary tract and male reproductive system.",
    whatItIs:
      "A highly specialized surgeon registered with HPCSA who performs complex urological procedures in major hospitals.",
    whatTheyDo:
      "Perform complex surgeries like kidney stone removals and prostate procedures in hospitals such as Groote Schuur or Netcare Sunninghill. They diagnose and treat urinary and reproductive disorders.",
    skillsNeeded: [
      "Surgical precision",
      "Diagnostic expertise",
      "Advanced medical knowledge",
      "Patient communication",
      "Critical thinking",
      "Research capabilities",
      "Manual dexterity",
    ],
    certifications: [
      "MBChB (Bachelor of Medicine)",
      "4-year MMed specialization in Urology",
      "HPCSA registration",
      "Fellowship in Urology",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "University of KwaZulu-Natal (UKZN)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Urban and Regional Planner",
    industry: "Urban Planning & Development",
    description:
      "A specialist who develops plans and policies for land use to create sustainable and functional urban or rural communities.",
    whatItIs:
      "A scarce-skill professional registered with SACPLAN who designs communities addressing South Africa's spatial history and inequalities.",
    whatTheyDo:
      "Work for municipalities or firms like WSP to design transport networks, housing developments, and public spaces. They create master plans that address sustainability and spatial equity.",
    skillsNeeded: [
      "GIS mapping",
      "Urban design",
      "SPLUMA Act knowledge",
      "Community engagement",
      "Spatial analysis",
      "Policy development",
      "Project management",
    ],
    certifications: [
      "BSc in Urban and Regional Planning",
      "SACPLAN registration (mandatory)",
      "GIS certifications",
      "Urban design certifications",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Cape Town (UCT)",
      "University of Pretoria (UP)",
      "North-West University (NWU)",
      "University of the Free State (UFS)",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    name: "Underwriter (Insurance)",
    industry: "Finance & Insurance",
    description:
      "A financial professional who evaluates risk and determines the appropriate premium for insurance policies.",
    whatItIs:
      "An insurance specialist who assesses risk and decides whether to accept insurance applications and under what conditions.",
    whatTheyDo:
      "Work for firms like Old Mutual, Sanlam, or Santam evaluating insurance applications. They assess risk, determine premiums, and make underwriting decisions for car, life, and other insurance policies.",
    skillsNeeded: [
      "Risk assessment",
      "Analytical thinking",
      "Financial literacy",
      "Attention to detail",
      "Decision-making",
      "Communication skills",
      "Problem-solving",
    ],
    certifications: [
      "Bachelor's degree in Finance or Actuarial Science",
      "Insurance Institute of South Africa (IISA) qualification",
      "Underwriting certifications",
      "Risk management training",
    ],
    tertiaryInstitutions: [
      "University of South Africa (Unisa)",
      "Milpark Education",
      "Insurance Institute of South Africa (IISA)",
      "University of Cape Town (UCT)",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    name: "Upholsterer (Trade)",
    industry: "Trades / Manufacturing",
    description:
      "A skilled artisan who provides padding, springs, webbing, and fabric or leather covers to furniture, especially seats.",
    whatItIs:
      "A skilled tradesperson essential in South Africa's interior design and automotive industries, restoring and creating custom seating.",
    whatTheyDo:
      "Restore antique furniture or create custom seating for high-end safari lodges and luxury vehicles. They apply padding, springs, and fabric covers with precision and craftsmanship.",
    skillsNeeded: [
      "Fabric cutting",
      "Frame repair",
      "Industrial sewing machine operation",
      "Pattern making",
      "Attention to detail",
      "Color and fabric coordination",
      "Problem-solving",
    ],
    certifications: [
      "Trade qualification in Upholstery",
      "Leather working certification",
      "Furniture restoration training",
      "Sewing machine operation",
    ],
    tertiaryInstitutions: [
      "Various TVET Colleges",
      "Private furniture-making academies",
      "Apprenticeship programs",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    name: "Ultrasound Technician (Ultrasonographer)",
    industry: "Healthcare",
    description:
      "A healthcare professional who uses high-frequency sound waves to create images of the inside of the body for medical diagnosis.",
    whatItIs:
      "A diagnostic imaging technician who operates ultrasound equipment to assist in medical diagnosis and monitoring.",
    whatTheyDo:
      "Use ultrasound equipment in maternity wards and diagnostic centers to create images for prenatal scans and organ assessment. They check heart, blood vessels, and other organs for abnormalities.",
    skillsNeeded: [
      "Patient care",
      "Technical equipment operation",
      "Spatial awareness",
      "Attention to detail",
      "Communication skills",
      "Anatomy knowledge",
      "Problem-solving",
    ],
    certifications: [
      "Degree in Radiography or Medical Imaging (3-4 years)",
      "Ultrasound technician certification",
      "HPCSA registration",
      "Specialized ultrasound modality training",
    ],
    tertiaryInstitutions: [
      "Cape Peninsula University of Technology (CPUT)",
      "Durban University of Technology (DUT)",
      "University of Johannesburg (UJ)",
      "Tshwane University of Technology (TUT)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add U careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of uCareers) {
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
