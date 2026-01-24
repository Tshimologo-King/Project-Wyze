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
  console.log("Starting to add L careers...");

  const lCareers = [
    {
      name: "Lawyer (Attorney / Advocate)",
      industry: "Legal Services",
      description: "A legal professional who advises clients on the law and represents them in legal proceedings.",
      whatItIs: "A lawyer is a qualified legal professional who interprets and applies the law on behalf of clients. In South Africa, lawyers are either Attorneys (office-based) or Advocates (courtroom specialists).",
      whatTheyDo: "Attorneys typically work in firms or as in-house counsel for corporations, handling contracts, litigation, and legal matters. Advocates are specialized counsel who represent clients in the High Court and are accessed through referrals from Attorneys.",
      skillsNeeded: ["Analytical reasoning", "Persuasive writing", "Public speaking", "Legal research", "Ethical judgment", "Problem-solving"],
      certifications: ["4-year LLB degree", "Articles of Clerkship (Attorneys) or Pupillage (Advocates)", "Admission to the Law Society or Bar", "Board Exams"],
      tertiaryInstitutions: ["University of the Witwatersrand (Wits)", "University of Cape Town (UCT)", "University of Pretoria (UP)", "University of Johannesburg (UJ)", "Stellenbosch University", "UNISA"],
      image: "https://images.unsplash.com/photo-1589994965851-a8f479c0a5b1?w=500&h=300&fit=crop"
    },
    {
      name: "Logistics Manager",
      industry: "Supply Chain & Logistics",
      description: "A specialist responsible for the efficient movement and storage of goods from origin to consumption.",
      whatItIs: "A logistics manager is a supply chain professional who optimizes the flow of goods and materials. They ensure products move efficiently from suppliers through warehouses to customers.",
      whatTheyDo: "Vital for SA retail giants like Shoprite and Takealot, they manage fleets and transport networks, optimize warehouse space and inventory, implement just-in-time delivery systems, negotiate with suppliers, manage budgets, and analyze supply chain data.",
      skillsNeeded: ["Supply chain optimization", "Strategic planning", "Budget management", "Data analytics", "Vendor management", "Problem-solving", "Warehouse management systems"],
      certifications: ["Degree in Supply Chain Management or Logistics", "APICS CSCP or CPIM certification", "Warehouse management certification"],
      tertiaryInstitutions: ["University of Johannesburg (UJ)", "Nelson Mandela University (NMU)", "Rosebank College", "UNISA"],
      image: "https://images.unsplash.com/photo-1578092490249-46901287dd0d?w=500&h=300&fit=crop"
    },
    {
      name: "Labor Relations Practitioner",
      industry: "Human Resources & Industrial Relations",
      description: "A professional who manages relationships between employers, employees, and trade unions.",
      whatItIs: "A labor relations practitioner is a specialist in employment law and industrial relations. They navigate the complex dynamics between management, workers, and unions to ensure fair and legal working conditions.",
      whatTheyDo: "They represent companies at the CCMA (Commission for Conciliation, Mediation and Arbitration), facilitate collective bargaining with unions like NUMSA or SATAWU, ensure compliance with the Labor Relations Act, resolve disputes, and represent employers in labor negotiations.",
      skillsNeeded: ["Conflict resolution", "Negotiation skills", "Labor law expertise", "Mediation ability", "Knowledge of LRA (Labor Relations Act)", "Communication skills"],
      certifications: ["Diploma in Labor Relations or Human Resources", "CCMA training", "South African labor law certification", "Mediation training"],
      tertiaryInstitutions: ["UNISA", "Cape Peninsula University of Technology (CPUT)", "University of Cape Town (UCT)"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
    },
    {
      name: "Landscape Architect",
      industry: "Architecture & Urban Planning",
      description: "A professional who designs outdoor public areas, landmarks, and gardens for environmental and aesthetic outcomes.",
      whatItIs: "A landscape architect is a design professional who creates outdoor spaces that integrate natural and built environments. They balance aesthetics, functionality, sustainability, and social impact.",
      whatTheyDo: "Working on urban renewal projects in cities like Johannesburg and Cape Town, they design parks, corporate campuses, sustainable residential estates, public plazas, and environmental rehabilitation projects.",
      skillsNeeded: ["Environmental design", "CAD/Revit software", "Botany and plant knowledge", "Spatial planning", "Site analysis", "Sustainability practices"],
      certifications: ["Bachelor's degree in Landscape Architecture", "Professional registration with SACLAP", "CAD certification", "Environmental design training"],
      tertiaryInstitutions: ["University of Pretoria (UP)", "University of Cape Town (UCT)", "Cape Peninsula University of Technology (CPUT)"],
      image: "https://images.unsplash.com/photo-1513306679129-7aa88581dcf6?w=500&h=300&fit=crop"
    },
    {
      name: "Land Surveyor",
      industry: "Construction & Engineering",
      description: "A technical specialist who measures and maps land to establish property boundaries and provide construction data.",
      whatItIs: "A land surveyor is a technical professional who uses precise measurements and mapping to determine property boundaries and provide accurate spatial data. They are essential for construction and property development.",
      whatTheyDo: "Essential for construction of SA highways, dams, and housing developments, they measure land parcels, establish boundaries, create detailed maps, use GPS and GIS equipment, conduct site investigations, and provide data for construction and engineering projects.",
      skillsNeeded: ["GPS/GIS equipment mastery", "Mathematical precision", "Map reading and creation", "Technical drawing", "Problem-solving", "Attention to detail"],
      certifications: ["National Diploma in Land Surveying", "Professional surveyor registration with SACPLAN", "GPS/GIS certification", "Advanced surveying techniques"],
      tertiaryInstitutions: ["University of Cape Town (UCT)", "University of KwaZulu-Natal (UKZN)", "Cape Peninsula University of Technology (CPUT)"],
      image: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=500&h=300&fit=crop"
    },
    {
      name: "Laboratory Technologist",
      industry: "Healthcare & Laboratory Services",
      description: "A professional who performs complex biological, chemical, or physical tests on samples for diagnostic purposes.",
      whatItIs: "A laboratory technologist is a healthcare professional who conducts laboratory tests and analyses. They play a crucial role in disease diagnosis and medical research.",
      whatTheyDo: "Working for the National Health Laboratory Service (NHLS) or private labs like Lancet and Ampath, they conduct blood tests, analyze samples under microscopes, perform chemical analyses, maintain laboratory equipment, ensure quality control, and prepare reports for doctors.",
      skillsNeeded: ["Laboratory safety procedures", "Microscopic analysis", "Attention to detail", "Quality control", "Technical proficiency", "Sample handling"],
      certifications: ["Diploma in Medical Laboratory Technology", "HPCSA registration (required)", "Blood bank technician certification", "Quality assurance training"],
      tertiaryInstitutions: ["Mangosuthu University of Technology (MUT)", "Durban University of Technology (DUT)", "Cape Peninsula University of Technology (CPUT)", "Tshwane University of Technology (TUT)"],
      image: "https://images.unsplash.com/photo-1576091160550-112173e7f7cb?w=500&h=300&fit=crop"
    },
    {
      name: "Lecturer",
      industry: "Education & Academic Research",
      description: "An academic who teaches undergraduate and postgraduate students and conducts original research at universities or colleges.",
      whatItIs: "A lecturer is an academic professional who teaches and conducts research at higher education institutions. They combine knowledge dissemination with scholarly contribution to their fields.",
      whatTheyDo: "Beyond classroom teaching, they develop curricula, conduct original research, publish academic papers, mentor students, guide research projects, supervise postgraduate students, and contribute to their university's academic standing.",
      skillsNeeded: ["Public speaking and presentation", "Academic research", "Curriculum design", "Student mentorship", "Writing and communication", "Subject matter expertise"],
      certifications: ["Master's degree or PhD in subject area", "University teaching credentials", "Research training", "Academic writing proficiency"],
      tertiaryInstitutions: ["All 26 South African public universities", "Numerous private colleges and institutions"],
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=300&fit=crop"
    },
    {
      name: "Librarian",
      industry: "Information Services & Libraries",
      description: "A professional who manages information resources and helps users find and use information effectively.",
      whatItIs: "A librarian is an information professional who organizes, preserves, and provides access to information resources. They help users discover and utilize information in various formats.",
      whatTheyDo: "Working in municipal libraries, schools, or university Knowledge Commons, they manage digital databases and physical archives, assist with research, teach information literacy, organize collection development, manage library systems, and engage with communities.",
      skillsNeeded: ["Information management systems", "Archiving and cataloging", "Research assistance", "Community engagement", "Digital literacy", "Communication skills"],
      certifications: ["Bachelor's or Master's in Library Science or Information Science", "Professional librarian certification", "Technology and digital literacy training"],
      tertiaryInstitutions: ["University of Cape Town (UCT)", "UNISA", "University of the Western Cape (UWC)", "University of Zululand"],
      image: "https://images.unsplash.com/photo-1507842331343-583f20270319?w=500&h=300&fit=crop"
    }
  ];

  for (const career of lCareers) {
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
  const addedCount = lCareers.filter(c => !lCareers.slice(0, lCareers.indexOf(c)).some(existing => existing.name === c.name)).length;
  
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
