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

const oCareers = [
  {
    name: "Occupational Therapist (OT)",
    industry: "Healthcare",
    description:
      "A healthcare professional who helps people of all ages overcome physical, mental, or cognitive barriers to perform daily tasks and activities.",
    whatItIs:
      "A registered healthcare professional with a 4-year degree who specializes in helping individuals achieve independence and meaningful participation in daily activities. Occupational Therapists are registered with the HPCSA.",
    whatTheyDo:
      "Conduct clinical assessments, create treatment plans, and use therapeutic activities to help people regain or develop skills for daily living, work, and play. They work in hospitals, schools, and private practices. In corporate settings, they conduct functional capacity evaluations to assess workers' ability to return to their jobs after injuries.",
    skillsNeeded: [
      "Empathy and compassion",
      "Creative problem-solving",
      "Clinical assessment",
      "Patience and communication",
      "Therapeutic knowledge",
      "Adaptability",
      "Documentation skills",
    ],
    certifications: [
      "Bachelor's degree in Occupational Therapy",
      "HPCSA Registration as Occupational Therapist",
      "Clinical experience",
      "Continuing Professional Development",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Cape Town (UCT)",
      "University of Pretoria (UP)",
      "Stellenbosch University",
      "University of KwaZulu-Natal (UKZN)",
      "University of the Free State (UFS)",
      "University of the Western Cape (UWC)",
    ],
    image:
      "https://images.unsplash.com/photo-1559839734335-3bdd697d35f5?w=800&q=80",
  },
  {
    name: "Optometrist",
    industry: "Healthcare",
    description:
      "A primary healthcare practitioner who specializes in examining eyes for defects, prescribing corrective lenses, and detecting ocular diseases.",
    whatItIs:
      "A qualified healthcare professional who provides primary eye care services. Optometrists use specialized diagnostic equipment to test vision and prescribe corrective lenses. They can refer patients to ophthalmologists for surgical intervention.",
    whatTheyDo:
      "Conduct comprehensive eye examinations, prescribe glasses or contact lenses, detect eye diseases, and provide preventive eye care. They work in retail practices like Spec-Savers and Mellins, as well as in hospitals and private clinics, using advanced diagnostic technology.",
    skillsNeeded: [
      "Clinical precision",
      "Customer service excellence",
      "Technical proficiency",
      "Diagnostic skills",
      "Communication abilities",
      "Attention to detail",
      "Problem-solving",
    ],
    certifications: [
      "Bachelor's degree in Optometry",
      "Professional registration",
      "Advanced diagnostic certifications",
      "Continuing education in eye care",
    ],
    tertiaryInstitutions: [
      "University of Johannesburg (UJ)",
      "University of KwaZulu-Natal (UKZN)",
      "University of the Free State (UFS)",
      "University of Limpopo",
      "Durban University of Technology",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160399-20d08df4330f?w=800&q=80",
  },
  {
    name: "Ophthalmologist",
    industry: "Healthcare / Medicine",
    description:
      "A medical doctor who specializes in surgical and medical care of the eyes and prevention of eye disease.",
    whatItIs:
      "A highly trained medical specialist with extensive surgical expertise in ophthalmology. Ophthalmologists are medical doctors (MBChB) who have completed specialized training in eye care and surgery.",
    whatTheyDo:
      "Perform surgical procedures including cataract removals, laser eye surgery, and corneal transplants. They treat complex eye diseases, manage diabetic eye complications, and provide specialized medical care. They work in private clinics, public hospitals, and specialized eye centers.",
    skillsNeeded: [
      "Surgical precision",
      "Advanced medical knowledge",
      "Diagnostic expertise",
      "Steady hands and concentration",
      "Leadership and decision-making",
      "Continuous learning",
      "Compassion for patients",
    ],
    certifications: [
      "MBChB (Bachelor of Medicine)",
      "MMed Ophthalmology (4-year specialization)",
      "Medical registration with HPCSA",
      "Surgical certification",
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
    name: "Oceanographer",
    industry: "Science / Environmental",
    description:
      "A scientist who studies the physical, chemical, and biological aspects of the ocean and marine ecosystems.",
    whatItIs:
      "A research scientist with expertise in marine science who investigates ocean environments, marine life, and oceanographic phenomena. Oceanographers contribute to understanding climate change and marine conservation.",
    whatTheyDo:
      "Conduct research on ocean currents like the Agulhas, monitor marine ecosystems, track climate change impacts, and analyze water samples. They work for organizations like CSIR, SAEON, and the Department of Forestry, Fisheries and the Environment, often spending time at sea conducting field research.",
    skillsNeeded: [
      "Data modeling and analysis",
      "Research methodology",
      "Physical and biological sciences",
      "Physical endurance for expeditions",
      "Laboratory skills",
      "Technical writing",
      "Environmental knowledge",
    ],
    certifications: [
      "BSc in Oceanography or Marine Science",
      "MSc in Oceanography",
      "PhD in specialized oceanography fields",
      "Research certifications",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT) - Department of Oceanography",
      "Nelson Mandela University (NMU)",
      "Cape Peninsula University of Technology (CPUT) - Marine Science",
      "Stellenbosch University",
      "University of KwaZulu-Natal",
    ],
    image:
      "https://images.unsplash.com/photo-1591526014816-ce57b59f17c7?w=800&q=80",
  },
  {
    name: "Operations Manager",
    industry: "Management / Business",
    description:
      "A senior leader responsible for overseeing the production of goods or the provision of services within an organization.",
    whatItIs:
      "A strategic business leader who manages day-to-day operations and ensures organizational efficiency. Operations Managers are critical to business success across all sectors, from retail to manufacturing.",
    whatTheyDo:
      "Plan and coordinate production, manage supply chains, optimize processes, oversee staff productivity, control budgets, and ensure quality standards. They are the 'engine room' of a business, found in manufacturing plants, retail hubs in Johannesburg, Durban, and service industries across South Africa.",
    skillsNeeded: [
      "Strategic planning",
      "Financial management",
      "Leadership and team management",
      "Process optimization",
      "Problem-solving",
      "Data analysis",
      "Project management",
    ],
    certifications: [
      "Bachelor's degree in Business/Operations Management",
      "MBA or Advanced Management qualifications",
      "APICS CPIM or CSCP",
      "Lean or Six Sigma certifications",
    ],
    tertiaryInstitutions: [
      "Regent Business School",
      "Wits Business School",
      "University of South Africa (UNISA)",
      "USB (Stellenbosch University Business School)",
      "University of Cape Town Graduate School of Business",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    name: "Orthotist & Prosthetist",
    industry: "Healthcare / Medical Technology",
    description:
      "A specialist who designs and fits orthoses (braces/splints) to support limbs and prostheses (artificial limbs) to replace missing body parts.",
    whatItIs:
      "A trained healthcare specialist who combines clinical knowledge with mechanical design to help individuals regain mobility and independence. They work with patients experiencing limb loss or requiring orthopedic support.",
    whatTheyDo:
      "Design and fabricate custom braces, splints, and artificial limbs tailored to individual patient needs. They work in rehabilitation centers, hospitals, and private practices, helping road accident victims and patients with diabetes-related amputations regain their mobility and quality of life.",
    skillsNeeded: [
      "Mechanical design",
      "Manual dexterity",
      "Empathy and patience",
      "Clinical knowledge",
      "Technical proficiency",
      "Problem-solving",
      "Attention to detail",
    ],
    certifications: [
      "Diploma or BSc in Orthotics & Prosthetics",
      "Clinical certification",
      "Advanced prosthetic/orthotic specializations",
      "Professional registration",
    ],
    tertiaryInstitutions: [
      "Tshwane University of Technology (TUT)",
      "Walter Sisulu University (WSU)",
      "Durban University of Technology",
      "Cape Peninsula University of Technology (CPUT)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Occupational Hygienist",
    industry: "Occupational Health & Safety / Science",
    description:
      "A scientist/engineer who identifies, evaluates, and controls environmental stressors in the workplace that may cause worker illness or impaired health.",
    whatItIs:
      "A specialized professional dedicated to protecting worker health by preventing occupational diseases and injuries. Occupational Hygienists apply science and engineering principles to create safe working environments.",
    whatTheyDo:
      "Measure and assess workplace hazards including noise levels, air quality, chemical exposure, and radiation. They are critical in mining and chemical industries, developing control strategies and ensuring compliance with the Occupational Health and Safety Act. They conduct environmental monitoring, provide recommendations, and help protect workers' health and safety.",
    skillsNeeded: [
      "Environmental sampling and analysis",
      "Knowledge of OHS legislation",
      "Analytical thinking",
      "Data interpretation",
      "Risk assessment",
      "Communication skills",
      "Problem-solving",
    ],
    certifications: [
      "BSc in Occupational Hygiene or related field",
      "Certified Occupational Hygienist (COH)",
      "OHS Act knowledge",
      "Advanced environmental monitoring certifications",
    ],
    tertiaryInstitutions: [
      "North-West University (NWU)",
      "University of the Witwatersrand (Wits)",
      "University of Johannesburg (UJ)",
      "Stellenbosch University",
      "University of Cape Town (UCT)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add O careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of oCareers) {
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
