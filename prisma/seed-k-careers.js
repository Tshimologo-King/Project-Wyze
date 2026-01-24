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
  console.log("Starting to add K careers...");

  const kCareers = [
    {
      name: "Biokineticist",
      industry: "Healthcare & Rehabilitation",
      description: "A healthcare professional who uses scientifically-based exercise as a therapeutic modality for rehabilitation and disease prevention.",
      whatItIs: "A biokineticist (or kinetics specialist) is a healthcare professional who prescribes and supervises therapeutic exercise programs. They use movement science to treat injuries, manage chronic diseases, and optimize athletic performance.",
      whatTheyDo: "Working in private clinics, sports clubs, or corporate wellness centers, they conduct clinical assessments, design personalized exercise programs, monitor patient progress in rehabilitation, manage orthopedic injuries, optimize sports performance, and provide patient education on exercise and lifestyle.",
      skillsNeeded: ["Clinical assessment and evaluation", "Exercise prescription", "Human anatomy and physiology knowledge", "Patient empathy", "Progress monitoring", "Communication skills"],
      certifications: ["Bachelor's degree in Biokinestics or Exercise Science", "HPCSA (Health Professions Council of South Africa) registration", "Protected title in SA - HPCSA registration required to practice"],
      tertiaryInstitutions: ["University of the Witwatersrand (Wits)", "University of Pretoria (UP)", "Stellenbosch University (SU)", "University of Johannesburg (UJ)", "Nelson Mandela University (NMU)"],
      image: "https://images.unsplash.com/photo-1552886837-24bfdf81ca51?w=500&h=300&fit=crop"
    },
    {
      name: "Key Account Manager (KAM)",
      industry: "Sales & Business Development",
      description: "A senior sales specialist responsible for managing and growing a company's most important high-revenue client accounts.",
      whatItIs: "A Key Account Manager is a strategic sales professional who serves as the primary contact for the company's most valuable (platinum) clients. They build long-term relationships and ensure client satisfaction and loyalty.",
      whatTheyDo: "Found in FMCG, banking, and tech sectors, they manage high-value client relationships, develop strategic account plans, negotiate contracts, identify upsell opportunities, resolve client issues, and report on account performance and forecasts.",
      skillsNeeded: ["Negotiation skills", "Strategic planning", "Relationship building", "Financial analysis", "Sales acumen", "Communication excellence"],
      certifications: ["BCom in Marketing or Business Management", "Sales and relationship management training", "Account management certifications", "CRM software proficiency"],
      tertiaryInstitutions: ["University of Cape Town (UCT)", "University of the Witwatersrand (Wits)", "University of Johannesburg (UJ)", "IMM Graduate School"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
    },
    {
      name: "Kindergarten Teacher (ECD)",
      industry: "Education & Early Childhood Development",
      description: "An Early Childhood Development specialist who focuses on the physical, social, and cognitive development of young children from birth to age 6.",
      whatItIs: "A kindergarten or kleuterskool teacher is an educational professional specializing in early childhood development (ECD). They create nurturing, play-based learning environments that support children's holistic development.",
      whatTheyDo: "Working in preschools and kindergartens, they design age-appropriate activities, create stimulating learning environments, conduct developmental assessments, communicate with parents, manage classroom behavior, and prepare children for formal schooling.",
      skillsNeeded: ["Child psychology understanding", "Creativity and innovation", "Patience and empathy", "First aid and safety knowledge", "Communication with parents", "Classroom management"],
      certifications: ["Degree in Early Childhood Development (ECD)", "N4–N6 in Educare", "First Aid certification", "SACMEQ literacy and numeracy training"],
      tertiaryInstitutions: ["UNISA", "North-West University (NWU)", "Tshwane University of Technology (TUT)", "Various TVET colleges offering Educare"],
      image: "https://images.unsplash.com/photo-1503454537688-e6694fdbb9ab?w=500&h=300&fit=crop"
    },
    {
      name: "Kennel Manager / Supervisor",
      industry: "Animal Care & Management",
      description: "A professional responsible for the daily operations of animal boarding facilities, shelters, or veterinary kennels.",
      whatItIs: "A kennel manager is a professional who oversees animal care facilities. They manage animal welfare, staff, facilities, and operations at shelters, pet hotels, breeding facilities, or veterinary clinics.",
      whatTheyDo: "They supervise animal care staff, monitor animal health and behavior, maintain facility hygiene and safety standards, schedule staff and resources, manage inventory, ensure compliance with animal welfare regulations, and provide customer service to pet owners.",
      skillsNeeded: ["Animal behavior knowledge", "Administrative management", "Veterinary first aid basics", "Staff leadership", "Problem-solving", "Record-keeping"],
      certifications: ["Animal Health or Veterinary Nursing diploma", "Animal Welfare certification", "Management training", "Experience in animal care"],
      tertiaryInstitutions: ["University of Pretoria - Onderstepoort (UP)", "SPCA training programs", "Various veterinary nursing colleges"],
      image: "https://images.unsplash.com/photo-1546527868-ccb7ee566dda?w=500&h=300&fit=crop"
    },
    {
      name: "Kiln Operator",
      industry: "Manufacturing & Mining",
      description: "A technical operator who controls large industrial ovens (kilns) used to process raw materials into finished products.",
      whatItIs: "A kiln operator is a technical professional who operates and monitors large industrial furnaces. They manage temperature, chemical processes, and quality control in manufacturing and mining operations.",
      whatTheyDo: "Essential in mining and brick-making industries like Corobrik, they monitor kiln temperatures, adjust controls to maintain specifications, perform routine maintenance, ensure safety compliance, conduct quality checks, and keep detailed operational records.",
      skillsNeeded: ["Technical monitoring", "Safety compliance knowledge", "Mechanical aptitude", "Temperature and chemistry understanding", "Attention to detail", "Problem-solving"],
      certifications: ["NQF Level 4 in Manufacturing Operations", "In-house vocational training", "Safety and health certification", "Machine operation certification"],
      tertiaryInstitutions: ["CPUT", "Vaal University of Technology (VUT)", "In-house industry training programs"],
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=300&fit=crop"
    },
    {
      name: "Kitchen Designer",
      industry: "Interior Design & Home Solutions",
      description: "A specialized interior designer who focuses on the functional and aesthetic layout of residential or commercial kitchens.",
      whatItIs: "A kitchen designer is an interior design specialist who creates custom kitchen solutions. They combine aesthetics with functionality, optimizing space, workflow, and user experience.",
      whatTheyDo: "Working for high-end decor firms or retailers like Easylife Kitchens, they consult with clients on needs and preferences, create 3D design renderings, select materials and finishes, coordinate with contractors and suppliers, and oversee installation.",
      skillsNeeded: ["Spatial planning and design", "CAD software (Winner, AutoCAD)", "Knowledge of building codes and plumbing/electrical", "Client communication", "Product knowledge", "Attention to detail"],
      certifications: ["Diploma in Interior Design", "CAD software certification", "Design school qualification", "Kitchen design specialization"],
      tertiaryInstitutions: ["Inscape Education Group", "Greenside Design Center", "Vega School", "Stellenbosch University (Visual Arts)"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop"
    },
    {
      name: "Kotlin / Kubernetes Specialist",
      industry: "Technology & Cloud Infrastructure",
      description: "A specialized IT professional focusing on modern programming (Kotlin) or cloud infrastructure management (Kubernetes).",
      whatItIs: "A Kotlin/Kubernetes specialist is an advanced software engineer who specializes in modern mobile app development (Kotlin) or container orchestration and cloud infrastructure (Kubernetes).",
      whatTheyDo: "In SA's tech hubs like Silicon Cape or Jo'burg fintech districts, they build scalable mobile applications using Kotlin, manage microservices architecture, deploy containerized applications, automate DevOps processes, and ensure system reliability and performance.",
      skillsNeeded: ["Kotlin and Java programming", "Kubernetes and Docker expertise", "Cloud architecture (AWS, GCP, Azure)", "DevOps and CI/CD pipelines", "Problem-solving", "System design"],
      certifications: ["Bachelor's in Computer Science or Software Engineering", "Kotlin certification", "Kubernetes (CKA) certification", "Cloud platform certifications (AWS, GCP)"],
      tertiaryInstitutions: ["University of Cape Town (UCT)", "University of the Witwatersrand (Wits)", "HyperionDev", "WeThinkCode_"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop"
    }
  ];

  for (const career of kCareers) {
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
  const addedCount = kCareers.filter(c => !kCareers.slice(0, kCareers.indexOf(c)).some(existing => existing.name === c.name)).length;
  
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
