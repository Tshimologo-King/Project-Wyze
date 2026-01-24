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

const rCareers = [
  {
    name: "Radiologist",
    industry: "Healthcare / Medicine",
    description:
      "A medical doctor who specializes in diagnosing and treating injuries and diseases using medical imaging technology.",
    whatItIs:
      "A highly trained medical specialist with an MBChB degree followed by a 4-year MMed specialization in radiology. Radiologists interpret medical images to diagnose and treat diseases.",
    whatTheyDo:
      "Interpret X-rays, CT scans, MRI scans, and ultrasound images to diagnose injuries and diseases. They provide diagnostic reports to referring physicians and manage image-guided interventions and treatments.",
    skillsNeeded: [
      "Medical imaging interpretation",
      "Diagnostic expertise",
      "Technical knowledge of imaging equipment",
      "Critical thinking",
      "Communication skills",
      "Patient care",
      "Continuous learning",
    ],
    certifications: [
      "MBChB (Bachelor of Medicine)",
      "MMed Radiology (4-year specialization)",
      "HPCSA registration",
      "Specialized imaging certifications",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Stellenbosch University",
      "University of KwaZulu-Natal (UKZN)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Radiographer",
    industry: "Healthcare",
    description:
      "A healthcare professional who operates complex medical imaging machinery to capture diagnostic images.",
    whatItIs:
      "A qualified healthcare professional with a 4-year Bachelor of Health Sciences in Radiography who is registered with the HPCSA. Radiographers operate medical imaging equipment.",
    whatTheyDo:
      "Operate X-ray machines, MRI scanners, CT scanners, and ultrasound equipment to capture medical images. They ensure proper patient positioning, safety protocols, and image quality for diagnostic purposes.",
    skillsNeeded: [
      "Equipment operation and maintenance",
      "Patient safety awareness",
      "Radiation safety knowledge",
      "Technical proficiency",
      "Patient communication",
      "Attention to detail",
      "Problem-solving",
    ],
    certifications: [
      "Bachelor of Health Sciences in Radiography (4 years)",
      "HPCSA Registration",
      "Radiation safety certification",
      "Continuing professional development",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Cape Peninsula University of Technology (CPUT)",
      "Durban University of Technology (DUT)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Real Estate Agent",
    industry: "Real Estate / Sales",
    description:
      "A licensed professional who facilitates the buying, selling, or renting of residential or commercial property.",
    whatItIs:
      "A licensed property professional who represents buyers, sellers, and landlords in real estate transactions. Real Estate Agents are regulated by the PPRA (Property Practitioners Regulatory Authority).",
    whatTheyDo:
      "Manage property listings, conduct property viewings, market properties, and negotiate prices between buyers and sellers. They work for agencies like Pam Golding and RE/MAX across South Africa.",
    skillsNeeded: [
      "Negotiation",
      "Marketing and advertising",
      "Knowledge of Property Practitioners Act",
      "Networking",
      "Sales skills",
      "Communication",
      "Financial literacy",
    ],
    certifications: [
      "Professional Designation Examination (PDE)",
      "PPRA registration",
      "Real estate law knowledge",
      "Continuing professional development",
    ],
    tertiaryInstitutions: [
      "Property Practitioners Regulatory Authority (PPRA) accredited providers",
      "Real Estate Institute of South Africa",
      "Various business schools",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    name: "Regional Manager",
    industry: "Management / Retail / Banking",
    description:
      "A senior executive who oversees operations of multiple store or office locations within a specific geographical area.",
    whatItIs:
      "A senior management professional responsible for leading and managing multiple branch locations within a region. Regional Managers ensure consistent brand standards and financial performance.",
    whatTheyDo:
      "Oversee retail stores or banking branches in a region (e.g., Gauteng, Western Cape), manage sales targets, ensure brand compliance, control costs, and supervise regional staff. They work for retailers like Shoprite and Mr Price.",
    skillsNeeded: [
      "Leadership",
      "Financial management and auditing",
      "Strategic planning",
      "Logistics management",
      "Sales management",
      "Staff development",
      "Decision-making",
    ],
    certifications: [
      "BCom in Business Management or related field",
      "MBA (preferred)",
      "Retail management certification",
      "Advanced leadership training",
    ],
    tertiaryInstitutions: [
      "Wits Business School",
      "UCT Graduate School of Business",
      "University of South Africa (Unisa)",
      "USB (Stellenbosch University Business School)",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    name: "Reliability Engineer",
    industry: "Engineering / Manufacturing / Mining",
    description:
      "An engineer who focuses on ensuring that machines and systems function reliably without failure for specified periods.",
    whatItIs:
      "A specialized engineer who applies data analysis and predictive maintenance principles to minimize equipment downtime and maximize system reliability.",
    whatTheyDo:
      "Use statistical analysis and root cause analysis to predict equipment failures and schedule preventive maintenance. Critical in South African mining and heavy industry (Sasol, Eskom), they prevent costly production shutdowns.",
    skillsNeeded: [
      "Statistical analysis",
      "Root cause analysis",
      "Mechanical and electrical engineering",
      "Data analysis",
      "Predictive maintenance",
      "Problem-solving",
      "Project management",
    ],
    certifications: [
      "BSc in Mechanical/Electrical Engineering",
      "Reliability engineer specialist training",
      "Advanced statistics certification",
      "Predictive maintenance expertise",
    ],
    tertiaryInstitutions: [
      "University of Pretoria (UP)",
      "University of the Witwatersrand (Wits)",
      "Stellenbosch University",
      "University of Cape Town (UCT)",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    name: "Researcher (R&D Scientist)",
    industry: "Research / Science / Academia",
    description:
      "A professional who conducts systematic investigations to discover new knowledge or develop new products and processes.",
    whatItIs:
      "A scientist dedicated to research and development who works to solve practical problems or advance knowledge. Researchers work in institutes, universities, and private sector companies.",
    whatTheyDo:
      "Conduct experiments, collect and analyze data, and develop new products or processes. They work in institutes like CSIR or for companies in pharmaceuticals and agriculture to solve challenges like crop disease or energy storage.",
    skillsNeeded: [
      "Data collection and analysis",
      "Laboratory techniques",
      "Academic writing",
      "Critical thinking",
      "Problem-solving",
      "Research design",
      "Communication",
    ],
    certifications: [
      "BSc or MSc in relevant field",
      "PhD (preferred for advanced research)",
      "Research methodology training",
      "NRF accreditation",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Stellenbosch University",
      "National Research Foundation (NRF)",
      "CSIR",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Recruitment Consultant",
    industry: "Human Resources / Recruitment",
    description:
      "A specialist who finds and matches candidates to permanent or temporary jobs for client companies.",
    whatItIs:
      "A human resources professional who acts as a bridge between job seekers and employers, managing the full recruitment process from candidate screening to placement.",
    whatTheyDo:
      "Screen candidates, conduct interviews, perform background checks, and match qualified individuals to job opportunities. They handle headhunting for specialized roles in the South African market.",
    skillsNeeded: [
      "Interpersonal communication",
      "Sales skills",
      "Interviewing techniques",
      "Networking",
      "Problem-solving",
      "Time management",
      "Negotiation",
    ],
    certifications: [
      "Degree in HR or Psychology",
      "Recruitment specialist certification",
      "Interview training",
      "Labor law knowledge",
    ],
    tertiaryInstitutions: [
      "University of Johannesburg (UJ)",
      "University of South Africa (Unisa)",
      "University of the Witwatersrand (Wits)",
      "Durban University of Technology (DUT)",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    name: "Refrigeration Technician (Trade)",
    industry: "Trades / HVAC / Cold Chain",
    description:
      "A skilled artisan who installs and repairs industrial and commercial cooling systems.",
    whatItIs:
      "A trained tradesperson who specializes in refrigeration and HVAC systems. Refrigeration Technicians are essential for maintaining cold chains and climate control systems.",
    whatTheyDo:
      "Install and repair refrigeration units, air conditioning systems, and cooling equipment in commercial and industrial settings. They maintain South Africa's cold chain logistics and shopping mall HVAC systems.",
    skillsNeeded: [
      "Thermostat calibration",
      "Refrigerant handling",
      "Electrical troubleshooting",
      "System maintenance",
      "Safety protocols",
      "Problem-solving",
      "Technical proficiency",
    ],
    certifications: [
      "TVET College Refrigeration diploma",
      "EPA certification (refrigerant handling)",
      "Electrical systems knowledge",
      "HVAC specialization",
    ],
    tertiaryInstitutions: [
      "Northlink TVET College",
      "Tshwane University of Technology (TUT)",
      "Various TVET Colleges",
      "Specialized artisan training centers",
    ],
    image:
      "https://images.unsplash.com/photo-1487751073519-17348b45bde1?w=800&q=80",
  },
  {
    name: "Regulatory Affairs Specialist",
    industry: "Pharmaceutical / FMCG / Regulatory",
    description:
      "A professional who ensures that a company's products and practices comply with all government regulations.",
    whatItIs:
      "A compliance professional with scientific and legal knowledge who manages regulatory submissions and ensures adherence to government standards. They work with regulatory bodies like SAHPRA.",
    whatTheyDo:
      "Manage submissions to SAHPRA (South African Health Products Regulatory Authority), ensure compliance with regulations, and coordinate with government agencies. They work in pharmaceutical and FMCG sectors like Aspen and Adcock Ingram.",
    skillsNeeded: [
      "Legal literacy and regulatory knowledge",
      "Attention to detail",
      "Scientific knowledge",
      "Project management",
      "Documentation skills",
      "Communication",
      "Problem-solving",
    ],
    certifications: [
      "Degree in Pharmacy, Science, or related field",
      "Regulatory affairs certification",
      "SAHPRA compliance training",
      "Advanced regulatory knowledge",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Rhodes University",
      "University of KwaZulu-Natal (UKZN)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add R careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of rCareers) {
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
