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

const dCareersData = [
  {
    name: "Data Scientist",
    industry: "Technology & Data",
    description: "An expert who uses scientific methods and algorithms to extract knowledge and insights from data",
    whatItIs: "A data scientist is an expert who uses scientific methods, processes, and algorithms to extract knowledge and insights from structured and unstructured data. They help businesses predict future trends, optimize pricing, and understand customer behavior through machine learning models.",
    whatTheyDo: "Collects data, performs analysis, builds predictive models, creates visualizations, interprets results, implements solutions, and communicates insights.",
    skillsNeeded: ["Programming (Python, R)", "SQL", "Statistical modeling", "Data visualization (Tableau/PowerBI)", "Problem-solving"],
    certifications: ["B.Sc Data Science", "M.Sc Data Science", "Data Science Certificate"],
    tertiaryInstitutions: ["University of Cape Town (UCT)", "Wits University", "University of Pretoria (UP)", "Stellenbosch University (SU)"],
    image: "https://picsum.photos/400/300?random=79",
  },
  {
    name: "Database Administrator (DBA)",
    industry: "Technology & IT",
    description: "A technical specialist responsible for performance, integrity, and security of database systems",
    whatItIs: "A database administrator (DBA) is a technical specialist responsible for the performance, integrity, and security of a company's database systems. They ensure that data is stored efficiently, backed up regularly, and protected from unauthorized access or system crashes.",
    whatTheyDo: "Manages databases, performs backups, ensures data security, troubleshoots issues, optimizes performance, conducts testing, and maintains documentation.",
    skillsNeeded: ["SQL", "Database management systems (Oracle, MySQL)", "Troubleshooting", "Cybersecurity", "System administration"],
    certifications: ["Oracle Certified Associate", "Microsoft SQL Server certification", "B.Tech IT"],
    tertiaryInstitutions: ["UNISA", "Cape Peninsula University of Technology (CPUT)", "Tshwane University of Technology (TUT)", "CTU Career Campus"],
    image: "https://picsum.photos/400/300?random=80",
  },
  {
    name: "Dental Therapist",
    industry: "Healthcare & Dentistry",
    description: "A mid-level oral healthcare professional who provides basic dental care",
    whatItIs: "A dental therapist is a mid-level oral healthcare professional who provides basic dental care, such as fillings, cleanings, and simple extractions. Often found in community clinics and public hospitals, they bridge the gap between dental nurses and dentists, focusing on preventative care.",
    whatTheyDo: "Provides dental cleanings, applies fillings, performs simple extractions, educates patients on oral hygiene, assists dentists, and maintains patient records.",
    skillsNeeded: ["Clinical precision", "Patient education", "Empathy", "Manual dexterity", "Communication"],
    certifications: ["B.Tech Dental Therapy", "HPCSA registration"],
    tertiaryInstitutions: ["University of KwaZulu-Natal (UKZN)", "Sefako Makgatho Health Sciences University (SMU)"],
    image: "https://picsum.photos/400/300?random=81",
  },
  {
    name: "Dentist",
    industry: "Healthcare & Dentistry",
    description: "A medical professional who specializes in diagnosis and treatment of oral diseases",
    whatItIs: "A dentist is a medical professional who specializes in the diagnosis, prevention, and treatment of diseases and conditions of the oral cavity. In private practice or hospitals, they perform complex procedures like root canals, crown placements, and orthodontic assessments.",
    whatTheyDo: "Diagnoses oral diseases, performs dental procedures, manages patients, prescribes treatments, educates patients on oral health, and manages clinic operations.",
    skillsNeeded: ["Medical knowledge", "Fine motor skills", "Leadership", "Communication", "Diagnostic skills"],
    certifications: ["BDentSci/BDS", "HPCSA registration"],
    tertiaryInstitutions: ["University of Pretoria (UP)", "Wits University", "University of the Western Cape (UWC)", "Sefako Makgatho Health Sciences University (SMU)"],
    image: "https://picsum.photos/400/300?random=82",
  },
  {
    name: "Dermatologist",
    industry: "Healthcare & Medicine",
    description: "A medical doctor specializing in skin, hair, and nail conditions",
    whatItIs: "A dermatologist is a medical doctor who specializes in conditions involving the skin, hair, and nails. They diagnose skin cancers, treat chronic conditions like eczema, and perform cosmetic procedures.",
    whatTheyDo: "Diagnoses skin conditions, performs biopsies, treats dermatological disorders, performs cosmetic procedures, conducts research, and educates patients.",
    skillsNeeded: ["Clinical diagnosis", "Surgical skills", "Patient care", "Medical knowledge", "Attention to detail"],
    certifications: ["MBChB", "Master of Medicine (MMed) in Dermatology", "HPCSA registration"],
    tertiaryInstitutions: ["University of Cape Town (UCT)", "Wits University", "University of Pretoria (UP)"],
    image: "https://picsum.photos/400/300?random=83",
  },
  {
    name: "Dietitian",
    industry: "Healthcare & Nutrition",
    description: "A healthcare professional who applies nutritional science to manage health and treat diseases",
    whatItIs: "A dietitian is a healthcare professional who applies the science of nutrition to help people manage their health and treat diseases. They work in hospitals to create meal plans for recovering patients, or in the food industry to develop healthy products.",
    whatTheyDo: "Creates meal plans, counsels patients on nutrition, develops food products, conducts nutritional assessments, educates on healthy eating, and manages patient care.",
    skillsNeeded: ["Nutritional science", "Empathy", "Counseling", "Chemistry", "Communication"],
    certifications: ["B.Sc(Hons) Dietetics", "HPCSA registration"],
    tertiaryInstitutions: ["North-West University (NWU)", "University of Cape Town (UCT)", "University of Pretoria (UP)", "UKZN"],
    image: "https://picsum.photos/400/300?random=84",
  },
  {
    name: "Digital Marketer",
    industry: "Marketing & Digital",
    description: "A marketing specialist who uses digital channels to promote brands and products",
    whatItIs: "A digital marketer is a marketing specialist who uses digital channels (social media, search engines, email) to promote brands and products. They manage online advertising budgets, create social media content, and track the return on investment of digital campaigns.",
    whatTheyDo: "Creates digital marketing strategies, manages social media, performs SEO/SEM, creates content, manages advertising budgets, and analyzes performance metrics.",
    skillsNeeded: ["SEO/SEM", "Content creation", "Copywriting", "Data analytics", "Social media management"],
    certifications: ["Google Digital Marketing Certificate", "HubSpot Certification", "B.Com Marketing"],
    tertiaryInstitutions: ["University of Johannesburg (UJ)", "Vega School", "Red & Yellow Creative School of Business"],
    image: "https://picsum.photos/400/300?random=85",
  },
  {
    name: "Diver (Commercial)",
    industry: "Maritime & Offshore",
    description: "A professional trained to work underwater in hazardous conditions",
    whatItIs: "A commercial diver is a professional trained to work underwater, often in hazardous conditions. In SA's offshore oil and gas or shipping industries, they perform underwater welding, inspections of ship hulls, or repairs on harbor infrastructure.",
    whatTheyDo: "Performs underwater welding, conducts inspections, repairs underwater equipment, maintains safety protocols, uses specialized diving equipment, and documents work.",
    skillsNeeded: ["Physical fitness", "Underwater welding", "Technical problem-solving", "Safety awareness", "Communication"],
    certifications: ["Commercial Diver License", "SA Department of Labour Certification", "Diving Qualifications"],
    tertiaryInstitutions: ["Jack's Dive Chest", "Seadog Commercial Diving", "Specialized Diving Schools"],
    image: "https://picsum.photos/400/300?random=86",
  },
  {
    name: "Draughtsperson (Draftsman)",
    industry: "Engineering & Design",
    description: "A technical specialist who prepares detailed drawings and plans for engineers and architects",
    whatItIs: "A draughtsperson (draftsman) is a technical specialist who prepares drawings and plans used by engineers and architects. They translate rough sketches into detailed 2D or 3D digital models (blueprints) using computer software.",
    whatTheyDo: "Creates technical drawings, develops blueprints, uses CAD software, interprets design specifications, maintains accuracy, and collaborates with engineers.",
    skillsNeeded: ["AutoCAD", "Revit", "SolidWorks", "Technical measurements", "Attention to detail"],
    certifications: ["N4/N5 Technical Drawing", "B.Tech Drafting and Design"],
    tertiaryInstitutions: ["Cape Peninsula University of Technology (CPUT)", "University of Johannesburg (UJ)", "Tshwane University of Technology (TUT)", "Academy of Draughting"],
    image: "https://picsum.photos/400/300?random=87",
  },
];

async function main() {
  try {
    console.log("Starting to add D careers...\n");

    let addedCount = 0;
    let skippedCount = 0;

    for (const career of dCareersData) {
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
