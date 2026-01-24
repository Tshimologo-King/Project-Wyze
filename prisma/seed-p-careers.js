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

const pCareers = [
  {
    name: "Petroleum Engineer",
    industry: "Engineering / Energy",
    description:
      "An engineer who designs and develops methods for extracting oil and gas from deposits below the Earth's surface.",
    whatItIs:
      "A specialized engineer with expertise in thermodynamics, fluid mechanics, and geology. Petroleum Engineers solve complex technical challenges in energy extraction and production.",
    whatTheyDo:
      "Design drilling systems, develop extraction methods, and optimize production processes. In South Africa, they work for companies like Sasol and PetroSA, focusing on offshore drilling or conversion of coal/gas to liquid fuels.",
    skillsNeeded: [
      "Thermodynamics",
      "Fluid mechanics",
      "Geology and geophysics",
      "Advanced mathematical modeling",
      "Problem-solving",
      "Technical design",
      "Project management",
    ],
    certifications: [
      "BSc in Petroleum Engineering",
      "Professional Engineer (PrEng) registration",
      "Advanced thermodynamics",
      "Reservoir engineering",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "Stellenbosch University",
      "University of Pretoria (UP)",
      "University of Cape Town (UCT)",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    name: "Pharmacist",
    industry: "Healthcare / Pharmaceutical",
    description:
      "A healthcare professional specialized in the right use, storage, and provision of medicines and medications.",
    whatItIs:
      "A qualified healthcare professional with expertise in chemistry and clinical pharmacy. Pharmacists are registered with the South African Pharmacy Council (SAPC) and ensure drug safety and quality.",
    whatTheyDo:
      "Dispense medications, counsel patients on drug use, and ensure pharmaceutical quality. They work in retail stores like Clicks and Dis-Chem, hospitals, or in pharmaceutical manufacturing at companies like Aspen Pharmacare.",
    skillsNeeded: [
      "Chemistry and pharmacology",
      "Clinical knowledge",
      "Attention to detail",
      "Patient counseling skills",
      "Medication management",
      "Communication",
      "Problem-solving",
    ],
    certifications: [
      "BPharm (Bachelor of Pharmacy)",
      "SAPC Registration",
      "Clinical pharmacy specialization",
      "Community pharmacy certification",
    ],
    tertiaryInstitutions: [
      "Rhodes University",
      "University of the Witwatersrand (Wits)",
      "University of KwaZulu-Natal (UKZN)",
      "North-West University (NWU)",
      "University of the Western Cape (UWC)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Physiotherapist",
    industry: "Healthcare",
    description:
      "A healthcare professional who helps patients restore movement and function after injury, illness, or disability through therapy and exercise.",
    whatItIs:
      "A registered healthcare professional with a 4-year degree who specializes in movement and rehabilitation. Physiotherapists are registered with the HPCSA.",
    whatTheyDo:
      "Assess patients, develop treatment plans, and provide manual therapy and exercise programs. They work in public hospitals, private sports clinics, or with professional sports teams like the Springboks, treating orthopedic, neurological, and respiratory conditions.",
    skillsNeeded: [
      "Human anatomy knowledge",
      "Physical stamina",
      "Empathy and patience",
      "Manual therapy techniques",
      "Exercise prescription",
      "Communication skills",
      "Clinical reasoning",
    ],
    certifications: [
      "Bachelor's degree in Physiotherapy (4 years)",
      "HPCSA Registration",
      "Continuing Professional Development",
      "Sports physiotherapy specialization",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Stellenbosch University",
      "University of the Western Cape (UWC)",
      "University of KwaZulu-Natal (UKZN)",
    ],
    image:
      "https://images.unsplash.com/photo-1559839734335-3bdd697d35f5?w=800&q=80",
  },
  {
    name: "Pilot (Commercial)",
    industry: "Aviation / Transportation",
    description:
      "A professional trained to fly aircraft for the safe transportation of passengers and cargo.",
    whatItIs:
      "A highly trained aviation professional who operates commercial aircraft. Commercial Pilots hold licenses accredited by the South African Civil Aviation Authority (SACAA).",
    whatTheyDo:
      "Conduct pre-flight checks, plan flight routes, manage aircraft systems, and safely navigate through various weather conditions. They fly for airlines like Airlink, FlySafair, and SAA, ensuring passenger and cargo safety.",
    skillsNeeded: [
      "Spatial awareness",
      "Quick decision-making",
      "Hand-eye coordination",
      "Technical knowledge of meteorology",
      "Communication",
      "Situational awareness",
      "Problem-solving under pressure",
    ],
    certifications: [
      "Private Pilot License (PPL)",
      "Commercial Pilot License (CPL)",
      "Instrument Rating (IR)",
      "Multi-Engine Rating",
      "SACAA accreditation",
    ],
    tertiaryInstitutions: [
      "43 Air School",
      "Lanseria Flight Centre",
      "Morningstar Air Academy",
      "Safair Flight School",
      "South African Airways Flight School",
    ],
    image:
      "https://images.unsplash.com/photo-1569163139394-de4798aa62b1?w=800&q=80",
  },
  {
    name: "Psychologist (Clinical / Counseling)",
    industry: "Healthcare / Mental Health",
    description:
      "A mental health professional who evaluates and treats mental, emotional, and behavioral disorders.",
    whatItIs:
      "A mental health specialist with a Master's degree who provides psychological assessment, therapy, and counseling. They must complete a 1-year internship and community service to register with the HPCSA.",
    whatTheyDo:
      "Conduct psychometric assessments, provide therapy, and treat psychological disorders. They work in private practice, hospitals, corporate wellness programs, and research institutions.",
    skillsNeeded: [
      "Active listening",
      "Empathy and compassion",
      "Critical thinking",
      "Research skills",
      "Assessment expertise",
      "Communication",
      "Ethical reasoning",
    ],
    certifications: [
      "Master's degree in Psychology",
      "HPCSA Registration",
      "1-year internship completion",
      "Community service",
      "Psychometric assessment qualifications",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Johannesburg (UJ)",
      "University of Pretoria (UP)",
      "University of South Africa (Unisa)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Public Relations (PR) Specialist",
    industry: "Communications / Marketing",
    description:
      "A communications professional who manages the public image and reputation of an organization or individual.",
    whatItIs:
      "A strategic communicator who builds and maintains positive organizational relationships with the public. PR Specialists are often members of PRISA (Public Relations Institute of Southern Africa).",
    whatTheyDo:
      "Draft press releases, manage social media crises, organize media events, and coordinate public communications. They work with companies, government departments, and non-profit organizations to build positive brand narratives.",
    skillsNeeded: [
      "Writing and editing",
      "Networking",
      "Strategic communication",
      "Crisis management",
      "Social media expertise",
      "Media relations",
      "Presentation skills",
    ],
    certifications: [
      "Degree in Communications or PR",
      "PRISA membership",
      "Digital PR certification",
      "Crisis communication training",
    ],
    tertiaryInstitutions: [
      "University of Johannesburg (UJ)",
      "Cape Peninsula University of Technology (CPUT)",
      "Durban University of Technology (DUT)",
      "Vega School",
      "AVATAR",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    name: "Panel Beater (Trade)",
    industry: "Automotive / Trades",
    description:
      "A skilled artisan who repairs the bodywork of vehicles after damage from accidents.",
    whatItIs:
      "A trained tradesperson who specializes in vehicle body repair and restoration. Panel Beaters use specialized tools and techniques to restore damaged vehicles.",
    whatTheyDo:
      "Assess vehicle damage, realign frames, remove dents, and restore bodywork to original condition. They work in automotive workshops, insurance-approved repair centers, and collision repair shops.",
    skillsNeeded: [
      "Metalworking",
      "Welding",
      "Hydraulic equipment operation",
      "Attention to detail",
      "Problem-solving",
      "Hand tools proficiency",
      "Safety awareness",
    ],
    certifications: [
      "TVET College Panel Beating qualification",
      "Welding certification",
      "Advanced panel beating techniques",
      "Tool proficiency certification",
    ],
    tertiaryInstitutions: [
      "Northlink TVET College",
      "Boland TVET College",
      "Private artisan training centers",
      "Automotive training academies",
    ],
    image:
      "https://images.unsplash.com/photo-1487751073519-17348b45bde1?w=800&q=80",
  },
  {
    name: "Plumber (Trade)",
    industry: "Trades / Construction",
    description:
      "A tradesperson who specializes in installing and maintaining water, sewage, and drainage systems.",
    whatItIs:
      "A skilled tradesperson with expertise in plumbing systems and installation. Qualified Plumbers hold Red Seal certification and provide essential services across all sectors.",
    whatTheyDo:
      "Install and maintain water supply, sewage, and drainage systems. They work in construction, maintenance, and emergency repair services, handling everything from geyser installations to industrial piping systems.",
    skillsNeeded: [
      "Blueprint reading",
      "Pipe fitting and soldering",
      "Problem-solving",
      "Troubleshooting skills",
      "Hand and power tools proficiency",
      "Safety awareness",
      "Customer service",
    ],
    certifications: [
      "Plumbing diploma/trade qualification",
      "Red Seal certification",
      "Gas fitter certification",
      "Advanced plumbing techniques",
    ],
    tertiaryInstitutions: [
      "College of Cape Town",
      "Tshwane North TVET College",
      "Artisan Training Institute (ATI)",
      "Various TVET Colleges",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add P careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of pCareers) {
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
