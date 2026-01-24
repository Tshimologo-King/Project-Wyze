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

const tCareers = [
  {
    name: "Tax Consultant / Specialist",
    industry: "Finance & Accounting",
    description:
      "A financial professional who provides advice on tax planning, ensures legal compliance, and manages submissions to the South African Revenue Service (SARS).",
    whatItIs:
      "A tax expert who navigates complex South African tax laws like VAT and Corporate Income Tax to minimize liabilities while ensuring compliance.",
    whatTheyDo:
      "Work in accounting firms (like the 'Big Four') or as in-house experts to manage tax strategies, prepare submissions, and ensure organizations comply with SARS requirements.",
    skillsNeeded: [
      "Deep knowledge of Income Tax Act",
      "Tax planning and strategy",
      "Analytical thinking",
      "Attention to detail",
      "Knowledge of VAT and Corporate Income Tax",
      "Communication skills",
      "Compliance management",
    ],
    certifications: [
      "Bachelor's degree in Accounting or Finance",
      "SAIT (South African Institute of Taxation) designation",
      "CTA (Chartered Tax Adviser)",
      "Advanced tax certifications",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Johannesburg (UJ)",
      "University of Pretoria (UP)",
      "Cape Peninsula University of Technology (CPUT)",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    name: "Town and Regional Planner",
    industry: "Urban Planning & Development",
    description:
      "A specialist who manages the development and use of land to create sustainable, functional human settlements.",
    whatItIs:
      "A professional registered with SACPLAN who designs sustainable communities and manages land use to address spatial inequalities in South Africa.",
    whatTheyDo:
      "Work for municipalities or private firms to design layouts for housing, transport networks, and public parks. They create master plans for urban development and ensure community engagement.",
    skillsNeeded: [
      "Urban design",
      "GIS mapping",
      "Environmental law",
      "Community engagement",
      "Spatial planning",
      "Development policy knowledge",
      "Project management",
    ],
    certifications: [
      "BSc in Urban and Regional Planning",
      "SACPLAN (South African Council for Planners) registration",
      "GIS certifications",
      "Environmental assessment training",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Stellenbosch University",
      "North-West University (NWU)",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    name: "Telecommunications Engineer",
    industry: "Telecommunications",
    description:
      "An engineer who designs, installs, and maintains systems for communication, including fiber optics, satellite, and mobile networks.",
    whatItIs:
      "An engineer vital for SA giants like MTN, Vodacom, and Telkom, ensuring the country stays connected with high-speed infrastructure.",
    whatTheyDo:
      "Design and maintain 4G/5G networks, fiber optics, and satellite systems. They manage infrastructure rollout in remote areas and ensure network reliability.",
    skillsNeeded: [
      "Signal processing",
      "Network architecture",
      "Electronic troubleshooting",
      "Network design",
      "Cable installation knowledge",
      "Problem-solving",
      "Technical documentation",
    ],
    certifications: [
      "BSc in Electrical/Telecommunications Engineering",
      "Professional Engineer (PrEng) registration",
      "Telecom certifications (Cisco, vendor-specific)",
      "Advanced network certifications",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "University of KwaZulu-Natal (UKZN)",
      "Stellenbosch University",
    ],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
  {
    name: "Toolmaker (Trade)",
    industry: "Manufacturing / Engineering",
    description:
      "A highly skilled artisan who designs, manufactures, and repairs precision tools, dies, jigs, and molds.",
    whatItIs:
      "A precision manufacturing specialist essential for the automotive sector, creating specific molds for industrial manufacturing.",
    whatTheyDo:
      "Design and manufacture precision tools, dies, and molds for automotive and industrial use (e.g., Toyota SA, VWSA). They work with CNC machines and CAD systems.",
    skillsNeeded: [
      "CNC programming",
      "CAD/CAM software",
      "Metallurgy",
      "Precision machining",
      "Blueprint reading",
      "Quality control",
      "Problem-solving",
    ],
    certifications: [
      "Trade qualification in Tool and Die Making",
      "CNC programming certification",
      "CAD/CAM software training",
      "Metallurgy certifications",
    ],
    tertiaryInstitutions: [
      "Coastal KZN TVET College",
      "Northlink College",
      "Tooling Centre of Excellence (TCOE)",
      "Various TVET Colleges",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    name: "Trauma Surgeon",
    industry: "Healthcare / Medicine",
    description:
      "A specialized surgeon who focuses on operative and non-operative management of severe, life-threatening injuries.",
    whatItIs:
      "A highly specialized medical professional working in Level 1 trauma centers managing critical cases from accidents, falls, and violence.",
    whatTheyDo:
      "Work in trauma centers like Chris Hani Baragwanath and Groote Schuur, making rapid surgical decisions to save lives. They manage multi-system trauma cases.",
    skillsNeeded: [
      "Rapid surgical decision-making",
      "Specialized anatomy knowledge",
      "High-pressure resilience",
      "Team leadership",
      "Critical thinking",
      "Physical stamina",
      "Communication skills",
    ],
    certifications: [
      "MBChB (Bachelor of Medicine)",
      "4-year General Surgery specialization (MMed)",
      "Trauma Surgery fellowship",
      "HPCSA registration",
      "Advanced Trauma Life Support (ATLS)",
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
    name: "Truck Driver (Code 14 / Heavy Vehicle)",
    industry: "Logistics & Transportation",
    description:
      "A driver licensed to operate heavy motor vehicles exceeding 16,000 kg, often with a trailer.",
    whatItIs:
      "The lifeblood of the SA economy, a professional driver licensed for heavy commercial vehicles moving goods across major routes.",
    whatTheyDo:
      "Operate heavy vehicles and trailers across SA's N routes (like the N3 Durban-Joburg corridor). Work for logistics companies like Imperial or Unitrans, managing cargo and safety.",
    skillsNeeded: [
      "Defensive driving",
      "Route planning",
      "Mechanical knowledge",
      "Cargo securing",
      "Time management",
      "Safety compliance",
      "Communication",
    ],
    certifications: [
      "Code 14 Driver's License (Heavy Vehicle)",
      "Professional Driving Permit (PrDP)",
      "Dangerous goods certification (if applicable)",
      "Defensive driving course",
    ],
    tertiaryInstitutions: [
      "Various Driving Schools and Training Centers",
      "TVET Colleges with driving programs",
      "Road Traffic Management Corporation (RTMC)",
    ],
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
  },
  {
    name: "Teacher (Post-Level 1 / Senior Phase)",
    industry: "Education",
    description:
      "An educator responsible for delivering the CAPS curriculum to learners in specific subjects.",
    whatItIs:
      "A registered educator who teaches specific subjects to secondary learners, focusing on academics and social-cognitive development.",
    whatTheyDo:
      "Teach CAPS curriculum subjects (Mathematics, History, Zulu, etc.) in public or private schools. They manage classrooms, develop students, and prepare learners for further education.",
    skillsNeeded: [
      "Curriculum delivery",
      "Classroom management",
      "Student mentorship",
      "Subject matter expertise",
      "Assessment and evaluation",
      "Communication",
      "Patience and empathy",
    ],
    certifications: [
      "Bachelor's degree in Education (specific subject focus)",
      "SACE (South African Council for Educators) registration",
      "CAPS curriculum training",
      "Teaching practice certification",
    ],
    tertiaryInstitutions: [
      "University of South Africa (Unisa)",
      "University of Johannesburg (UJ)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Stellenbosch University",
    ],
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
  },
  {
    name: "Turner Machinist (Trade)",
    industry: "Manufacturing / Engineering",
    description:
      "An artisan who uses a lathe to shape metal parts by rotating the workpiece against a cutting tool.",
    whatItIs:
      "A skilled tradesperson who operates lathes to create precision metal parts for mining, manufacturing, and maintenance industries.",
    whatTheyDo:
      "Use lathes (manual and CNC) to create custom metal components like bolts, shafts, and bushings. Work in maintenance and repair workshops across industries.",
    skillsNeeded: [
      "Blueprint reading",
      "Precision measurement",
      "Lathe operation (manual/CNC)",
      "Metal knowledge",
      "Quality control",
      "Problem-solving",
      "Safety awareness",
    ],
    certifications: [
      "Trade qualification in Lathe Operation",
      "CNC Lathe programming",
      "Precision measurement certification",
      "Occupational Health & Safety",
    ],
    tertiaryInstitutions: [
      "Various TVET Colleges",
      "SEIFSA Technical Centre",
      "Apprenticeship programs",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add T careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of tCareers) {
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
