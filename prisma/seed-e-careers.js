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

const eCareersData = [
  {
    name: "Economist",
    industry: "Finance & Economics",
    description: "A specialist who studies production and distribution of resources, goods, and services",
    whatItIs: "An economist is a specialist who studies the production and distribution of resources, goods, and services by collecting and analyzing data, researching trends, and evaluating economic issues. In South African banks or government departments, they forecast market trends, advise on investment risks, and help shape fiscal policy.",
    whatTheyDo: "Analyzes economic data, forecasts market trends, conducts research, develops economic models, advises on policy, and prepares reports.",
    skillsNeeded: ["Statistical analysis", "Mathematical modeling", "Critical thinking", "Report writing", "Data analysis"],
    certifications: ["B.Com Economics", "M.Sc Economics", "CFA (Chartered Financial Analyst)"],
    tertiaryInstitutions: ["University of Cape Town (UCT)", "Wits University", "University of Pretoria (UP)", "Stellenbosch University (SU)"],
    image: "https://picsum.photos/400/300?random=88",
  },
  {
    name: "Ecologist",
    industry: "Science & Environment",
    description: "A scientist who studies relationships between organisms and their environment",
    whatItIs: "An ecologist is a scientist who studies the relationship between living organisms and their environment to ensure biodiversity and ecosystem health. Often employed by environmental consultancies or organizations like SANParks and the WWF, they conduct field surveys, assess development impacts, and develop conservation plans.",
    whatTheyDo: "Conducts field surveys, collects ecological data, performs environmental assessments, analyzes biodiversity, develops conservation plans, and publishes research.",
    skillsNeeded: ["Data collection", "GIS mapping", "Research methodology", "Environmental legislation knowledge", "Field work"],
    certifications: ["B.Sc(Hons) Ecology", "M.Sc Ecology"],
    tertiaryInstitutions: ["Rhodes University", "Wits University", "UKZN", "University of the Western Cape (UWC)"],
    image: "https://picsum.photos/400/300?random=89",
  },
  {
    name: "Electrical Engineer",
    industry: "Engineering & Energy",
    description: "An engineer focused on large-scale electricity production, distribution, and management",
    whatItIs: "An electrical engineer is an engineer who focuses on the large-scale production, distribution, and management of electricity and electrical power systems. Essential for Eskom or municipal power grids, they design and maintain high-voltage power lines, substations, and industrial electrical systems.",
    whatTheyDo: "Designs electrical systems, manages power distribution, conducts testing, oversees maintenance, ensures safety compliance, and supervises projects.",
    skillsNeeded: ["Physics", "Advanced calculus", "Project management", "Circuit design", "System analysis"],
    certifications: ["B.Eng Electrical Engineering", "Professional Engineer (PE)"],
    tertiaryInstitutions: ["University of Pretoria (UP)", "University of Cape Town (UCT)", "Wits University", "Stellenbosch University (SU)"],
    image: "https://picsum.photos/400/300?random=90",
  },
  {
    name: "Electronic Engineer",
    industry: "Engineering & Technology",
    description: "A specialized engineer who deals with small-scale electronic circuits and components",
    whatItIs: "An electronic engineer is a specialized engineer who deals with small-scale electronic circuits, such as those found in computers, cellphones, and telecommunications equipment. In tech firms or telecommunications companies, they design, develop, and test electronic components and signal processing systems.",
    whatTheyDo: "Designs electronic circuits, develops PCBs, programs embedded systems, performs testing, troubleshoots issues, and optimizes performance.",
    skillsNeeded: ["PCB design", "Programming (C++/Embedded systems)", "Logic design", "Troubleshooting", "Signal processing"],
    certifications: ["B.Eng Electronics Engineering", "Professional Engineer (PE)"],
    tertiaryInstitutions: ["University of Pretoria (UP)", "Stellenbosch University (SU)", "Wits University"],
    image: "https://picsum.photos/400/300?random=91",
  },
  {
    name: "Electrician (Trade)",
    industry: "Trade & Construction",
    description: "A skilled tradesperson specializing in installation, maintenance, and repair of electrical systems",
    whatItIs: "An electrician is a skilled tradesperson specializing in the installation, maintenance, and repair of electrical wiring and systems in buildings. In construction or manufacturing, they ensure that buildings are wired safely and that machinery remains operational and compliant with safety standards.",
    whatTheyDo: "Installs wiring systems, performs maintenance, repairs electrical equipment, reads blueprints, troubleshoots faults, and ensures safety compliance.",
    skillsNeeded: ["Manual dexterity", "Blueprint reading", "Troubleshooting", "SANS 10142-1 knowledge", "Safety awareness"],
    certifications: ["N4/N5 Electrical Trade", "Electrician's License"],
    tertiaryInstitutions: ["False Bay College", "Northlink College", "Elangeni TVET", "Artisan Training Institute (ATI)"],
    image: "https://picsum.photos/400/300?random=92",
  },
  {
    name: "Emergency Medical Technician (EMT) / Paramedic",
    industry: "Emergency Medical Services",
    description: "A healthcare professional who provides immediate medical care in emergency situations",
    whatItIs: "An emergency medical technician (EMT) or paramedic is a healthcare professional who provides immediate medical care in emergency situations, usually before the patient reaches a hospital. Employed by private services or the state, they operate in ambulances to stabilize patients during trauma or medical crises.",
    whatTheyDo: "Responds to emergency calls, provides CPR, stabilizes patients, operates medical equipment, manages trauma, communicates with hospitals, and documents incidents.",
    skillsNeeded: ["Stress management", "Clinical skills (CPR, intubation)", "Quick decision-making", "Physical fitness", "Communication"],
    certifications: ["Emergency Medical Technician Certificate", "Paramedic License", "BLS Certification"],
    tertiaryInstitutions: ["Cape Peninsula University of Technology (CPUT)", "Durban University of Technology (DUT)", "University of Johannesburg (UJ)", "Wits University"],
    image: "https://picsum.photos/400/300?random=93",
  },
  {
    name: "Enrolled Nurse",
    industry: "Healthcare & Nursing",
    description: "A nurse who provides basic nursing care under supervision of a Registered Nurse",
    whatItIs: "An enrolled nurse is a nurse who provides basic nursing care under the supervision of a Registered Nurse. In South African private or public hospitals, they perform tasks like taking vitals, administering certain medications, and assisting with patient hygiene and mobility.",
    whatTheyDo: "Provides patient care, monitors vitals, assists with medications, maintains hygiene, documents care, communicates with patients, and supports nursing staff.",
    skillsNeeded: ["Empathy", "Medical observation", "Teamwork", "Patience", "Communication"],
    certifications: ["B.Tech Nursing", "SANC registration"],
    tertiaryInstitutions: ["Netcare Education", "Mediclinic Nursing School", "Lilitha Nursing College", "SG Lourens Nursing School"],
    image: "https://picsum.photos/400/300?random=94",
  },
  {
    name: "Environmental Consultant",
    industry: "Consulting & Environment",
    description: "An advisor who ensures organizations follow environmental laws and minimize their impact",
    whatItIs: "An environmental consultant is an advisor who ensures that organizations follow environmental laws and minimize their carbon footprint or pollution. Crucial for the mining and manufacturing industries, they conduct audits, prepare Environmental Impact Assessments (EIAs), and advise management on sustainable practices.",
    whatTheyDo: "Conducts environmental audits, prepares EIAs, advises on compliance, develops sustainability strategies, monitors environmental impacts, and reports findings.",
    skillsNeeded: ["Legal knowledge", "Analytical thinking", "Report writing", "Interpersonal communication", "Environmental science"],
    certifications: ["B.Sc Environmental Science", "M.Sc Environmental Management"],
    tertiaryInstitutions: ["Rhodes University", "University of Cape Town (UCT)", "University of Pretoria (UP)", "Stellenbosch University (SU)"],
    image: "https://picsum.photos/400/300?random=95",
  },
  {
    name: "Epidemiologist",
    industry: "Public Health & Science",
    description: "A public health expert who studies patterns and effects of health conditions in populations",
    whatItIs: "An epidemiologist is a public health expert who studies the patterns, causes, and effects of health and disease conditions in defined populations. Working for the National Institute for Communicable Diseases (NICD) or the Department of Health, they track disease outbreaks and advise on prevention strategies.",
    whatTheyDo: "Analyzes disease data, tracks outbreaks, conducts epidemiological research, develops prevention strategies, communicates findings, and advises policy.",
    skillsNeeded: ["Biostatistics", "Data management", "Research methodology", "Public health knowledge", "Communication"],
    certifications: ["M.Sc Epidemiology", "M.Sc Public Health"],
    tertiaryInstitutions: ["Wits University (School of Public Health)", "University of Pretoria (UP)", "Stellenbosch University (SU)"],
    image: "https://picsum.photos/400/300?random=96",
  },
  {
    name: "Estate Agent",
    industry: "Real Estate & Property",
    description: "A professional who negotiates and facilitates the sale or lease of property",
    whatItIs: "An estate agent is a professional who negotiates and facilitates the sale or lease of residential or commercial property. Working for firms like Pam Golding or RE/MAX, they list properties, host viewings, and manage the legal and financial paperwork between buyers and sellers.",
    whatTheyDo: "Lists properties, conducts viewings, negotiates deals, manages transactions, handles documentation, markets properties, and builds client relationships.",
    skillsNeeded: ["Sales and negotiation", "Networking", "Property law knowledge", "Marketing", "Communication"],
    certifications: ["NQF 4 Real Estate", "Estate Agent License"],
    tertiaryInstitutions: ["Real Estate Academy", "Chartall Business College", "EAAB Registration"],
    image: "https://picsum.photos/400/300?random=97",
  },
];

async function main() {
  try {
    console.log("Starting to add E careers...\n");

    let addedCount = 0;
    let skippedCount = 0;

    for (const career of eCareersData) {
      // Check if career already exists
      const existingCareer = await prisma.career.findUnique({
        where: { name: career.name },
      });

      if (existingCareer) {
        console.log(`⏭️  Skipped (already exists): ${career.name}`);
        skippedCount++;
      } else {
        await prisma.career.create({
          data: career,
        });
        console.log(`✅ Added: ${career.name}`);
        addedCount++;
      }
    }

    console.log(`\n✨ Seed complete!`);
    console.log(`   Added: ${addedCount} new careers`);
    console.log(`   Skipped: ${skippedCount} existing careers`);
    
    // Get total count
    const totalCareers = await prisma.career.count();
    console.log(`   Total careers in database: ${totalCareers}`);
  } catch (error) {
    console.error("Error seeding careers:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
