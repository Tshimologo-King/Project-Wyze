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
  console.log("Starting to add G careers...");

  const gCareers = [
    {
      name: "Geologist",
      industry: "Mining & Natural Resources",
      description: "A scientist who studies the solid Earth and rock formations to locate mineral deposits and assess site safety.",
      whatItIs: "A geologist is a scientist who studies the solid Earth, the rocks of which it is composed, and the processes by which they change over time. In South Africa, geology is crucial to understanding our world-class mining resources.",
      whatTheyDo: "Working for companies like Anglo American and Sasol, geologists locate mineral deposits, assess the safety of mine sites, monitor seismic activity and rock bursts, conduct geological surveys, and provide recommendations for mining operations.",
      skillsNeeded: ["Mapping and surveying", "Data analysis", "Physical endurance for fieldwork", "Mineralogy knowledge", "Problem-solving"],
      certifications: ["BSc Geology", "MSc in Economic Geology", "Professional Geological Society (PGSA) membership"],
      tertiaryInstitutions: ["University of the Witwatersrand (Wits)", "University of Pretoria (UP)", "University of Cape Town (UCT)", "University of Johannesburg (UJ)"],
      image: "https://images.unsplash.com/photo-1585971429261-c3bab63c9ef0?w=500&h=300&fit=crop"
    },
    {
      name: "Graphic Designer",
      industry: "Creative & Design",
      description: "A creative specialist who conceptualizes and creates visual content to communicate messages through typography, imagery, and color.",
      whatItIs: "A graphic designer is a creative professional who uses visual design elements to communicate ideas and messages. They work across multiple platforms and mediums to create compelling visual experiences.",
      whatTheyDo: "Working in advertising agencies like Ogilvy SA or as freelancers, graphic designers design corporate logos, app interfaces, billboards, packaging, websites, and marketing materials. They conceptualize designs, create layouts, select fonts and colors, and revise based on client feedback.",
      skillsNeeded: ["Adobe Creative Suite (Photoshop, Illustrator, InDesign)", "Visual communication theory", "Color theory", "Typography", "Creativity and innovation"],
      certifications: ["Diploma or Degree in Graphic Design", "Adobe Certified Associate", "Portfolio of professional work"],
      tertiaryInstitutions: ["Vega School", "Red & Yellow Creative School of Business", "Nelson Mandela University (NMU)", "STADIO School of Fashion & Design"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop"
    },
    {
      name: "Game Ranger / Field Guide",
      industry: "Conservation & Tourism",
      description: "A conservation professional responsible for managing wildlife areas, conducting anti-poaching patrols, and guiding tourists through the African bush.",
      whatItIs: "A game ranger (or field guide) is a dedicated conservation professional who manages and protects wildlife in natural areas. They combine ecological knowledge with practical skills to preserve ecosystems and educate the public about wildlife.",
      whatTheyDo: "Working in national parks like SANParks or private reserves such as Kruger or Sabi Sands, game rangers conduct anti-poaching patrols, monitor animal health and behavior, track wildlife populations, guide tourists on game drives, educate guests about wildlife and conservation, and perform maintenance on reserve facilities.",
      skillsNeeded: ["Animal behavior knowledge", "Tracking skills", "Firearm safety and proficiency", "Interpersonal communication", "Physical fitness", "Environmental awareness"],
      certifications: ["Field Guide Association of South Africa (FGASA) Level 1 or 2", "Wilderness First Aid", "Anti-poaching certification"],
      tertiaryInstitutions: ["Southern African Wildlife College (SAWC)", "The Nature College", "FGASA-accredited training centers", "Durban University of Technology (DUT)"],
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=500&h=300&fit=crop"
    },
    {
      name: "GIS Specialist",
      industry: "Technology & Spatial Analysis",
      description: "A specialist who uses GIS software to capture, analyze, and display geographically referenced information for planning and decision-making.",
      whatItIs: "A Geographic Information Systems (GIS) specialist is a technical professional who uses specialized software and hardware to collect, analyze, and visualize geographically referenced data. They transform complex spatial data into actionable insights.",
      whatTheyDo: "Working in municipalities and environmental agencies, GIS specialists map service delivery areas, plan urban infrastructure, monitor climate change impacts, analyze land use patterns, create digital maps, perform spatial analysis, and maintain geographic databases. They use software like ArcGIS or QGIS.",
      skillsNeeded: ["ArcGIS / QGIS proficiency", "Spatial analysis", "Data management", "Cartography", "Remote sensing", "Database design"],
      certifications: ["BSc in Geoinformatics or GIS", "Esri GIS Technical Certification", "ArcGIS certifications"],
      tertiaryInstitutions: ["Stellenbosch University (BSc Geoinformatics)", "University of the Witwatersrand (Wits)", "University of Pretoria (UP)"],
      image: "https://images.unsplash.com/photo-1524178232363-1601bc886de4?w=500&h=300&fit=crop"
    },
    {
      name: "General Practitioner (GP)",
      industry: "Healthcare",
      description: "A medical doctor who provides primary healthcare, treating acute and chronic illnesses, providing preventive care, and referring patients to specialists.",
      whatItIs: "A General Practitioner (GP) is a medical doctor who serves as the first point of contact in the healthcare system. They provide comprehensive primary care to patients of all ages and are trained to diagnose a wide range of conditions.",
      whatTheyDo: "Working in private practices, public clinics like Chris Hani Baragwanath, or community health centers, GPs diagnose illnesses, prescribe medications, perform minor procedures, provide health education, manage chronic diseases, coordinate referrals to specialists, and promote preventive health.",
      skillsNeeded: ["Clinical diagnosis", "Patient empathy and communication", "Broad medical knowledge", "Prescribing judgment", "Ethics and professionalism"],
      certifications: ["MBChB (Doctor of Medicine)", "Registration with HPCSA (Health Professions Council of South Africa)", "Ongoing CPD (Continuing Professional Development)"],
      tertiaryInstitutions: ["University of the Witwatersrand (Wits)", "University of Cape Town (UCT)", "Sefako Makgatho Health Sciences University (SMU)", "University of KwaZulu-Natal (UKZN)", "University of Pretoria (UP)"],
      image: "https://images.unsplash.com/photo-1631217314830-4e6019e52c5f?w=500&h=300&fit=crop"
    },
    {
      name: "Geneticist",
      industry: "Research & Science",
      description: "A biologist who studies genes, genetic variation, and heredity to diagnose genetic disorders and develop personalized medicines.",
      whatItIs: "A geneticist is a biological scientist who studies genes, genetic variation, inheritance patterns, and the molecular basis of heredity. They work to understand how genetic information is transmitted and expressed.",
      whatTheyDo: "Working in medical research institutions or agricultural organizations, geneticists diagnose genetic disorders through testing, develop personalized medicine approaches, conduct laboratory research on DNA and chromosomes, analyze genetic data using bioinformatics, improve crop resilience in agriculture, and publish research findings.",
      skillsNeeded: ["Laboratory research proficiency", "Biostatistics and data analysis", "Complex problem-solving", "Molecular biology knowledge", "Ethics in genetic research"],
      certifications: ["BSc or MSc in Genetics / Molecular Biology", "PhD in Genetics or related field", "Genetic Counseling certification (if applicable)"],
      tertiaryInstitutions: ["University of Pretoria", "University of the Witwatersrand (Wits)", "Stellenbosch University", "University of Cape Town (UCT)"],
      image: "https://images.unsplash.com/photo-1576091160550-112173e7f7cb?w=500&h=300&fit=crop"
    },
    {
      name: "Gynaecologist",
      industry: "Healthcare",
      description: "A medical specialist who provides healthcare services related to the female reproductive system, pregnancy, and childbirth.",
      whatItIs: "A gynaecologist is a medical doctor who specializes in the female reproductive system, including the uterus, ovaries, and fallopian tubes. They provide comprehensive reproductive and maternal healthcare.",
      whatTheyDo: "Working in maternal wards, private clinics, or public hospitals, gynaecologists manage pregnancies, perform obstetric procedures, treat reproductive health conditions, conduct surgical interventions, provide family planning advice, and deliver babies. They combine clinical expertise with compassionate patient care.",
      skillsNeeded: ["Surgical precision", "Clinical diagnosis", "Sensitive patient communication", "Manual dexterity", "Decision-making under pressure"],
      certifications: ["MBChB (Doctor of Medicine)", "MMed (Masters in Medicine) in Obstetrics & Gynaecology (4 years)", "HPCSA registration", "Ongoing CPD"],
      tertiaryInstitutions: ["University of the Witwatersrand (Wits)", "University of Cape Town (UCT)", "University of Pretoria (UP)", "Sefako Makgatho Health Sciences University (SMU)", "University of KwaZulu-Natal (UKZN)"],
      image: "https://images.unsplash.com/photo-1576091160568-2173a0632578?w=500&h=300&fit=crop"
    },
    {
      name: "Goldsmith / Jeweller",
      industry: "Crafts & Artisan Trade",
      description: "A skilled artisan who designs, manufactures, and repairs jewelry using precious metals and gemstones.",
      whatItIs: "A goldsmith or jeweller is a highly skilled artisan who creates, repairs, and customizes jewelry using precious metals like gold, silver, and platinum. South Africa's rich gold and diamond heritage makes this a valued craft.",
      whatTheyDo: "Working in high-end studios, manufacturing plants, or as independent artisans, goldsmiths design custom pieces, craft jewelry using manual techniques, repair damaged items, set gemstones, perform metal casting, solder intricate components, and manage client relationships. They combine artistic vision with technical precision.",
      skillsNeeded: ["Manual dexterity and fine motor control", "Design creativity", "Metal casting and forging", "Precision soldering", "Gemstone knowledge", "Business skills"],
      certifications: ["NQF Level 4 Jewellery Making", "Apprenticeship in Jewellery Craft", "Design portfolio"],
      tertiaryInstitutions: ["Cape Peninsula University of Technology (CPUT)", "Durban University of Technology (DUT)", "Stellenbosch University (Visual Arts programme)"],
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=300&fit=crop"
    }
  ];

  for (const career of gCareers) {
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
  console.log(`
✨ Seed complete!
   Added: ${gCareers.length - gCareers.filter(c => gCareers.some((existing, idx) => idx < gCareers.indexOf(c) && existing.name === c.name)).length}
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
