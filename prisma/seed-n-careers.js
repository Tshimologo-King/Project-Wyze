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
        process.env[key] = value;
      }
    }
  });
}

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const nCareers = [
  {
    name: "Nurse (Registered / Professional)",
    industry: "Healthcare",
    description:
      "A registered healthcare professional authorized to practice nursing independently after completing a degree or diploma.",
    whatItIs:
      "A qualified health professional who has completed nursing education and is registered with the South African Nursing Council (SANC). Nurses are the backbone of the healthcare system in South Africa.",
    whatTheyDo:
      "Manage patient care plans, administer medications, monitor patient vital signs, provide emotional support, and can specialize in areas such as Trauma, Midwifery, Pediatrics, or ICU. They work in hospitals like Groote Schuur and Chris Hani Baragwanath, private clinics, and community health centers.",
    skillsNeeded: [
      "Clinical expertise",
      "Patient advocacy",
      "Emergency response",
      "Empathy and compassion",
      "Communication skills",
      "Critical thinking",
      "Physical stamina",
    ],
    certifications: [
      "Registered Nurse (RN) qualification",
      "SANC Registration",
      "BScN or Diploma in Nursing",
      "Specializations (Trauma, Midwifery, ICU, etc.)",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Netcare Education",
      "Durban University of Technology",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Network Engineer",
    industry: "Information Technology",
    description:
      "An IT specialist who designs, implements, and manages digital networks that enable computer communication and data transfer.",
    whatItIs:
      "A skilled IT professional responsible for designing and maintaining the infrastructure that connects computers and devices within organizations. They ensure network stability, security, and optimal performance across LAN/WAN systems.",
    whatTheyDo:
      "Design and implement network systems, configure routers and switches, manage network security, troubleshoot connectivity issues, and maintain system reliability. They work for large South African firms like Discovery and Telkom, ensuring internal internet systems are fast, stable, and secure from external threats.",
    skillsNeeded: [
      "Routing and switching",
      "Cisco CCNA/CCNP certifications",
      "Network security",
      "Troubleshooting expertise",
      "TCP/IP protocols",
      "Firewalls and VPNs",
      "Network monitoring tools",
    ],
    certifications: [
      "Cisco CCNA (Certified Associate Network Engineer)",
      "Cisco CCNP (Certified Professional Network Engineer)",
      "CompTIA Network+",
      "Advanced Network certifications",
    ],
    tertiaryInstitutions: [
      "University of Johannesburg (UJ)",
      "Tshwane University of Technology (TUT)",
      "CTU Career Campus",
      "Damelin",
      "IIE (Vega School)",
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    name: "Naturopath",
    industry: "Healthcare / Wellness",
    description:
      "A primary healthcare practitioner who uses natural therapies to support and enhance the body's self-healing processes.",
    whatItIs:
      "A qualified healthcare professional who focuses on natural and holistic approaches to health. In South Africa, they must be registered with the Allied Health Professions Council of South Africa (AHPCSA) and use evidence-based natural therapies.",
    whatTheyDo:
      "Use nutrition, herbal medicine, lifestyle advice, and other natural therapies to treat chronic conditions and promote wellness. They work in private wellness clinics, multidisciplinary health centers, and community health programs, treating conditions through holistic diagnosis and patient counseling.",
    skillsNeeded: [
      "Holistic diagnosis",
      "Herbalism knowledge",
      "Clinical nutrition",
      "Patient counseling",
      "Understanding of natural remedies",
      "Research and evidence evaluation",
      "Communication skills",
    ],
    certifications: [
      "BCM (Natural Medicine) degree",
      "AHPCSA Registration",
      "Advanced Herbalism",
      "Clinical Nutrition qualification",
    ],
    tertiaryInstitutions: [
      "University of the Western Cape (UWC) - Only BCM degree in SA",
      "University of Johannesburg",
      "Technikon SA",
      "ICAS (Institute of Classical & Applied Studies)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160399-20d08df4330f?w=800&q=80",
  },
  {
    name: "Nuclear Engineer",
    industry: "Energy / Engineering",
    description:
      "A highly specialized engineer who develops processes and systems to derive benefits from nuclear energy while ensuring safety and radiation protection.",
    whatItIs:
      "An advanced engineer with expertise in nuclear physics and engineering principles. Nuclear Engineers work on critical infrastructure that generates clean energy and must maintain the highest safety standards for nuclear operations.",
    whatTheyDo:
      "Research and develop nuclear processes, manage reactor operations, conduct safety audits, and ensure radiation protection protocols. In South Africa, they primarily work at Koeberg Nuclear Power Station or Necsa (South African Nuclear Energy Corporation) to oversee nuclear safety and energy generation.",
    skillsNeeded: [
      "Advanced physics and mathematics",
      "Mathematical modeling",
      "Safety auditing",
      "Radiation protection",
      "Systems design",
      "Risk analysis",
      "Technical documentation",
    ],
    certifications: [
      "Nuclear Engineering degree (BSc/MSc)",
      "Radiation Protection certification",
      "Advanced Safety Management",
      "Postgraduate specialization",
    ],
    tertiaryInstitutions: [
      "North-West University (NWU) - Postgraduate",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "University of Cape Town (UCT)",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    name: "Neurologist",
    industry: "Healthcare / Medicine",
    description:
      "A medical doctor specializing in the diagnosis and treatment of nervous system disorders including the brain, spinal cord, and peripheral nerves.",
    whatItIs:
      "A highly trained medical specialist with extensive knowledge of neurology and neurological conditions. Neurologists are experts in diagnosing and managing complex brain and nervous system disorders in specialized clinical settings.",
    whatTheyDo:
      "Diagnose and treat neurological conditions such as epilepsy, strokes, Parkinson's disease, and Alzheimer's disease. They work in specialized neuro-wards, private practice, and research institutions, using neuro-imaging and clinical expertise to manage patient care.",
    skillsNeeded: [
      "Neuro-imaging analysis",
      "Clinical diagnosis",
      "Patient assessment",
      "Specialized treatment planning",
      "Research capabilities",
      "Empathy and communication",
      "Continuous learning",
    ],
    certifications: [
      "MBChB (Bachelor of Medicine)",
      "MMed Neurology (4-year specialization)",
      "Medical registration with HPCSA",
      "Subspecialty certifications",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Stellenbosch University",
      "University of KwaZulu-Natal",
    ],
    image:
      "https://images.unsplash.com/photo-1579154204601-01d6cc01e318?w=800&q=80",
  },
  {
    name: "Nutritionist",
    industry: "Healthcare / Food Science",
    description:
      "A specialist who advises on food and nutrition matters, focusing on how diet impacts overall health and wellness. Distinct from Dietitians in South Africa.",
    whatItIs:
      "A qualified health professional with expertise in human nutrition and its relationship to health. Nutritionists in South Africa work in health promotion and food science, distinct from Dietitians who focus on medical nutrition therapy.",
    whatTheyDo:
      "Advise on healthy eating habits, develop nutritional strategies, create food labels, and promote public health through nutrition education. They work in community health programs, fitness facilities, food industry companies, and private practice to improve nutritional outcomes.",
    skillsNeeded: [
      "Knowledge of human metabolism",
      "Public health understanding",
      "Food science expertise",
      "Communication skills",
      "Dietary assessment",
      "Nutrition education",
      "Research and analysis",
    ],
    certifications: [
      "BSc in Nutrition",
      "Professional Nutritionist registration",
      "Public Health Nutrition",
      "Advanced Clinical Nutrition",
    ],
    tertiaryInstitutions: [
      "Stellenbosch University",
      "North-West University (NWU)",
      "University of Pretoria (UP)",
      "University of the Western Cape (UWC)",
      "Durban University of Technology",
    ],
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
  },
  {
    name: "Non-Destructive Testing (NDT) Technician",
    industry: "Manufacturing / Engineering / Aviation / Mining",
    description:
      "A technician who uses specialized methods to inspect materials and components without damaging them, ensuring structural integrity and safety.",
    whatItIs:
      "A skilled technician trained in advanced inspection techniques that detect defects without harming the material being tested. NDT Technicians are critical for safety-critical industries in South Africa.",
    whatTheyDo:
      "Perform ultrasonic testing, radiographic testing, and other non-destructive methods to inspect airplane wings, mine lift cables, pipelines, and structural components for internal cracks and defects. They work in aviation and mining sectors, ensuring safety by identifying flaws invisible to the naked eye.",
    skillsNeeded: [
      "Ultrasonic testing",
      "Radiographic testing",
      "Eddy current testing",
      "Technical reporting",
      "Safety protocols",
      "Equipment operation",
      "Quality assurance",
    ],
    certifications: [
      "NDT Level 1, 2, or 3 certification",
      "Ultrasonic Testing qualification",
      "Radiographic Testing certification",
      "SAIW accreditation",
    ],
    tertiaryInstitutions: [
      "South African Institute of Welding (SAIW)",
      "Ekurhuleni West TVET College",
      "Technikon SA",
      "Private NDT training centers",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    name: "Naval Architect",
    industry: "Engineering / Maritime",
    description:
      "An engineer specializing in the design, construction, and repair of ships and offshore structures for maritime applications.",
    whatItIs:
      "A specialized engineer with expertise in marine engineering and vessel design. Naval Architects combine engineering principles with maritime knowledge to design and maintain vessels that are safe, efficient, and meet maritime regulations.",
    whatTheyDo:
      "Design commercial vessels and offshore structures, oversee construction, manage repairs, and ensure compliance with maritime standards. Based in Cape Town and Durban, they work on commercial shipping vessels and South African Navy fleet maintenance, applying CAD design and fluid dynamics expertise.",
    skillsNeeded: [
      "Marine engineering",
      "CAD design software",
      "Fluid dynamics",
      "Project management",
      "Maritime regulations",
      "Structural analysis",
      "Problem-solving",
    ],
    certifications: [
      "BSc in Naval Architecture / Marine Engineering",
      "Marine Engineering diploma",
      "Advanced CAD certifications",
      "Maritime safety certifications",
    ],
    tertiaryInstitutions: [
      "Stellenbosch University (Maritime Engineering)",
      "Cape Peninsula University of Technology (CPUT)",
      "Durban University of Technology (DUT)",
      "University of Cape Town (UCT)",
    ],
    image:
      "https://images.unsplash.com/photo-1552062407-291c84e91be7?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add N careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of nCareers) {
    const existingCareer = await prisma.career.findUnique({
      where: { name: career.name },
    });

    if (existingCareer) {
      console.log(`⏭️  Skipped (already exists): ${career.name}`);
      skippedCount++;
    } else {
      await prisma.career.create({ data: career });
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

  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
