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

const bCareersData = [
  {
    name: "Bacteriologist",
    industry: "Science & Healthcare",
    description: "A scientist who studies the growth and characteristics of bacteria and microorganisms",
    whatItIs: "A bacteriologist is a scientist or medical professional who studies the growth, development, and characteristics of bacteria and other microorganisms. They work in clinical laboratories or research institutions to diagnose bacterial infections, test antibiotic effectiveness, and ensure food and water safety.",
    whatTheyDo: "Performs microscopic analysis, conducts bacterial cultures, tests antibiotic resistance, interprets laboratory results, diagnoses infections, and ensures food and water safety compliance.",
    skillsNeeded: ["Microscopic analysis", "Laboratory safety", "Research methodology", "Data interpretation", "Attention to detail"],
    certifications: ["B.Sc(Hons) Microbiology", "Clinical Microbiology Certificate"],
    tertiaryInstitutions: ["University of Pretoria (UP)", "University of the Witwatersrand (Wits)", "Stellenbosch University (SU)"],
    image: "https://picsum.photos/400/300?random=48",
  },
  {
    name: "Banker (Investment/Retail)",
    industry: "Finance & Banking",
    description: "A financial professional who manages money, provides loans, and offers investment advice",
    whatItIs: "A banker is a financial professional who manages money and provides financial services. Retail bankers assist the public with savings and loans; investment bankers help corporations raise capital through stocks and bonds or manage mergers and acquisitions.",
    whatTheyDo: "Manages accounts, processes loans, provides investment advice, analyzes financial models, assesses risks, manages client relationships, and facilitates capital transactions.",
    skillsNeeded: ["Financial modeling", "Risk assessment", "Sales", "Customer relationship management", "Communication"],
    certifications: ["B.Com Finance", "Banking Certificate", "CFA"],
    tertiaryInstitutions: ["University of Johannesburg (UJ)", "University of Cape Town (UCT)", "Rhodes University"],
    image: "https://picsum.photos/400/300?random=49",
  },
  {
    name: "Barista",
    industry: "Hospitality & Tourism",
    description: "A professional who specializes in the preparation and service of coffee-based beverages",
    whatItIs: "A barista is a professional who specializes in the preparation and service of coffee-based beverages. Found in the hospitality and tourism sector, they ensure quality control of coffee products and provide high-level customer service in cafes and hotels.",
    whatTheyDo: "Prepares espresso drinks, steams milk, creates latte art, manages coffee quality, interacts with customers, maintains equipment, and trains staff on coffee preparation.",
    skillsNeeded: ["Sensory perception (taste/smell)", "Manual dexterity", "Customer service", "Knowledge of coffee origins", "Attention to detail"],
    certifications: ["Barista Certification", "SCAE Coffee Certificate"],
    tertiaryInstitutions: ["Ciro Coffee Academy", "Genio Roasters", "Specialty Coffee Schools"],
    image: "https://picsum.photos/400/300?random=50",
  },
  {
    name: "Beauty Therapist",
    industry: "Beauty & Wellness",
    description: "A specialist in skin care and body treatments designed to improve appearance and well-being",
    whatItIs: "A beauty therapist is a specialist in skin care and body treatments designed to improve a person's appearance and well-being. Working in spas or salons, they perform facials, massages, and specialized skin treatments while advising clients on home-care routines.",
    whatTheyDo: "Performs facials, massages, provides body treatments, analyzes skin conditions, recommends products, maintains hygiene standards, and provides client consultations.",
    skillsNeeded: ["Fine motor skills", "Anatomy knowledge (skin/muscles)", "Empathy", "Retail sales", "Communication"],
    certifications: ["B.Tech Beauty Therapy", "Beauty Therapy Diploma"],
    tertiaryInstitutions: ["Isa Carstens Academy", "Camelot International", "Northlink College"],
    image: "https://picsum.photos/400/300?random=51",
  },
  {
    name: "BEE Consultant (B-BBEE)",
    industry: "Business & Consulting",
    description: "An advisor who helps businesses comply with Broad-Based Black Economic Empowerment legislation",
    whatItIs: "A BEE consultant is an advisor who helps businesses comply with Broad-Based Black Economic Empowerment (B-BBEE) legislation. They develop strategies to improve a company's BEE scorecard by advising on ownership, skills development, and preferential procurement.",
    whatTheyDo: "Develops BEE strategies, analyzes scorecards, audits compliance, advises on ownership structures, recommends skills development initiatives, and manages preferential procurement programs.",
    skillsNeeded: ["Legal interpretation", "Strategic planning", "Auditing", "Financial analysis", "Communication"],
    certifications: ["B.Com Business Management", "BEE Consultant Certification", "IRBA accreditation"],
    tertiaryInstitutions: ["Wits Business School", "UNISA", "Business Consultancy Training Centers"],
    image: "https://picsum.photos/400/300?random=52",
  },
  {
    name: "Biochemist",
    industry: "Science & Research",
    description: "A scientist who studies the chemical and physical principles of living organisms",
    whatItIs: "A biochemist is a scientist who studies the chemical and physical principles of living things and of biological processes. Often found in the pharmaceutical or agricultural sectors, they develop new medicines or improve crop yields by understanding molecular biology.",
    whatTheyDo: "Conducts molecular research, develops medicines, analyzes biochemical processes, performs laboratory experiments, publishes research, and optimizes biological processes.",
    skillsNeeded: ["Analytical chemistry", "Problem-solving", "Laboratory technology", "Research methodology", "Data analysis"],
    certifications: ["B.Sc(Hons) Biochemistry", "M.Sc Biochemistry"],
    tertiaryInstitutions: ["University of Pretoria (UP)", "University of Johannesburg (UJ)", "Wits University", "UKZN"],
    image: "https://picsum.photos/400/300?random=53",
  },
  {
    name: "Biokineticist",
    industry: "Healthcare & Rehabilitation",
    description: "An exercise specialist who improves physical status through individualized assessment",
    whatItIs: "A biokineticist is an exercise specialist who improves a person's physical status through individualized assessment and health education. They work in private practice or sports teams to provide physical rehabilitation for injuries and manage chronic health conditions.",
    whatTheyDo: "Assesses physical function, prescribes exercise programs, manages rehabilitation, educates clients on health, monitors progress, and provides sport support.",
    skillsNeeded: ["Clinical assessment", "Empathy", "Exercise prescription", "Communication", "Anatomy knowledge"],
    certifications: ["B.Sc(Hons) Biokinetics", "RSSA registration"],
    tertiaryInstitutions: ["University of Johannesburg (UJ)", "University of Pretoria (UP)", "Wits University", "North-West University (NWU)"],
    image: "https://picsum.photos/400/300?random=54",
  },
  {
    name: "Biomedical Engineer",
    industry: "Engineering & Healthcare",
    description: "An engineer who combines biology and engineering to design healthcare devices and systems",
    whatItIs: "A biomedical engineer is an engineer who combines biology and engineering principles to design and create equipment, devices, and software used in healthcare. They design artificial organs, diagnostic machines (like MRI), and prosthetics to improve patient outcomes.",
    whatTheyDo: "Designs medical devices, develops diagnostic equipment, creates prosthetics, programs software, tests prototypes, and ensures compliance with medical standards.",
    skillsNeeded: ["Systems analysis", "Software programming", "Electronics", "Biological science", "Problem-solving"],
    certifications: ["B.Eng Biomedical Engineering", "M.Sc Biomedical Engineering"],
    tertiaryInstitutions: ["Wits University (BEngSc)", "University of Cape Town (UCT)", "Stellenbosch University"],
    image: "https://picsum.photos/400/300?random=55",
  },
  {
    name: "Biostatistician",
    industry: "Science & Data",
    description: "A specialist who uses mathematics and statistics to solve biological problems",
    whatItIs: "A biostatistician is a specialist who uses mathematics and statistics to solve biological problems, particularly in the medical field. They design clinical trials for new drugs and analyze the results to determine if a treatment is safe and effective.",
    whatTheyDo: "Designs clinical trials, analyzes data, develops statistical models, interprets results, publishes findings, and ensures compliance with regulatory standards.",
    skillsNeeded: ["Advanced mathematics", "Statistical software (R/SAS)", "Critical thinking", "Data analysis", "Research methodology"],
    certifications: ["B.Sc(Hons) Statistics", "M.Sc Biostatistics"],
    tertiaryInstitutions: ["Wits University", "University of Cape Town (UCT)", "Stellenbosch University"],
    image: "https://picsum.photos/400/300?random=56",
  },
  {
    name: "Blaster (Mining)",
    industry: "Mining & Construction",
    description: "A technical expert responsible for safe and efficient use of explosives",
    whatItIs: "A blaster is a technical expert responsible for the safe and efficient use of explosives. Crucial in the SA mining and construction sectors, they calculate, set, and detonate charges to break rock or demolish structures.",
    whatTheyDo: "Calculates blast requirements, prepares explosives, installs charges, detonates blasts, monitors safety protocols, documents procedures, and maintains equipment.",
    skillsNeeded: ["Safety compliance", "Precision", "Physical endurance", "Geological awareness", "Attention to detail"],
    certifications: ["Blaster License", "MQA Explosives Training", "Safety Training"],
    tertiaryInstitutions: ["Mining Qualifications Authority (MQA) Centers", "TVET Colleges", "Mining Training Institute"],
    image: "https://picsum.photos/400/300?random=57",
  },
  {
    name: "Boilermaker (Trade)",
    industry: "Trade & Manufacturing",
    description: "A skilled artisan who fabricates, installs, and repairs boilers and large industrial vessels",
    whatItIs: "A boilermaker is a skilled artisan who fabricates, installs, and repairs boilers, vats, and other large vessels that hold liquids and gases. They work in power plants, refineries, and mines to maintain the structural integrity of heavy-duty industrial equipment.",
    whatTheyDo: "Fabricates vessel components, performs welding, installs boiler systems, conducts maintenance, repairs damage, reads blueprints, and ensures safety compliance.",
    skillsNeeded: ["Welding", "Pattern development", "Blueprint reading", "Manual dexterity", "Attention to detail"],
    certifications: ["N4/N5 Boilermaking", "Welding Certification", "Artisan Diploma"],
    tertiaryInstitutions: ["False Bay College", "Northlink College", "Elangeni TVET", "Artisan Training Institute (ATI)"],
    image: "https://picsum.photos/400/300?random=58",
  },
  {
    name: "Bookkeeper",
    industry: "Finance & Accounting",
    description: "A professional responsible for recording day-to-day financial transactions",
    whatItIs: "A bookkeeper is a professional responsible for recording the day-to-day financial transactions of a business. They maintain ledgers, process payroll, and prepare financial statements for the company's accountants.",
    whatTheyDo: "Records transactions, maintains ledgers, processes payroll, reconciles accounts, generates reports, and ensures financial accuracy.",
    skillsNeeded: ["Accuracy", "Accounting software proficiency (Sage/Xero)", "Organization", "Attention to detail", "Numeracy"],
    certifications: ["B.Tech Accounting", "ICB Bookkeeper Certificate"],
    tertiaryInstitutions: ["UNISA", "Milpark Education", "ICB Accredited Colleges"],
    image: "https://picsum.photos/400/300?random=59",
  },
  {
    name: "Botanist",
    industry: "Science & Environment",
    description: "A biologist who specializes in the study of plants and their properties",
    whatItIs: "A botanist is a biologist who specializes in the study of plants, including their physiology, structure, genetics, and ecology. They work in environmental consultancies, research farms, or botanical gardens to study conservation and sustainable agriculture.",
    whatTheyDo: "Conducts field research, studies plant genetics, analyzes plant ecology, performs data analysis, publishes findings, and develops conservation strategies.",
    skillsNeeded: ["Field research", "Data analysis", "Plant taxonomy knowledge", "Observation skills", "Research methodology"],
    certifications: ["B.Sc(Hons) Botany", "M.Sc Botany"],
    tertiaryInstitutions: ["Rhodes University", "University of Pretoria (UP)", "UKZN", "University of Cape Town (UCT)"],
    image: "https://picsum.photos/400/300?random=60",
  },
  {
    name: "Brand Manager",
    industry: "Marketing & Business",
    description: "A marketing professional who oversees the image and reputation of products or services",
    whatItIs: "A brand manager is a marketing professional who oversees the image and reputation of a company's products or services. They develop marketing campaigns, analyze market trends, and ensure that the brand remains competitive and appealing to consumers.",
    whatTheyDo: "Develops marketing strategies, creates campaigns, analyzes market trends, manages brand positioning, conducts market research, and monitors brand performance.",
    skillsNeeded: ["Creativity", "Market research", "Project management", "Strategic thinking", "Communication"],
    certifications: ["B.Com Marketing", "Brand Management Certificate"],
    tertiaryInstitutions: ["Vega School", "AAA School of Advertising", "University of Johannesburg (UJ)"],
    image: "https://picsum.photos/400/300?random=61",
  },
  {
    name: "Bricklayer (Trade)",
    industry: "Trade & Construction",
    description: "A tradesperson who builds or repairs walls using bricks, stone, or concrete blocks",
    whatItIs: "A bricklayer is a tradesperson who builds or repairs walls, chimneys, and other structures using bricks, stone, or concrete blocks. Essential to the construction industry, they translate architectural plans into physical structures.",
    whatTheyDo: "Lays bricks and blocks, applies mortar, constructs walls, repairs masonry, reads architectural plans, maintains quality standards, and ensures structural integrity.",
    skillsNeeded: ["Precision", "Physical strength", "Plan reading", "Teamwork", "Attention to detail"],
    certifications: ["N4/N5 Bricklaying", "Construction Diploma"],
    tertiaryInstitutions: ["Boland College", "Cape Peninsula University of Technology (CPUT)", "Construction Training Centers"],
    image: "https://picsum.photos/400/300?random=62",
  },
  {
    name: "Broker (Stock/Insurance)",
    industry: "Finance & Investment",
    description: "An intermediary who facilitates buying and selling of financial products",
    whatItIs: "A broker is an intermediary who facilitates the buying and selling of financial products like shares or insurance policies. They act as consultants for clients, helping them choose the best investments or insurance coverage to minimize financial risk.",
    whatTheyDo: "Facilitates transactions, provides investment advice, assesses client needs, negotiates terms, manages portfolios, and ensures compliance with regulations.",
    skillsNeeded: ["Negotiation", "Financial literacy", "Communication", "Networking", "Sales"],
    certifications: ["B.Com Finance", "FAIS Certification", "Insurance Broker License"],
    tertiaryInstitutions: ["University of Johannesburg (UJ)", "University of Cape Town (UCT)", "UNISA"],
    image: "https://picsum.photos/400/300?random=63",
  },
  {
    name: "Building Inspector",
    industry: "Construction & Compliance",
    description: "A professional who examines buildings to ensure compliance with safety and building codes",
    whatItIs: "A building inspector is a professional who examines buildings to ensure they comply with safety, health, and local building codes. Usually employed by municipalities or the NHBRC, they conduct site visits to verify that construction follows approved plans and SANS 10400 standards.",
    whatTheyDo: "Inspects construction sites, verifies code compliance, reviews architectural plans, documents findings, issues permits, and ensures safety standards.",
    skillsNeeded: ["Knowledge of building regulations", "Attention to detail", "Integrity", "Communication", "Plan interpretation"],
    certifications: ["Building Inspection Certificate", "SANS 10400 Training", "Construction Diploma"],
    tertiaryInstitutions: ["SAHITA (South African Home Inspection Training Academy)", "TVET Colleges", "NHBRC Training Centers"],
    image: "https://picsum.photos/400/300?random=64",
  },
  {
    name: "Business Analyst",
    industry: "Technology & Business",
    description: "A professional who analyzes systems to identify improvements and bridge IT and business needs",
    whatItIs: "A business analyst is a professional who analyzes an organization's systems and processes to identify improvements and bridge the gap between business needs and IT solutions. They work on projects to optimize workflows, reduce costs, and ensure that new software or strategies solve real business problems.",
    whatTheyDo: "Analyzes business processes, gathers requirements, develops solutions, creates documentation, facilitates meetings, tests systems, and manages implementation.",
    skillsNeeded: ["Analytical thinking", "Communication", "Business process modeling", "Problem-solving", "SQL"],
    certifications: ["CBAP", "IIBA Certification", "B.Tech IT"],
    tertiaryInstitutions: ["University of Cape Town (UCT)", "Rosebank College (IIE)", "MANCOSA"],
    image: "https://picsum.photos/400/300?random=65",
  },
  {
    name: "Business Development Manager",
    industry: "Business & Sales",
    description: "A professional focused on identifying new business opportunities and building partnerships",
    whatItIs: "A business development manager is a professional focused on identifying new business opportunities and building long-term partnerships. They research new markets, pitch products to potential clients, and negotiate contracts to increase company revenue.",
    whatTheyDo: "Researches markets, identifies opportunities, builds client relationships, negotiates contracts, develops strategies, and manages sales pipelines.",
    skillsNeeded: ["Persuasion", "Relationship management", "Market research", "Sales strategy", "Communication"],
    certifications: ["B.Com Business Management", "Sales Training Certificate"],
    tertiaryInstitutions: ["Stellenbosch University", "Wits University", "University of Johannesburg (UJ)"],
    image: "https://picsum.photos/400/300?random=66",
  },
  {
    name: "Buyer (Procurement)",
    industry: "Supply Chain & Procurement",
    description: "A professional responsible for selecting and purchasing goods or services",
    whatItIs: "A buyer is a professional responsible for selecting and purchasing goods or services for a company to use or resell. In retail, they choose what products appear on shelves; in manufacturing, they ensure raw materials are sourced at the best price and quality.",
    whatTheyDo: "Sources suppliers, negotiates contracts, manages budgets, forecasts trends, ensures quality standards, and optimizes supply chains.",
    skillsNeeded: ["Negotiation", "Mathematical ability", "Trend forecasting", "Supply chain knowledge", "Attention to detail"],
    certifications: ["B.Com Supply Chain", "CIPS Certification"],
    tertiaryInstitutions: ["University of Johannesburg (UJ)", "Stellenbosch University", "CIPS Accredited Courses"],
    image: "https://picsum.photos/400/300?random=67",
  },
];

async function main() {
  try {
    console.log("Starting to add B careers...\n");

    let addedCount = 0;
    let skippedCount = 0;

    for (const career of bCareersData) {
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
