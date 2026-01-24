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

const cCareersData = [
  {
    name: "Cabinet Maker (Trade)",
    industry: "Trade & Manufacturing",
    description: "A skilled artisan who specializes in design, construction, and repair of furniture and cabinetry",
    whatItIs: "A cabinet maker is a skilled artisan who specializes in the design, construction, and repair of furniture and high-end cabinetry. Found in the manufacturing and interior design sectors, they interpret blueprints to build custom kitchen units, office furniture, or bespoke timber pieces.",
    whatTheyDo: "Designs furniture, interprets blueprints, cuts and shapes wood, assembles components, finishes pieces, repairs furniture, and ensures quality craftsmanship.",
    skillsNeeded: ["Technical drawing", "Precision cutting", "Wood type knowledge", "Power tools mastery", "Attention to detail"],
    certifications: ["N4/N5 Woodworking", "Cabinet Making Diploma"],
    tertiaryInstitutions: ["Northlink College", "False Bay TVET College", "Furntech"],
    image: "https://picsum.photos/400/300?random=68",
  },
  {
    name: "Chartered Accountant (CA(SA))",
    industry: "Finance & Accounting",
    description: "A premier financial professional registered with the South African Institute of Chartered Accountants",
    whatItIs: "A Chartered Accountant (CA(SA)) is a premier financial professional registered with the South African Institute of Chartered Accountants (SAICA). They serve as financial directors, auditors, or CEOs, overseeing complex tax strategies, financial reporting, and corporate governance.",
    whatTheyDo: "Conducts audits, develops tax strategies, prepares financial reports, manages corporate governance, provides financial advice, and ensures compliance.",
    skillsNeeded: ["Advanced auditing", "Financial modeling", "Ethical leadership", "Strategic planning", "Communication"],
    certifications: ["B.Com (SAICA-accredited)", "PGDA/CTA", "CA(SA) registration"],
    tertiaryInstitutions: ["University of Cape Town (UCT)", "Wits University", "University of Pretoria (UP)", "University of Johannesburg (UJ)"],
    image: "https://picsum.photos/400/300?random=69",
  },
  {
    name: "Chef (Executive/Sous/Pastry)",
    industry: "Hospitality & Culinary",
    description: "A culinary professional trained in food preparation, kitchen management, and menu design",
    whatItIs: "A chef is a culinary professional trained in food preparation, kitchen management, and menu design. Within the hospitality sector, they manage kitchen staff, ensure food safety (HACCP), and maintain the culinary standards of hotels or restaurants.",
    whatTheyDo: "Prepares meals, manages kitchen staff, designs menus, ensures food safety compliance, controls costs, trains staff, and maintains food quality standards.",
    skillsNeeded: ["Culinary techniques", "Sensory perception", "Leadership", "Cost management", "Food safety knowledge"],
    certifications: ["International Hotel School Diploma", "HTA School of Culinary Art Certificate"],
    tertiaryInstitutions: ["International Hotel School", "HTA School of Culinary Art", "Institute of Culinary Arts (ICA)"],
    image: "https://picsum.photos/400/300?random=70",
  },
  {
    name: "Chemical Engineer",
    industry: "Engineering & Manufacturing",
    description: "An engineer who designs and develops chemical manufacturing processes",
    whatItIs: "A chemical engineer is an engineer who designs and develops chemical manufacturing processes. Vital in SA's energy (Sasol) and mining sectors, they convert raw materials into products like fuel, plastics, and medicine while ensuring environmental safety.",
    whatTheyDo: "Designs manufacturing processes, optimizes chemical reactions, manages production systems, ensures safety protocols, and maintains environmental compliance.",
    skillsNeeded: ["Process design", "Thermodynamics", "Chemistry", "Problem-solving", "Environmental awareness"],
    certifications: ["B.Eng Chemical Engineering", "Professional Engineer (PE)"],
    tertiaryInstitutions: ["University of Pretoria (UP)", "Wits University", "Stellenbosch University (SU)"],
    image: "https://picsum.photos/400/300?random=71",
  },
  {
    name: "Chiropractor",
    industry: "Healthcare & Wellness",
    description: "A healthcare professional focused on diagnosis and treatment of neuromuscular disorders through manual adjustment",
    whatItIs: "A chiropractor is a healthcare professional focused on the diagnosis and treatment of neuromuscular disorders, primarily through manual adjustment of the spine. Typically working in private practice or multidisciplinary health centers, they provide drug-free care for back pain, neck pain, and joint issues.",
    whatTheyDo: "Diagnoses conditions, performs spinal adjustments, interprets imaging, provides rehabilitation, educates patients, and manages pain treatment.",
    skillsNeeded: ["Diagnostic imaging interpretation", "Manual dexterity", "Patient empathy", "Anatomy knowledge", "Communication"],
    certifications: ["B.Tech Chiropractic", "AHPCSA registration"],
    tertiaryInstitutions: ["University of Johannesburg (UJ)", "Durban University of Technology (DUT)"],
    image: "https://picsum.photos/400/300?random=72",
  },
  {
    name: "Clinical Psychologist",
    industry: "Healthcare & Mental Health",
    description: "A mental health specialist who assesses, diagnoses, and treats mental, emotional, and behavioral disorders",
    whatItIs: "A clinical psychologist is a mental health specialist who assesses, diagnoses, and treats mental, emotional, and behavioral disorders. They work in hospitals, corporate wellness programs, or private practice providing psychotherapy and psychological assessments.",
    whatTheyDo: "Conducts psychological assessments, provides psychotherapy, develops treatment plans, conducts research, manages crisis intervention, and tracks patient progress.",
    skillsNeeded: ["Active listening", "Clinical assessment", "Research methodology", "Deep empathy", "Communication"],
    certifications: ["Master's degree in Clinical Psychology", "HPCSA registration"],
    tertiaryInstitutions: ["University of Cape Town (UCT)", "Wits University", "Rhodes University", "UKZN"],
    image: "https://picsum.photos/400/300?random=73",
  },
  {
    name: "Community Health Worker (CHW)",
    industry: "Public Health & Social Services",
    description: "A frontline public health worker who acts as a link between community and health facilities",
    whatItIs: "A community health worker (CHW) is a frontline public health worker who is a trusted member of the community they serve. Primarily employed by the Department of Health or NGOs, they act as a link between the community and health facilities, managing home-based care and health education.",
    whatTheyDo: "Provides health education, conducts health screenings, manages home-based care, promotes disease prevention, collects health data, and supports health programs.",
    skillsNeeded: ["Communication", "Basic medical knowledge", "First aid", "Cultural competence", "Community engagement"],
    certifications: ["CHW Training Certificate", "First Aid Certification"],
    tertiaryInstitutions: ["Department of Health Training Programs", "Health Systems Trust", "Accredited NGOs"],
    image: "https://picsum.photos/400/300?random=74",
  },
  {
    name: "Computer Scientist",
    industry: "Technology & Software",
    description: "A specialist in the theory of computation and the design of software systems",
    whatItIs: "A computer scientist is a specialist in the theory of computation and the design of software systems. They work in the tech sector developing algorithms, artificial intelligence, and software applications to solve business problems.",
    whatTheyDo: "Develops algorithms, designs software systems, writes code, optimizes systems, conducts research, solves computational problems, and innovates.",
    skillsNeeded: ["Programming (Python, Java, C++)", "Data structures", "Logic", "Systems architecture", "Problem-solving"],
    certifications: ["B.Sc Computer Science", "M.Sc Computer Science"],
    tertiaryInstitutions: ["Wits University", "University of Cape Town (UCT)", "University of Pretoria (UP)", "UNISA"],
    image: "https://picsum.photos/400/300?random=75",
  },
  {
    name: "Construction Manager",
    industry: "Construction & Project Management",
    description: "A professional who plans, coordinates, and oversees construction projects from start to finish",
    whatItIs: "A construction manager is a professional who plans, coordinates, and oversees construction projects from start to finish. They ensure that construction sites run safely, on schedule, and within budget while managing subcontractors and material logistics.",
    whatTheyDo: "Plans projects, manages budgets, schedules work, oversees safety, coordinates subcontractors, manages materials, and ensures quality control.",
    skillsNeeded: ["Project scheduling", "Health and safety (OHS)", "Budget control", "Negotiation", "Leadership"],
    certifications: ["B.Eng Civil Engineering", "SACPCMP registration"],
    tertiaryInstitutions: ["Wits University", "University of Cape Town (UCT)", "Nelson Mandela University (NMU)"],
    image: "https://picsum.photos/400/300?random=76",
  },
  {
    name: "Conveyancer",
    industry: "Legal Services",
    description: "A specialized legal practitioner who handles the legal transfer of property ownership",
    whatItIs: "A conveyancer is a specialized legal practitioner who handles the legal transfer of property ownership. Employed at law firms, they draft legal documents for the Deeds Office and ensure that property transactions comply with South African law.",
    whatTheyDo: "Drafts conveyancing documents, processes property transactions, manages deed registration, ensures legal compliance, and advises clients.",
    skillsNeeded: ["Property law expertise", "Attention to detail", "Administrative accuracy", "Communication", "Legal knowledge"],
    certifications: ["LLB degree", "Conveyancing admission exam"],
    tertiaryInstitutions: ["University of Cape Town (UCT)", "Wits University", "University of Johannesburg (UJ)", "All SA Law Schools"],
    image: "https://picsum.photos/400/300?random=77",
  },
  {
    name: "Criminologist",
    industry: "Law Enforcement & Social Science",
    description: "A social scientist who studies the nature, extent, causes, and control of criminal behavior",
    whatItIs: "A criminologist is a social scientist who studies the nature, extent, causes, and control of criminal behavior. They work in the South African Police Service (SAPS), Department of Correctional Services, or private security firms to develop crime prevention strategies.",
    whatTheyDo: "Analyzes crime data, develops crime prevention strategies, profiles criminal behavior, conducts research, advises on policy, and provides expert consultation.",
    skillsNeeded: ["Data analysis", "Psychological profiling", "Research methodology", "SA legal system knowledge", "Critical thinking"],
    certifications: ["B.A Criminology", "M.A Criminology"],
    tertiaryInstitutions: ["University of Pretoria (UP)", "UNISA", "University of Limpopo", "UKZN"],
    image: "https://picsum.photos/400/300?random=78",
  },
];

async function main() {
  try {
    console.log("Starting to add C careers...\n");

    let addedCount = 0;
    let skippedCount = 0;

    for (const career of cCareersData) {
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
