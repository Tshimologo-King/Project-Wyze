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

const fCareersData = [
  {
    name: "Financial Advisor / Planner",
    industry: "Finance & Planning",
    description: "A professional who provides advice on investments, insurance, retirement, and tax planning",
    whatItIs: "A financial advisor or planner is a professional who helps individuals and companies reach their long-term financial goals by providing advice on investments, insurance, retirement, and tax. Working for firms like Old Mutual, Sanlam, or Discovery, they manage client portfolios and ensure compliance with the FAIS Act.",
    whatTheyDo: "Analyzes financial needs, develops financial plans, provides investment advice, manages portfolios, performs needs analysis, advises on insurance, and ensures regulatory compliance.",
    skillsNeeded: ["Financial literacy", "Relationship management", "Analytical thinking", "Sales", "Communication"],
    certifications: ["B.Com Financial Planning", "FAIS Certification", "CFP (Certified Financial Planner)"],
    tertiaryInstitutions: ["Milpark Education", "Moonstone Business School", "University of Johannesburg (UJ)", "Wits University"],
    image: "https://picsum.photos/400/300?random=98",
  },
  {
    name: "Forensic Scientist",
    industry: "Forensics & Law Enforcement",
    description: "A scientist who applies biological and chemical analysis to legal investigations",
    whatItIs: "A forensic scientist is a scientist who applies biological, chemical, and physical analysis to legal investigations, often focused on crime scenes. Employed by the South African Police Service (SAPS) Forensic Science Laboratories or private labs, they analyze DNA, ballistics, or toxicology samples to provide evidence in court.",
    whatTheyDo: "Collects evidence, performs laboratory analysis, interprets findings, prepares reports, testifies in court, conducts DNA analysis, and maintains evidence chain of custody.",
    skillsNeeded: ["Attention to detail", "Laboratory proficiency", "Objective reasoning", "Criminal law knowledge", "Scientific analysis"],
    certifications: ["B.Sc(Hons) Forensic Science", "SAPS Forensic Certification"],
    tertiaryInstitutions: ["Wits University", "University of Pretoria (UP)", "University of Cape Town (UCT)", "University of the Free State (UFS)"],
    image: "https://picsum.photos/400/300?random=99",
  },
  {
    name: "Fashion Designer",
    industry: "Design & Fashion",
    description: "A creative professional who designs clothing, accessories, and footwear",
    whatItIs: "A fashion designer is a creative professional who designs original clothing, accessories, and footwear, often following or setting global trends. They may work for major retailers like Woolworths or Mr Price as buyers/designers or run independent labels showcased at SA Fashion Week.",
    whatTheyDo: "Designs garments and accessories, creates fashion collections, uses CAD software, conducts trend research, selects fabrics, oversees production, and develops brand identity.",
    skillsNeeded: ["Garment construction", "Textile knowledge", "CAD (Computer-Aided Design)", "Trend forecasting", "Creativity"],
    certifications: ["B.Tech Fashion Design", "Fashion Design Diploma"],
    tertiaryInstitutions: ["STADIO School of Fashion", "Cape Town College of Fashion Design (CTCFD)", "Nelson Mandela University (NMU)"],
    image: "https://picsum.photos/400/300?random=100",
  },
  {
    name: "Flight Attendant (Cabin Crew)",
    industry: "Aviation & Hospitality",
    description: "A member of aircrew who ensures passenger safety and comfort during flights",
    whatItIs: "A flight attendant (cabin crew) is a member of an aircrew who ensures the safety and comfort of passengers during commercial or private flights. At airlines like SAA, Airlink, or Safair, they perform safety demonstrations, handle in-flight emergencies, and provide customer service.",
    whatTheyDo: "Performs safety demonstrations, serves passengers, manages in-flight emergencies, maintains cabin safety, provides first aid, handles customer service, and conducts evacuations.",
    skillsNeeded: ["Emergency first aid", "Conflict resolution", "Multilingualism", "Physical stamina", "Communication"],
    certifications: ["SACAA Cabin Crew License", "First Aid Certification", "Emergency Response Training"],
    tertiaryInstitutions: ["The Academy of Aviation", "Future Flyers", "Skyy Aviation Academy"],
    image: "https://picsum.photos/400/300?random=101",
  },
  {
    name: "Firefighter",
    industry: "Emergency Services",
    description: "An emergency responder trained to extinguish fires and perform rescues",
    whatItIs: "A firefighter is an emergency responder trained to extinguish hazardous fires and perform rescues in various environments. Employed by municipal fire departments or organizations like 'Working on Fire,' they respond to urban fires, veld fires, and vehicle accidents.",
    whatTheyDo: "Responds to emergency calls, extinguishes fires, performs rescues, operates fire equipment, provides emergency medical aid, conducts fire safety inspections, and trains communities.",
    skillsNeeded: ["Physical fitness", "Bravery", "Teamwork", "Technical knowledge", "Problem-solving"],
    certifications: ["Firefighter Certification", "Emergency Medical Response Training", "Fire Safety Training"],
    tertiaryInstitutions: ["EMCARE", "Rural Metro Emergency Management Services", "City of Joburg Fire Academy"],
    image: "https://picsum.photos/400/300?random=102",
  },
  {
    name: "Food Scientist",
    industry: "Science & Food Industry",
    description: "A professional who studies food processes and improves food safety and preservation",
    whatItIs: "A food scientist is a professional who uses chemistry, microbiology, and engineering to study the nature of foods and improve food processing and preservation. Working for Tiger Brands or Nestlé, they develop new food products, ensure safety standards (HACCP), and design packaging to extend shelf life.",
    whatTheyDo: "Develops food products, conducts safety testing, ensures HACCP compliance, analyzes nutritional content, optimizes food processing, designs packaging, and conducts quality control.",
    skillsNeeded: ["Scientific research", "Quality control", "Biochemistry", "Data analysis", "Problem-solving"],
    certifications: ["B.Sc Food Science", "M.Sc Food Science and Technology"],
    tertiaryInstitutions: ["Stellenbosch University (SU)", "Cape Peninsula University of Technology (CPUT)", "University of Venda (UNIVEN)"],
    image: "https://picsum.photos/400/300?random=103",
  },
  {
    name: "Fitter and Turner (Trade)",
    industry: "Trade & Manufacturing",
    description: "A skilled artisan who uses machine tools to manufacture and repair metal parts",
    whatItIs: "A fitter and turner is a highly skilled artisan who uses machine tools to manufacture and repair metal parts for industrial machinery. Crucial in the mining and manufacturing sectors, they read engineering drawings and use lathes and milling machines to create precision components.",
    whatTheyDo: "Reads engineering drawings, operates lathes and milling machines, manufactures precision parts, repairs machinery, performs quality checks, maintains equipment, and documents work.",
    skillsNeeded: ["Technical drawing interpretation", "Precision measurement", "Manual machining skills", "Problem-solving", "Attention to detail"],
    certifications: ["N4/N5 Fitting and Turning", "Trade Diploma"],
    tertiaryInstitutions: ["False Bay TVET College", "Artisan Training Institute (ATI)", "SEIFSA Technical Centre"],
    image: "https://picsum.photos/400/300?random=104",
  },
  {
    name: "Fiduciary Specialist",
    industry: "Legal & Estate Management",
    description: "An expert in legal and ethical management of assets for wills, trusts, and estates",
    whatItIs: "A fiduciary specialist is an expert in the legal and ethical management of assets on behalf of another person, specifically relating to wills, trusts, and estates. At trust companies or law firms, they draft complex wills, administer deceased estates, and act as trustees to ensure assets are distributed according to the law.",
    whatTheyDo: "Drafts wills and trusts, administers deceased estates, manages trust assets, provides legal advice, ensures regulatory compliance, distributes estate assets, and maintains records.",
    skillsNeeded: ["Legal drafting", "Empathy", "Ethics", "Estate law knowledge", "Attention to detail"],
    certifications: ["LLB degree", "Advanced Diploma in Estate and Trust Administration"],
    tertiaryInstitutions: ["University of the Free State (UFS)", "Fiduciary Institute of Southern Africa (FISA)", "Law Schools"],
    image: "https://picsum.photos/400/300?random=105",
  },
];

async function main() {
  try {
    console.log("Starting to add F careers...\n");

    let addedCount = 0;
    let skippedCount = 0;

    for (const career of fCareersData) {
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
