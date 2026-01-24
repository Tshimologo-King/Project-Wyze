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

const sCareers = [
  {
    name: "Software Developer",
    industry: "Information Technology",
    description:
      "A tech professional who creates, tests, and maintains computer software and applications using programming languages.",
    whatItIs:
      "The #1 most in-demand skill in South Africa, Software Developers design and build applications that power modern businesses and digital services.",
    whatTheyDo:
      "Write, test, and maintain code for software applications and systems. They work for fintech hubs like Discovery and Standard Bank, startups in Cape Town's 'Silicon Cape,' and companies like Takealot, building mobile banking apps and e-commerce platforms.",
    skillsNeeded: [
      "Programming languages (Java, C#, Python, JavaScript)",
      "Problem-solving",
      "Agile methodologies",
      "Version control (Git)",
      "Database design",
      "Testing and debugging",
      "Collaboration",
    ],
    certifications: [
      "BSc in Computer Science",
      "Professional coding certifications",
      "Cloud computing certifications (AWS, Azure)",
      "Agile/Scrum certifications",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Cape Town (UCT)",
      "University of Pretoria (UP)",
      "WeThinkCode_",
      "HyperionDev",
    ],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
  {
    name: "Social Worker",
    industry: "Social Services / Healthcare",
    description:
      "A professional dedicated to helping vulnerable individuals, families, and communities cope with challenges and improve well-being.",
    whatItIs:
      "A compassionate professional registered with SACSSP who advocates for vulnerable populations and provides counseling and support services.",
    whatTheyDo:
      "Handle cases involving child protection, substance abuse, and family counseling. They work for the Department of Social Development, NGOs, and hospitals, supporting at-risk individuals and communities.",
    skillsNeeded: [
      "Empathy and compassion",
      "Crisis intervention",
      "Knowledge of Children's Act",
      "Active listening",
      "Case management",
      "Community resource knowledge",
      "Documentation skills",
    ],
    certifications: [
      "BSc in Social Work (4 years)",
      "SACSSP Registration",
      "Trauma-informed care training",
      "Advanced case management",
    ],
    tertiaryInstitutions: [
      "University of Johannesburg (UJ)",
      "University of South Africa (Unisa)",
      "University of the Western Cape (UWC)",
      "University of Fort Hare",
      "University of the Witwatersrand (Wits)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Structural Engineer",
    industry: "Engineering / Construction",
    description:
      "A specialized civil engineer who focuses on designing and ensuring structural integrity of buildings, bridges, and other structures.",
    whatItIs:
      "An engineer who specializes in the design and analysis of structures to ensure they are safe, stable, and comply with South African National Standards (SANS).",
    whatTheyDo:
      "Design the structural 'skeletons' of skyscrapers, bridges, and stadiums. They perform load calculations, material analysis, and ensure compliance with safety standards and building regulations.",
    skillsNeeded: [
      "Advanced mathematics",
      "Structural physics",
      "CAD software (Revit, AutoCAD)",
      "Material science",
      "Building codes knowledge",
      "Problem-solving",
      "Project management",
    ],
    certifications: [
      "BSc in Civil/Structural Engineering",
      "Professional Engineer (PrEng) registration",
      "Advanced CAD certifications",
      "SANS compliance training",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Cape Town (UCT)",
      "University of Pretoria (UP)",
      "Stellenbosch University",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    name: "Speech-Language Therapist",
    industry: "Healthcare",
    description:
      "A healthcare professional who diagnoses and treats communication and swallowing disorders in children and adults.",
    whatItIs:
      "A registered healthcare professional with a 4-year degree who specializes in speech, language, and swallowing disorders.",
    whatTheyDo:
      "Diagnose and treat communication disorders, speech delays, stutters, and swallowing difficulties. They work in schools, private practices, and hospitals, rehabilitating stroke victims and helping children with speech delays.",
    skillsNeeded: [
      "Clinical assessment",
      "Patience and empathy",
      "Phonetics knowledge",
      "Patient counseling",
      "Treatment planning",
      "Communication skills",
      "Continuous learning",
    ],
    certifications: [
      "Bachelor's degree in Speech-Language Pathology (4 years)",
      "HPCSA Registration",
      "Advanced assessment certifications",
      "Specialized treatment techniques",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Cape Town (UCT)",
      "University of Pretoria (UP)",
      "University of KwaZulu-Natal (UKZN)",
      "Stellenbosch University",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Systems Architect",
    industry: "Information Technology",
    description:
      "A high-level IT professional who designs and oversees implementation of complex computer systems and networks.",
    whatItIs:
      "A senior IT professional who serves as the 'master planner' for an organization's IT infrastructure, ensuring seamless integration and security.",
    whatTheyDo:
      "Design enterprise IT systems, oversee infrastructure implementation, and ensure all software and hardware components work together securely. They handle strategic planning of technology solutions.",
    skillsNeeded: [
      "Strategic thinking",
      "Cloud computing (AWS, Azure)",
      "Cybersecurity",
      "Enterprise software design",
      "System integration",
      "Technical leadership",
      "Architecture patterns",
    ],
    certifications: [
      "BSc in Computer Science or Information Systems",
      "AWS/Azure Solutions Architect certification",
      "Enterprise architecture certifications",
      "ITIL certification",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Stellenbosch University",
      "University of Johannesburg (UJ)",
    ],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
  {
    name: "Security Specialist / Manager",
    industry: "Security / Cybersecurity",
    description:
      "A professional responsible for protecting an organization's assets, people, and data from physical or digital threats.",
    whatItIs:
      "A security professional who develops and implements strategies to protect organizations from security threats, including cybersecurity, physical security, or both.",
    whatTheyDo:
      "Manage security operations ranging from cybersecurity analysis protecting banks to physical security operations overseeing mines or retail groups. They assess risks, implement security measures, and respond to incidents.",
    skillsNeeded: [
      "Risk assessment",
      "Surveillance technology",
      "Crisis management",
      "Network security (if digital)",
      "Incident response",
      "Compliance knowledge",
      "Decision-making",
    ],
    certifications: [
      "Degree in Criminology or Security Management",
      "CISSP (Certified Information Systems Security Professional)",
      "CISM (Certified Information Security Manager)",
      "PSIRA registration (if physical security)",
    ],
    tertiaryInstitutions: [
      "University of South Africa (Unisa)",
      "University of Johannesburg (UJ)",
      "University of Cape Town (UCT)",
      "Various IT security training providers",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    name: "Surgeon",
    industry: "Healthcare / Medicine",
    description:
      "A medical doctor who specializes in performing surgical operations to treat injuries, diseases, or deformities.",
    whatItIs:
      "A highly trained medical specialist with an MBChB plus a 4-6 year MMed specialization who performs surgical procedures.",
    whatTheyDo:
      "Lead operating theaters in major hospitals, performing surgical procedures in specialties like Orthopedics, Neurosurgery, or Cardiothoracic surgery. They manage complex surgical cases and ensure patient safety.",
    skillsNeeded: [
      "Surgical precision",
      "High-pressure decision-making",
      "Advanced medical knowledge",
      "Manual dexterity",
      "Leadership",
      "Problem-solving",
      "Communication",
    ],
    certifications: [
      "MBChB (Bachelor of Medicine)",
      "MMed Surgical specialization (4-6 years)",
      "Fellowship (FCS)",
      "HPCSA registration",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Stellenbosch University",
      "University of KwaZulu-Natal (UKZN)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Statistician",
    industry: "Science / Data Analysis",
    description:
      "A professional who uses mathematical techniques to collect, analyze, and interpret data to solve real-world problems.",
    whatItIs:
      "A data scientist with advanced mathematics expertise who helps organizations make data-driven decisions through statistical analysis.",
    whatTheyDo:
      "Collect, analyze, and interpret data to support decision-making. They work at Stats SA, insurance companies for actuarial support, and research firms helping organizations understand trends and patterns.",
    skillsNeeded: [
      "Advanced mathematics",
      "R or SAS programming",
      "Data visualization",
      "Analytical thinking",
      "Statistical modeling",
      "Problem-solving",
      "Communication",
    ],
    certifications: [
      "BSc in Statistics or Mathematics",
      "Advanced statistical certifications",
      "R/SAS proficiency certifications",
      "Data science certifications",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Pretoria (UP)",
      "Stellenbosch University",
      "University of KwaZulu-Natal (UKZN)",
      "University of Cape Town (UCT)",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add S careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of sCareers) {
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
