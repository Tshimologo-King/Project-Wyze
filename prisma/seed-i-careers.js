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
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting to add I careers...");

  const iCareers = [
    {
      name: "Industrial Psychologist",
      industry: "Organizational Development & HR",
      description: "A specialist who applies psychological principles to the workplace to improve productivity, health, and work-life quality.",
      whatItIs: "An industrial psychologist is a scientist and practitioner who uses psychological research and methods to understand and improve human behavior in organizational settings. They bridge the gap between psychology and business.",
      whatTheyDo: "Working in HR departments or as external consultants, they design recruitment assessments, conduct psychometric testing, manage organizational change initiatives, resolve workplace conflict, analyze workplace culture, and advise on employee wellness programs.",
      skillsNeeded: ["Psychometric testing and interpretation", "Organizational diagnosis", "Conflict resolution", "Statistical analysis", "Research methodology", "Communication skills"],
      certifications: ["Bachelor's degree in Psychology", "Master's degree in Industrial/Organizational Psychology", "HPCSA (Health Professions Council of South Africa) registration", "Professional psychology certification"],
      tertiaryInstitutions: ["University of Cape Town (UCT)", "University of the Witwatersrand (Wits)", "University of Johannesburg (UJ)", "University of Pretoria (UP)", "UNISA"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
    },
    {
      name: "Information Systems Auditor (IT Auditor)",
      industry: "Technology & Cybersecurity",
      description: "A professional who examines and evaluates an organization's IT infrastructure, policies, and operations for security and compliance.",
      whatItIs: "An IT auditor (or Information Systems Auditor) is a security and compliance professional who assesses whether IT systems are secure, reliable, and compliant with regulations. They identify vulnerabilities and risks in organizational technology.",
      whatTheyDo: "They conduct IT audits, ensure compliance with regulations like POPIA (Protection of Personal Information Act), assess cybersecurity measures, identify data breach risks, evaluate system controls, and provide recommendations for IT governance and security improvements.",
      skillsNeeded: ["Cybersecurity knowledge", "Risk management", "Auditing standards (CISA)", "Data analytics", "System architecture understanding", "Compliance knowledge"],
      certifications: ["IT degree or diploma", "CISA (Certified Information Systems Auditor) qualification via ISACA", "ISO 27001 certification", "CompTIA Security+ certification"],
      tertiaryInstitutions: ["University of Johannesburg (UJ)", "University of the Witwatersrand (Wits)", "Pnet-affiliated training centers", "ISACA training providers"],
      image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=500&h=300&fit=crop"
    },
    {
      name: "Internal Auditor",
      industry: "Finance & Risk Management",
      description: "An independent professional who provides objective assurance on risk management, governance, and internal control processes.",
      whatItIs: "An internal auditor is a professional who independently assesses whether an organization's risk management, governance, and control systems are operating effectively. They differ from external auditors by focusing on operational efficiency and fraud prevention.",
      whatTheyDo: "Working for companies like PwC, Deloitte, or government entities, they evaluate operational efficiency, assess internal controls, investigate fraud, prepare audit reports, ensure regulatory compliance, and make recommendations for process improvement.",
      skillsNeeded: ["Financial accounting and analysis", "Risk assessment", "Ethics and integrity", "Critical thinking", "Communication", "Attention to detail"],
      certifications: ["Degree in Accounting/Finance", "CIA (Certified Internal Auditor) via IIA SA", "CAP (Certified Against Fraud Professional)", "Professional accounting designation"],
      tertiaryInstitutions: ["University of Pretoria (UP)", "UNISA", "Tshwane University of Technology (TUT)", "Durban University of Technology (DUT)"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop"
    },
    {
      name: "Industrial Engineer",
      industry: "Manufacturing & Engineering",
      description: "An engineer who optimizes complex processes and systems by developing integrated solutions for efficiency.",
      whatItIs: "An industrial engineer is a professional who applies engineering, mathematics, and business principles to design, improve, and optimize production systems and organizational processes.",
      whatTheyDo: "Working in manufacturing companies like BMW SA or Volkswagen, they analyze supply chains, reduce waste and inefficiency, improve factory output, optimize workflow design, manage production schedules, and implement continuous improvement methodologies.",
      skillsNeeded: ["Systems thinking", "Operations research", "Project management", "Data modeling and analysis", "Lean manufacturing knowledge", "Problem-solving"],
      certifications: ["Bachelor's degree in Industrial Engineering", "Professional Engineer (PrEng) registration", "Lean Six Sigma certification", "PMP (Project Management Professional)"],
      tertiaryInstitutions: ["University of Pretoria (UP)", "Stellenbosch University", "University of the Witwatersrand (Wits)", "University of Cape Town (UCT)"],
      image: "https://images.unsplash.com/photo-1581092165854-40129078f9d7?w=500&h=300&fit=crop"
    },
    {
      name: "Instrumentation Technician",
      industry: "Manufacturing & Industrial Trades",
      description: "A specialist who installs, maintains, and repairs measuring and control instruments used in industrial processes.",
      whatItIs: "An instrumentation technician is a skilled tradesperson who works with sensors, gauges, and control systems that measure and regulate industrial processes like temperature, pressure, and flow.",
      whatTheyDo: "Essential in mining, petrochemical, and chemical sectors like Sasol, they install and calibrate sensors, perform routine maintenance, troubleshoot instrument failures, perform safety checks, and ensure accurate measurements to prevent industrial accidents.",
      skillsNeeded: ["Electronics fundamentals", "Precision measurement", "Troubleshooting and diagnostics", "Reading technical schematics", "Calibration procedures", "Safety practices"],
      certifications: ["NQF Level 4 in Instrumentation", "Artisan certification in Instrumentation", "ICMSE certification", "Safety and health certification"],
      tertiaryInstitutions: ["Cape Peninsula University of Technology (CPUT)", "Vaal University of Technology (VUT)", "Specialized artisan colleges", "Sasol training centers"],
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop"
    },
    {
      name: "Investment Banker",
      industry: "Finance & Investment Banking",
      description: "A financial professional who helps organizations raise capital and provides advisory services for mergers and acquisitions.",
      whatItIs: "An investment banker is a financial professional who structures complex financial deals, advises on capital markets strategy, and facilitates mergers, acquisitions, and other major transactions.",
      whatTheyDo: "Working for institutions like Investec, Standard Bank, or Goldman Sachs, they analyze companies, build financial models, perform valuations, structure deals, negotiate with stakeholders, and advise clients on capital raising and M&A strategies.",
      skillsNeeded: ["Financial modeling and analysis", "Valuation techniques", "Negotiation skills", "Macroeconomics understanding", "Due diligence", "Client relationship management"],
      certifications: ["BCom or Bachelor's degree in Finance/Economics", "BCom Honours in Finance", "MBA (preferred for senior roles)", "CFA (Chartered Financial Analyst) designation"],
      tertiaryInstitutions: ["University of Cape Town (UCT)", "University of the Witwatersrand (Wits)", "Stellenbosch University", "University of Pretoria (UP)"],
      image: "https://images.unsplash.com/photo-1554224311-beee415c15c7?w=500&h=300&fit=crop"
    },
    {
      name: "Illustrator",
      industry: "Creative & Design",
      description: "A commercial artist who creates drawings and images for publications, advertisements, and digital media.",
      whatItIs: "An illustrator is a visual artist who creates custom artwork and images to communicate messages, tell stories, or explain complex information. They work across print, digital, and multimedia platforms.",
      whatTheyDo: "Working for publishing houses, advertising agencies, or as freelancers, they create illustrations for books and magazines, design technical diagrams, create advertising visuals, develop character designs, and produce digital artwork.",
      skillsNeeded: ["Drawing and sketching proficiency", "Digital software (Adobe Illustrator, Procreate, Photoshop)", "Visual storytelling", "Color theory", "Typography knowledge", "Time management"],
      certifications: ["Diploma or Degree in Illustration", "Animation or Fine Arts degree", "Portfolio of professional work", "Adobe Creative Suite proficiency"],
      tertiaryInstitutions: ["Vega School", "Stellenbosch University (Visual Arts)", "Ruth Prowse School of Art", "Red & Yellow Creative School of Business"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop"
    },
    {
      name: "Internal Combustion Engine Mechanic",
      industry: "Automotive & Heavy Machinery",
      description: "A tradesperson who maintains and repairs internal combustion engines in vehicles and machinery.",
      whatItIs: "An internal combustion engine mechanic (also called petrol/diesel mechanic) is a skilled tradesperson who specializes in the maintenance, diagnosis, and repair of engines that run on petrol, diesel, or other fuels.",
      whatTheyDo: "Working in automotive workshops, transport companies, or mines, they perform engine maintenance, diagnose mechanical problems using diagnostic tools, repair engine components, conduct vehicle inspections, and perform troubleshooting on fleet vehicles and heavy machinery.",
      skillsNeeded: ["Mechanical troubleshooting", "Diagnostic tool proficiency", "Manual dexterity", "Knowledge of engine systems", "Reading technical manuals", "Precision work"],
      certifications: ["NQF Level 4 in Motor Trade (Petrol/Diesel)", "Motor Trade Artisan certification", "ASE (Automotive Service Excellence) certification", "Heavy Equipment Mechanic certification"],
      tertiaryInstitutions: ["Northlink College", "Boland College", "Merseta-accredited TVET colleges", "Other TVET institutions with Motor Trade programs"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop"
    }
  ];

  for (const career of iCareers) {
    const exists = await prisma.career.findUnique({
      where: { name: career.name }
    });

    if (exists) {
      console.log(`⏭️  Skipped (already exists): ${career.name}`);
    } else {
      await prisma.career.create({
        data: career
      });
      console.log(`✅ Added: ${career.name}`);
    }
  }

  const totalCareers = await prisma.career.count();
  const addedCount = iCareers.filter(c => !iCareers.slice(0, iCareers.indexOf(c)).some(existing => existing.name === c.name)).length;
  
  console.log(`
✨ Seed complete!
   Added: ${addedCount}
   Total careers in database: ${totalCareers}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
