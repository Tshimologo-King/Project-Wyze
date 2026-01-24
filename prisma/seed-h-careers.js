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
  console.log("Starting to add H careers...");

  const hCareers = [
    {
      name: "Haematologist",
      industry: "Healthcare",
      description: "A medical doctor who specializes in the study, diagnosis, and treatment of blood-related disorders.",
      whatItIs: "A haematologist is a medical specialist who studies blood, blood-forming organs, and blood diseases. They diagnose and treat conditions like leukemia, anemia, hemophilia, and other blood disorders.",
      whatTheyDo: "Working in hospitals and pathology laboratories like the NHLS (National Health Laboratory Service), haematologists analyze blood samples, manage patient treatments, administer blood transfusions, perform bone marrow biopsies, and conduct research on blood disorders.",
      skillsNeeded: ["Medical pathology expertise", "Laboratory research", "Diagnostic precision", "Patient care", "Data analysis"],
      certifications: ["MBChB (Doctor of Medicine)", "MMed (Masters in Medicine) in Haematology", "HPCSA registration", "Ongoing CPD"],
      tertiaryInstitutions: ["University of Cape Town (UCT)", "University of the Witwatersrand (Wits)", "University of the Free State (UFS)", "University of Pretoria (UP)"],
      image: "https://images.unsplash.com/photo-1631217314830-4e6019e52c5f?w=500&h=300&fit=crop"
    },
    {
      name: "Health and Safety Officer (OHS)",
      industry: "Occupational Health & Safety",
      description: "A professional who ensures workplace compliance with the Occupational Health and Safety Act to prevent accidents and injuries.",
      whatItIs: "A Health and Safety Officer (also called an OHS Officer) is a trained professional responsible for identifying, assessing, and controlling workplace hazards. They ensure compliance with South African OHS legislation and promote safe working practices.",
      whatTheyDo: "Working in mining, construction, manufacturing, and other high-risk industries, they conduct risk assessments, lead safety drills and training, investigate workplace incidents, maintain safety records, develop safety policies, and ensure regulatory compliance.",
      skillsNeeded: ["Risk assessment", "Legal compliance knowledge", "Attention to detail", "Incident investigation", "Communication skills", "Technical knowledge of hazards"],
      certifications: ["National Certificate in OHS", "Diploma in OHS Management", "SAIOSH (South African Institute of Occupational Safety and Health) registration", "First Aid certification"],
      tertiaryInstitutions: ["UNISA", "iQ Academy", "False Bay TVET College", "Cape Peninsula University of Technology (CPUT)"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop"
    },
    {
      name: "Herpetologist",
      industry: "Biology & Conservation",
      description: "A biologist who specializes in the study of amphibians and reptiles.",
      whatItIs: "A herpetologist is a zoologist who studies reptiles (snakes, lizards, turtles) and amphibians (frogs, salamanders). They research their behavior, ecology, taxonomy, and conservation.",
      whatTheyDo: "Working for conservation bodies like SANParks, research institutes, or venom-production laboratories, herpetologists conduct field research, track and catalog species, study animal behavior, contribute to anti-venom research, and promote reptile conservation.",
      skillsNeeded: ["Animal tracking and behavior", "Field research methods", "Specialized handling of venomous species", "Biology and taxonomy knowledge", "Physical endurance"],
      certifications: ["BSc in Zoology or Biology", "MSc/PhD in Herpetology or Zoology", "Wildlife Management certification"],
      tertiaryInstitutions: ["University of the Witwatersrand (Wits)", "Rhodes University (RU)", "University of Pretoria (UP)", "University of Cape Town (UCT)"],
      image: "https://images.unsplash.com/photo-1577720643272-265f434b0e1a?w=500&h=300&fit=crop"
    },
    {
      name: "Historian",
      industry: "Education & Heritage",
      description: "A professional who researches, analyzes, and interprets the past through documents, artifacts, and oral accounts.",
      whatItIs: "A historian is a scholar who studies historical events, periods, and societies through primary and secondary sources. They contribute to our understanding of the past and its impact on the present.",
      whatTheyDo: "Working in museums, heritage sites like Robben Island, or as consultants for film, government, and educational institutions, historians conduct archival research, develop exhibitions, write historical narratives, preserve cultural memory, and educate communities.",
      skillsNeeded: ["Archival research", "Critical analysis", "Academic writing", "Cultural preservation", "Interpretation and communication", "Digital humanities"],
      certifications: ["BA/BSc in History", "MA/PhD in History", "Professional historian certification"],
      tertiaryInstitutions: ["University of Cape Town (UCT)", "Stellenbosch University (SU)", "University of the Witwatersrand (Wits)", "University of Fort Hare"],
      image: "https://images.unsplash.com/photo-1516979187457-635ffe35ff81?w=500&h=300&fit=crop"
    },
    {
      name: "Homeopath",
      industry: "Alternative Healthcare",
      description: "A primary healthcare practitioner who uses holistic approaches and natural substances to stimulate the body's self-healing.",
      whatItIs: "A homeopath is an alternative health practitioner who practices homeopathy, a system of medicine based on treating patients with highly diluted substances that trigger the body's natural defense mechanisms.",
      whatTheyDo: "Typically working in private practice or wellness centers, homeopaths conduct detailed patient consultations, prescribe natural remedies and supplements, develop individualized treatment plans, and promote holistic health and wellness.",
      skillsNeeded: ["Holistic diagnosis", "Natural pharmacology", "Patient empathy", "Business management", "Clinical observation", "Communication skills"],
      certifications: ["Diploma in Homeopathy", "Bachelor's in Homeopathy", "AHPCSA (Allied Health Professions Council of South Africa) registration"],
      tertiaryInstitutions: ["University of Johannesburg (UJ)", "Durban University of Technology (DUT)", "South African Institute of Homeopathy"],
      image: "https://images.unsplash.com/photo-1576091160550-112173e7f7cb?w=500&h=300&fit=crop"
    },
    {
      name: "Horticulturist",
      industry: "Agriculture & Horticulture",
      description: "An expert in the science and art of growing plants, including fruits, vegetables, flowers, and ornamental plants.",
      whatItIs: "A horticulturist is a scientist and practitioner who specializes in plant cultivation, development, and management. They combine botanical knowledge with practical growing techniques.",
      whatTheyDo: "Managing commercial nurseries, designing sustainable urban landscapes, or working in South Africa's agricultural and botanical sectors (like Kirstenbosch), horticulturists oversee plant production, manage pest and disease control, develop new plant varieties, and promote sustainable practices.",
      skillsNeeded: ["Plant physiology", "Soil science", "Pest management", "Landscaping design", "Crop production", "Environmental knowledge"],
      certifications: ["Diploma or Degree in Horticulture", "BSc in Agriculture/Horticulture", "Master Gardener certification"],
      tertiaryInstitutions: ["Durban University of Technology (DUT)", "Cape Peninsula University of Technology (CPUT)", "Tshwane University of Technology (TUT)", "UNISA"],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop"
    },
    {
      name: "Hospitality Manager",
      industry: "Tourism & Hospitality",
      description: "A professional who oversees the daily operations of hotels, lodges, or resorts.",
      whatItIs: "A hospitality manager is a professional who manages the operations, staff, and guests in hospitality establishments. They ensure excellent guest experiences while maintaining profitability and operational efficiency.",
      whatTheyDo: "Working in South Africa's thriving tourism industry, they manage staff and departments, ensure guest satisfaction, handle customer complaints, manage budgets and finances, coordinate events and conferences, and oversee facilities maintenance.",
      skillsNeeded: ["Leadership and team management", "Financial management", "Customer service excellence", "Event planning", "Problem-solving", "Communication skills"],
      certifications: ["Diploma in Hospitality Management", "Bachelor's Degree in Tourism/Hospitality", "Professional hotel management certification"],
      tertiaryInstitutions: ["International Hotel School", "Cape Peninsula University of Technology (CPUT)", "Tshwane University of Technology (TUT)", "Stellenbosch University"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop"
    },
    {
      name: "Human Resources (HR) Manager",
      industry: "Business Management",
      description: "A professional responsible for managing the recruitment, payroll, training, and employee relations of a company.",
      whatItIs: "An HR Manager is a business professional who manages all people-related functions of an organization. They develop HR strategies, manage recruitment, handle payroll, and foster positive employee relations.",
      whatTheyDo: "Interpreting South African labor laws (BCEA and LRA), they recruit and hire talent, manage payroll systems, organize staff training and development, handle employee relations and disputes, ensure compliance with employment law, and act as a bridge between management and employees.",
      skillsNeeded: ["Conflict resolution", "South African labor law knowledge", "Recruitment and selection", "Organizational strategy", "Payroll management", "Communication"],
      certifications: ["Diploma/Degree in Human Resources Management", "SABPP (South African Board for People Practices) certification", "CIPD (Chartered Institute of Personnel and Development)"],
      tertiaryInstitutions: ["University of Johannesburg (UJ)", "University of the Witwatersrand (Wits)", "UNISA", "MANCOSA"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
    },
    {
      name: "Human Rights Lawyer",
      industry: "Legal Services",
      description: "A specialized legal practitioner who focuses on protecting fundamental rights under the South African Constitution.",
      whatItIs: "A human rights lawyer is a legal professional dedicated to defending and advancing the fundamental rights and freedoms of individuals. They work to ensure justice and equality under the law.",
      whatTheyDo: "Working for NGOs like Section27 or Lawyers for Human Rights, or in private practice, they litigate cases involving discrimination, labor rights, access to basic services, constitutional violations, and other human rights issues.",
      skillsNeeded: ["Legal litigation and advocacy", "Deep Bill of Rights knowledge", "Constitutional law", "Negotiation", "Research and analysis", "Public speaking"],
      certifications: ["LLB (Bachelor of Laws degree)", "Admission as an Attorney or Advocate", "Postgraduate studies in Human Rights Law"],
      tertiaryInstitutions: ["University of Cape Town (UCT)", "University of the Witwatersrand (Wits)", "University of Pretoria (UP)", "Stellenbosch University", "University of KwaZulu-Natal (UKZN)"],
      image: "https://images.unsplash.com/photo-1589994965851-a8f479c0a5b1?w=500&h=300&fit=crop"
    },
    {
      name: "Hydrologist",
      industry: "Environmental Science & Water Resources",
      description: "A scientist who studies the distribution, circulation, and properties of water on Earth.",
      whatItIs: "A hydrologist is an earth scientist who studies the water cycle, water resources, and water-related phenomena. They assess water availability, quality, and movement through the environment.",
      whatTheyDo: "A scarce skill in South Africa; working for the Department of Water and Sanitation, municipalities, research institutes, and mining companies, hydrologists manage water security, develop drought management plans, prevent flooding, assess groundwater resources, and conduct environmental impact assessments.",
      skillsNeeded: ["Data modeling and analysis", "Environmental science", "GIS mapping", "Water resource management", "Problem-solving", "Technical report writing"],
      certifications: ["BSc/MSc in Hydrology or Environmental Science", "PhD in Hydrology (for senior roles)", "GIS certification"],
      tertiaryInstitutions: ["University of KwaZulu-Natal (UKZN)", "University of the Witwatersrand (Wits)", "Rhodes University", "University of the Western Cape (UWC)"],
      image: "https://images.unsplash.com/photo-1491841573634-28fb1df537d1?w=500&h=300&fit=crop"
    }
  ];

  for (const career of hCareers) {
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
  const addedCount = hCareers.filter(c => !hCareers.slice(0, hCareers.indexOf(c)).some(existing => existing.name === c.name)).length;
  
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
