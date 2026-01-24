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

const additionalCareersData = [
  {
    name: "Acupuncturist",
    industry: "Healthcare & Alternative Medicine",
    description: "Alternative medicine specialist treating pain and illness via needle therapy",
    whatItIs: "An acupuncturist is a healthcare professional who uses traditional needle-based therapy to treat pain, illness, and various conditions. They work with the body's energy systems to promote healing.",
    whatTheyDo: "Assesses patients, performs acupuncture treatments, develops treatment plans, manages patient records, educates about wellness, and monitors progress.",
    skillsNeeded: ["Anatomy knowledge", "Needle technique", "Patient care", "Communication", "Attention to detail"],
    certifications: ["B.Tech Acupuncture", "AHPCSA registration"],
    tertiaryInstitutions: ["University of Johannesburg (UJ)", "Durban University of Technology (DUT)"],
    image: "https://picsum.photos/400/300?random=37",
  },
  {
    name: "Administrative Assistant",
    industry: "Administration & Office Management",
    description: "Manages office tasks, scheduling, and documentation for organizations",
    whatItIs: "An administrative assistant is a professional who manages office operations, schedules, handles correspondence, and ensures smooth administrative functions.",
    whatTheyDo: "Schedules meetings, manages calendars, prepares documents, handles correspondence, maintains records, processes paperwork, coordinates events, and provides general support.",
    skillsNeeded: ["Organization", "Communication", "Typing proficiency", "Attention to detail", "Time management"],
    certifications: ["N4/N5 Administrative Practice", "Office Management Certificate"],
    tertiaryInstitutions: ["Northlink College", "False Bay College", "IIE Varsity College"],
    image: "https://picsum.photos/400/300?random=38",
  },
  {
    name: "Advertising Copywriter",
    industry: "Marketing & Advertising",
    description: "Writes persuasive text for advertisements and marketing campaigns",
    whatItIs: "An advertising copywriter is a creative professional who writes compelling and persuasive text for advertisements, campaigns, and marketing materials.",
    whatTheyDo: "Develops concepts, writes advertising copy, researches audiences, collaborates with designers, edits content, tests messaging, and creates compelling narratives.",
    skillsNeeded: ["Creative writing", "Persuasion", "Research", "Creativity", "Attention to detail"],
    certifications: ["B.A Advertising", "Copywriting Certificate"],
    tertiaryInstitutions: ["AAA School of Advertising", "Vega School", "University of Johannesburg (UJ)"],
    image: "https://picsum.photos/400/300?random=39",
  },
  {
    name: "Aircraft Maintenance Technician",
    industry: "Aviation & Maintenance",
    description: "Inspects and repairs aircraft engines and systems to ensure flight safety",
    whatItIs: "An aircraft maintenance technician is a professional who inspects, maintains, and repairs aircraft engines, systems, and components to ensure safety and performance.",
    whatTheyDo: "Performs inspections, diagnoses mechanical issues, repairs components, replaces parts, conducts tests, maintains documentation, and ensures compliance with regulations.",
    skillsNeeded: ["Mechanical knowledge", "Attention to detail", "Problem-solving", "Technical proficiency", "Safety awareness"],
    certifications: ["AME (Aircraft Maintenance Engineer)", "CAA certification"],
    tertiaryInstitutions: ["Denel Aviation", "MATA (Maintenance and Technical Academy)"],
    image: "https://picsum.photos/400/300?random=40",
  },
  {
    name: "Airline Pilot",
    industry: "Aviation",
    description: "Flies commercial or private aircraft while ensuring passenger safety",
    whatItIs: "An airline pilot is a professional who operates commercial or private aircraft, navigates routes, and ensures safe and efficient flight operations.",
    whatTheyDo: "Plans flight routes, conducts pre-flight checks, operates aircraft, navigates using instruments, manages fuel, communicates with air traffic control, and ensures passenger safety.",
    skillsNeeded: ["Decision-making", "Spatial awareness", "Technical knowledge", "Communication", "Calm under pressure"],
    certifications: ["CPL (Commercial Pilot License)", "ATPL (Airline Transport Pilot)"],
    tertiaryInstitutions: ["43 Air School", "Airline Flight Academy", "CAA Flight Schools"],
    image: "https://picsum.photos/400/300?random=41",
  },
  {
    name: "Ambulance Emergency Assistant",
    industry: "Emergency Medical Services",
    description: "Provides pre-hospital emergency medical care and transport",
    whatItIs: "An ambulance emergency assistant is a healthcare professional who provides pre-hospital emergency care and transport to patients in critical situations.",
    whatTheyDo: "Responds to emergency calls, provides first aid, manages patient vitals, operates equipment, communicates with hospitals, documents incidents, and performs CPR.",
    skillsNeeded: ["Quick thinking", "Physical capability", "Calm under pressure", "Communication", "Medical knowledge"],
    certifications: ["Emergency Care Assistant", "BLS certification"],
    tertiaryInstitutions: ["COJEMS (College of Emergency Medical Services)", "Lebone College"],
    image: "https://picsum.photos/400/300?random=42",
  },
  {
    name: "Animator",
    industry: "Design & Creative",
    description: "Creates moving images and animations for film, television, and gaming",
    whatItIs: "An animator is a creative professional who creates sequences of images that produce the illusion of movement for entertainment and media productions.",
    whatTheyDo: "Develops concepts, creates storyboards, designs characters, produces animation frames, uses animation software, collaborates with teams, and delivers final content.",
    skillsNeeded: ["Artistic ability", "Animation software", "Creativity", "Attention to detail", "Time management"],
    certifications: ["B.Tech Animation", "Animation Certificate"],
    tertiaryInstitutions: ["The Animation School", "Open Window Academy", "Vega School"],
    image: "https://picsum.photos/400/300?random=43",
  },
  {
    name: "Applications Developer",
    industry: "Technology & Software",
    description: "Designs and codes software applications for mobile and desktop platforms",
    whatItIs: "An applications developer is a programmer who designs, develops, and maintains software applications for various platforms including mobile, web, and desktop.",
    whatTheyDo: "Writes code, designs architecture, fixes bugs, performs testing, creates documentation, debugs issues, optimizes code, and collaborates with teams.",
    skillsNeeded: ["Programming languages", "Problem-solving", "Version control", "Database design", "Communication"],
    certifications: ["B.Sc Computer Science", "App Development Certificate"],
    tertiaryInstitutions: ["University of Johannesburg (UJ)", "Wits University", "WeThinkCode"],
    image: "https://picsum.photos/400/300?random=44",
  },
  {
    name: "Archaeologist",
    industry: "Science & History",
    description: "Studies human history through excavation and analysis of artifacts and sites",
    whatItIs: "An archaeologist is a scientist who studies human history and prehistory by excavating, analyzing, and interpreting archaeological sites and artifacts.",
    whatTheyDo: "Conducts excavations, analyzes artifacts, documents findings, performs carbon dating, publishes research, presents findings, and contributes to historical knowledge.",
    skillsNeeded: ["Research methodology", "Attention to detail", "Physical capability", "Data analysis", "Communication"],
    certifications: ["B.A Archaeology", "B.Sc(Hons) Archaeology"],
    tertiaryInstitutions: ["University of the Witwatersrand (Wits)", "University of Pretoria (UP)"],
    image: "https://picsum.photos/400/300?random=45",
  },
  {
    name: "Artificial Intelligence (AI) Specialist",
    industry: "Technology & Data",
    description: "Develops algorithms and systems that allow computers to learn and make decisions",
    whatItIs: "An AI specialist is a computer scientist who develops artificial intelligence algorithms and systems that enable machines to learn from data and make intelligent decisions.",
    whatTheyDo: "Develops AI models, trains algorithms, analyzes data, creates predictive systems, tests solutions, optimizes performance, and implements machine learning solutions.",
    skillsNeeded: ["Python/R programming", "Machine learning", "Data science", "Mathematics", "Problem-solving"],
    certifications: ["M.Sc Artificial Intelligence", "AI/ML Certificate"],
    tertiaryInstitutions: ["Stellenbosch University", "University of Cape Town (UCT)", "University of the Witwatersrand (Wits)"],
    image: "https://picsum.photos/400/300?random=46",
  },
  {
    name: "Astronomer",
    industry: "Science & Astronomy",
    description: "Studies celestial bodies and the universe to understand cosmic phenomena",
    whatItIs: "An astronomer is a scientist who studies celestial objects, space phenomena, and the universe using telescopes, spectroscopy, and observational methods.",
    whatTheyDo: "Conducts observations, analyzes data, develops theories, publishes research, teaches, presents findings, and contributes to astronomical knowledge.",
    skillsNeeded: ["Physics knowledge", "Mathematics", "Data analysis", "Observation skills", "Research methodology"],
    certifications: ["B.Sc(Hons) Astronomy", "M.Sc Astronomy"],
    tertiaryInstitutions: ["University of Cape Town (UCT)", "North-West University (NWU)", "UNISA"],
    image: "https://picsum.photos/400/300?random=47",
  },
];

async function main() {
  try {
    console.log("Starting to add additional careers...");

    let addedCount = 0;
    let skippedCount = 0;

    for (const career of additionalCareersData) {
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
