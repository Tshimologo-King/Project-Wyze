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
  console.log("Starting to add M careers...");

  const mCareers = [
    {
      name: "Mechanical Engineer",
      industry: "Engineering & Manufacturing",
      description: "An engineer who designs, develops, and maintains mechanical systems and machinery from small sensors to massive industrial plants.",
      whatItIs: "A mechanical engineer is a professional who applies physics and mathematics to design and develop mechanical systems. They work across diverse industries to create machines, engines, and systems that solve practical problems.",
      whatTheyDo: "A skill in high demand in SA, they work for firms like Transnet, Eskom, and BMW SA. They design vehicle engines, develop renewable energy systems like wind turbines, create HVAC systems, manage equipment maintenance, and solve complex engineering challenges.",
      skillsNeeded: ["Thermodynamics and fluid mechanics", "CAD software (SolidWorks)", "Complex problem-solving", "Project management", "Technical analysis", "Materials knowledge"],
      certifications: ["Bachelor's degree in Mechanical Engineering", "Professional Engineer (PrEng) registration", "CAD certifications", "Specialized engineering certifications"],
      tertiaryInstitutions: ["University of Cape Town (UCT)", "University of the Witwatersrand (Wits)", "University of Pretoria (UP)", "Stellenbosch University", "University of Johannesburg (UJ)"],
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop"
    },
    {
      name: "Mining Engineer",
      industry: "Mining & Resources",
      description: "A specialist responsible for the safe and efficient extraction of minerals like gold, coal, and platinum from the earth.",
      whatItIs: "A mining engineer is a professional who designs and manages mining operations. They combine geological knowledge with engineering expertise to extract minerals safely and sustainably.",
      whatTheyDo: "Vital for SA giants like Anglo American and Sibanye-Stillwater, they plan mine layouts, oversee underground safety protocols, manage technical extraction equipment, conduct feasibility studies, and ensure compliance with mining regulations.",
      skillsNeeded: ["Geological knowledge", "Explosives handling and safety", "Project management", "Structural engineering", "Safety compliance", "Resource planning"],
      certifications: ["Bachelor's degree in Mining Engineering", "Professional Engineer (PrEng) registration", "Mining Safety certification", "First Aid and rescue training"],
      tertiaryInstitutions: ["University of the Witwatersrand (Wits)", "University of Pretoria (UP)"],
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop"
    },
    {
      name: "Marine Engineer",
      industry: "Shipping & Maritime",
      description: "A specialist who maintains and operates the machinery on ships, including engines, pumps, and electrical systems.",
      whatItIs: "A marine engineer is a technical professional who manages the mechanical and electrical systems of vessels. They ensure ships remain seaworthy and operational at sea.",
      whatTheyDo: "Working for shipping lines like Maersk or the SA Navy, they maintain marine propulsion systems, manage engine operations, troubleshoot technical issues, ensure safety at sea, conduct preventive maintenance, and manage high-pressure systems.",
      skillsNeeded: ["Marine propulsion systems", "Technical troubleshooting", "Safety at sea", "High-pressure system maintenance", "Electrical knowledge", "Problem-solving"],
      certifications: ["Diploma in Marine Engineering", "STCW (Standards of Training, Certification and Watchkeeping) certificates", "Chief Engineer certification", "Safety and survival training"],
      tertiaryInstitutions: ["Cape Peninsula University of Technology (CPUT - Granger Bay Campus)", "Durban University of Technology (DUT)"],
      image: "https://images.unsplash.com/photo-1554224311-beee415c15c7?w=500&h=300&fit=crop"
    },
    {
      name: "Microbiologist",
      industry: "Science & Healthcare",
      description: "A scientist who studies microscopic organisms like bacteria, viruses, and fungi to understand their effects on humans, animals, and the environment.",
      whatItIs: "A microbiologist is a scientist who studies microorganisms and their characteristics. They conduct research and testing to understand microbial behavior and impacts.",
      whatTheyDo: "They work in medical labs like Lancet to identify infections in patient samples, in food industry companies like Tiger Brands to ensure products are free from harmful pathogens, conduct quality control testing, and contribute to research and development.",
      skillsNeeded: ["Laboratory research methods", "Microscopic analysis", "Genetics knowledge", "Data management and analysis", "Aseptic techniques", "Quality control"],
      certifications: ["Bachelor's degree in Microbiology", "Master's/PhD for research roles", "HPCSA registration (if applicable)", "Laboratory safety certification"],
      tertiaryInstitutions: ["University of KwaZulu-Natal (UKZN)", "University of Cape Town (UCT)", "University of Pretoria (UP)", "University of the Witwatersrand (Wits)", "Stellenbosch University"],
      image: "https://images.unsplash.com/photo-1576091160550-112173e7f7cb?w=500&h=300&fit=crop"
    },
    {
      name: "Metallurgical Engineer",
      industry: "Metallurgy & Materials Science",
      description: "A specialist in the study of metals and their properties, specifically how to extract them from ores and turn them into usable products.",
      whatItIs: "A metallurgical engineer (or metallurgist) is a professional who studies metals and develops processes to extract, refine, and process them. They combine chemistry with engineering principles.",
      whatTheyDo: "Essential for SA's mineral processing plants, they develop efficient metal refining processes, test materials for strength and corrosion resistance, conduct quality control testing, optimize extraction methods, and innovate new metallurgical techniques.",
      skillsNeeded: ["Chemistry of metals", "Material science", "Quality control procedures", "Laboratory testing", "Process optimization", "Problem-solving"],
      certifications: ["Bachelor's degree in Metallurgical Engineering", "Professional Engineer (PrEng) registration", "Materials testing certification", "Laboratory certifications"],
      tertiaryInstitutions: ["University of the Witwatersrand (Wits)", "University of Johannesburg (UJ)", "University of Pretoria (UP)"],
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop"
    },
    {
      name: "Marketing Manager",
      industry: "Business & Marketing",
      description: "A professional responsible for developing and executing strategies to promote a brand, product, or service.",
      whatItIs: "A marketing manager is a business professional who creates and implements marketing strategies. They drive brand awareness, customer engagement, and revenue growth.",
      whatTheyDo: "Found in every sector from retail (Woolworths) to finance (Old Mutual), they manage advertising budgets, conduct market research, lead digital marketing teams, develop campaigns, analyze consumer behavior, and measure marketing ROI.",
      skillsNeeded: ["Strategic planning and execution", "Consumer behavior analysis", "Brand management", "Communication and presentation", "Data analytics", "Digital marketing knowledge"],
      certifications: ["Bachelor's degree in Marketing or Business", "MBA (preferred for senior roles)", "Marketing certifications (HubSpot, Google)", "Analytics training"],
      tertiaryInstitutions: ["IMM Graduate School", "Vega School", "University of Cape Town (UCT)", "University of Johannesburg (UJ)"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
    },
    {
      name: "Medical Specialist",
      industry: "Healthcare & Medicine",
      description: "A doctor who has completed advanced training in a specific branch of medicine such as cardiology, neurology, or surgery.",
      whatItIs: "A medical specialist is a physician who has completed specialized postgraduate training in a specific medical field. They provide expert diagnosis and treatment in their specialty.",
      whatTheyDo: "They lead clinical teams in private hospitals like Mediclinic and Netcare or public academic hospitals, handle the most complex patient cases, perform specialized procedures, conduct clinical research, and mentor junior doctors.",
      skillsNeeded: ["Advanced medical diagnosis", "Surgical or clinical precision", "Specialized medical knowledge", "Research abilities", "Leadership and mentorship", "Patient care excellence"],
      certifications: ["MBChB degree", "Postgraduate specialization (MMed - 4+ years)", "HPCSA registration", "Specialty board certification"],
      tertiaryInstitutions: ["University of the Witwatersrand (Wits)", "University of Cape Town (UCT)", "Sefako Makgatho Health Sciences University (SMU)", "University of KwaZulu-Natal (UKZN)", "University of Pretoria (UP)"],
      image: "https://images.unsplash.com/photo-1631217314830-4e6019e52c5f?w=500&h=300&fit=crop"
    },
    {
      name: "Millwright",
      industry: "Skilled Trades & Manufacturing",
      description: "A highly skilled dual-trade artisan trained as both an electrician and a mechanical fitter.",
      whatItIs: "A millwright is a versatile skilled tradesperson who combines electrical and mechanical expertise. They are highly valued for their ability to troubleshoot and repair complex machinery.",
      whatTheyDo: "Extremely valuable in manufacturing and mining, they are the 'doctors of machinery' who fix both mechanical parts and electrical wiring of factory machines, perform equipment installation, conduct preventive maintenance, and troubleshoot complex systems.",
      skillsNeeded: ["Electrical troubleshooting", "Mechanical fitting skills", "Blueprint reading", "Welding and fabrication", "Machine operation", "Safety compliance"],
      certifications: ["NQF Level 4 in Millwright or dual trades", "Electrical and mechanical certification", "Welding certification", "Health and Safety in manufacturing"],
      tertiaryInstitutions: ["Northlink College", "False Bay TVET College", "Artisan Training Institute (ATI)", "Various TVET colleges"],
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop"
    }
  ];

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of mCareers) {
    const exists = await prisma.career.findUnique({
      where: { name: career.name }
    });

    if (exists) {
      console.log(`⏭️  Skipped (already exists): ${career.name}`);
      skippedCount++;
    } else {
      await prisma.career.create({
        data: career
      });
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
