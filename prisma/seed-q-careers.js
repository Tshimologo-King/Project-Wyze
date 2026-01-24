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

const qCareers = [
  {
    name: "Quantity Surveyor (QS)",
    industry: "Construction / Engineering",
    description:
      "A financial consultant of the construction industry who manages all costs relating to building and civil engineering projects.",
    whatItIs:
      "A professional who serves as the financial advisor and cost expert in construction and engineering projects. Quantity Surveyors must be registered with the SACQSP (South African Council for the Quantity Surveying Profession) to use the title PrQS.",
    whatTheyDo:
      "Prepare Bills of Quantities, manage project budgets, negotiate contracts, and ensure projects stay within budget. They work for developers or construction firms like WBHO and Group Five, providing cost analysis and contract management throughout project lifecycles.",
    skillsNeeded: [
      "Mathematical precision",
      "Legal knowledge of construction contracts",
      "Cost estimation and analysis",
      "Negotiation skills",
      "Project management",
      "Financial planning",
      "Contract management",
    ],
    certifications: [
      "BSc in Quantity Surveying or Construction Management",
      "SACQSP Registration (PrQS)",
      "Professional Quantity Surveyor qualification",
      "Advanced contract management",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Cape Town (UCT)",
      "University of Pretoria (UP)",
      "Nelson Mandela University (NMU)",
      "University of the Free State (UFS)",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    name: "Quality Assurance (QA) Manager",
    industry: "Manufacturing / Software / Quality Management",
    description:
      "A specialist responsible for ensuring that a company's products or services meet established standards of quality and customer expectations.",
    whatItIs:
      "A management professional who designs and implements quality systems and frameworks to prevent defects. QA Managers are often certified in ISO standards and quality management systems.",
    whatTheyDo:
      "Develop quality frameworks, conduct audits, and implement quality improvement initiatives. They work across sectors from software development to automotive manufacturing (like VWSA), ensuring compliance with standards such as ISO 9001.",
    skillsNeeded: [
      "Knowledge of ISO standards (ISO 9001, etc.)",
      "Auditing expertise",
      "Strategic planning",
      "Leadership and team management",
      "Problem-solving",
      "Data analysis",
      "Process improvement",
    ],
    certifications: [
      "BSc or diploma in Quality Management",
      "ISO 9001 Lead Auditor certification",
      "SAQI (South African Quality Institute) certifications",
      "Advanced quality management training",
    ],
    tertiaryInstitutions: [
      "Tshwane University of Technology (TUT)",
      "Cape Peninsula University of Technology (CPUT)",
      "South African Quality Institute (SAQI)",
      "Durban University of Technology (DUT)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160399-20d08df4330f?w=800&q=80",
  },
  {
    name: "Quality Controller (QC)",
    industry: "Manufacturing / FMCG",
    description:
      "A technical specialist who conducts testing and inspection of products during the production process to ensure quality standards are met.",
    whatItIs:
      "A technical professional who performs quality testing and inspection on production floors. Unlike QA Managers who design systems, QC specialists conduct hands-on testing and validation.",
    whatTheyDo:
      "Test and inspect product batches for safety, quality, and compliance. They work in South Africa's FMCG sector (e.g., Tiger Brands, Clover) testing for taste, packaging integrity, and safety standards, recording data for quality records.",
    skillsNeeded: [
      "Attention to detail",
      "Technical testing knowledge",
      "Data recording and analysis",
      "Safety regulations knowledge",
      "Precision and accuracy",
      "Problem identification",
      "Documentation skills",
    ],
    certifications: [
      "Diploma in Food Technology or Analytical Chemistry",
      "Quality Control technician certification",
      "Food safety or manufacturing certifications",
      "ISO standards knowledge",
    ],
    tertiaryInstitutions: [
      "Cape Peninsula University of Technology (CPUT)",
      "Durban University of Technology (DUT)",
      "Tshwane University of Technology (TUT)",
      "Various TVET Colleges",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Quantitative Analyst (Quants)",
    industry: "Finance / Banking / Investment",
    description:
      "A professional who uses mathematical and statistical methods to solve financial and risk management problems.",
    whatItIs:
      "A highly specialized analyst with advanced mathematics and programming expertise who develops financial models and manages risk. Quantitative Analysts are in high demand in financial institutions.",
    whatTheyDo:
      "Develop pricing models, manage financial risk, and create trading strategies. Highly sought after by South Africa's Big Four banks (Standard Bank, FirstRand, Nedbank, ABSA) and investment firms to solve complex financial problems.",
    skillsNeeded: [
      "Advanced calculus and mathematics",
      "Programming (Python/C++)",
      "Statistical modeling",
      "Financial market knowledge",
      "Data analysis",
      "Machine learning",
      "Risk management",
    ],
    certifications: [
      "BSc in Mathematics or Financial Analysis",
      "CFA (Chartered Financial Analyst)",
      "Advanced statistics and machine learning",
      "Financial modeling certifications",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "Stellenbosch University",
      "University of Johannesburg (UJ)",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    name: "Qualified Flight Instructor (QFI)",
    industry: "Aviation",
    description:
      "A senior pilot authorized to train others to fly aircraft and to evaluate their proficiency in flying.",
    whatItIs:
      "An expert pilot with advanced training credentials who is authorized to instruct and examine other pilots. QFIs must meet strict SACAA (South African Civil Aviation Authority) standards.",
    whatTheyDo:
      "Train new pilots, conduct flight evaluations, and ensure compliance with aviation safety standards. They work at flight schools or within the South African Air Force (SAAF), ensuring that new pilots meet SACAA requirements.",
    skillsNeeded: [
      "Expert piloting skills",
      "Patience and communication",
      "Deep knowledge of aviation law",
      "Emergency procedures",
      "Teaching ability",
      "Technical expertise",
      "Safety focus",
    ],
    certifications: [
      "Commercial Pilot License (CPL)",
      "Instrument Rating (IR)",
      "Qualified Flight Instructor (QFI) certificate",
      "Multi-Engine Instructor Rating",
      "SACAA accreditation",
    ],
    tertiaryInstitutions: [
      "43 Air School",
      "Lanseria Flight Centre",
      "Morningstar Air Academy",
      "South African Airways Flight School",
    ],
    image:
      "https://images.unsplash.com/photo-1569163139394-de4798aa62b1?w=800&q=80",
  },
  {
    name: "Quarry Manager",
    industry: "Mining / Construction Materials",
    description:
      "A management professional responsible for the technical and commercial operations of a quarry where stone, sand, or gravel is extracted.",
    whatItIs:
      "An operations manager with expertise in mining and extraction who oversees all aspects of quarry operations. Quarry Managers ensure safe, efficient, and environmentally compliant resource extraction.",
    whatTheyDo:
      "Oversee blasting operations, crushing processes, and transportation of raw materials. They manage technical operations, safety compliance, environmental regulations, and staff supervision at quarries that supply materials for South Africa's road and infrastructure projects.",
    skillsNeeded: [
      "Operational management",
      "Explosives safety knowledge",
      "Environmental compliance",
      "Staff supervision",
      "Equipment maintenance",
      "Safety protocols",
      "Budget management",
    ],
    certifications: [
      "Degree in Mining Engineering or Geology",
      "Explosives safety certification",
      "Environmental compliance training",
      "Operational management qualifications",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "University of Cape Town (UCT)",
      "Stellenbosch University",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add Q careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of qCareers) {
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
