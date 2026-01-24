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

const vCareers = [
  {
    name: "Veterinarian",
    industry: "Healthcare / Animal Health",
    description:
      "A medical professional who protects the health and well-being of animals by diagnosing and treating diseases and injuries.",
    whatItIs:
      "A registered medical professional who provides healthcare to animals, ranging from small pets to livestock and wildlife.",
    whatTheyDo:
      "Work as Small Animal Vets in suburbs, Wildlife Vets in the Kruger National Park, or State Vets controlling disease outbreaks. They diagnose diseases, perform surgeries, and provide animal medical care.",
    skillsNeeded: [
      "Medical surgery",
      "Diagnostic imaging",
      "Pharmacology",
      "Physical stamina",
      "Animal behavior knowledge",
      "Communication skills",
      "Problem-solving",
    ],
    certifications: [
      "BVSc (Bachelor of Veterinary Science)",
      "SAVC (South African Veterinary Council) registration",
      "Compulsory community service (1 year)",
      "Specialized veterinary certifications",
    ],
    tertiaryInstitutions: [
      "University of Pretoria (Onderstepoort)",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    name: "Valuer (Property Valuer)",
    industry: "Real Estate / Finance",
    description:
      "A professional who provides expert estimates of the market value of land and buildings.",
    whatItIs:
      "A registered property valuation expert who determines the market value of real estate for banks, municipalities, and land reform projects.",
    whatTheyDo:
      "Provide property valuations for banks before they grant home loans, determine property rates for municipalities, and support land reform projects. They analyze property data and prepare detailed valuation reports.",
    skillsNeeded: [
      "Property law knowledge",
      "Economics",
      "Spatial analysis",
      "Report writing",
      "Data analysis",
      "Negotiation",
      "Attention to detail",
    ],
    certifications: [
      "Bachelor's degree in Property Valuation or Real Estate",
      "Pr Valuer (Professional Valuer) registration with SACPVP",
      "Property assessment certifications",
      "Continuing professional development",
    ],
    tertiaryInstitutions: [
      "University of Cape Town (UCT)",
      "University of the Witwatersrand (Wits)",
      "University of Johannesburg (UJ)",
      "University of Pretoria (UP)",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
  {
    name: "Video Editor",
    industry: "Media & Entertainment",
    description:
      "A creative professional who assembles raw footage into a finished project that matches the director's vision.",
    whatItIs:
      "A skilled media professional who transforms raw video footage into polished final products using advanced editing software.",
    whatTheyDo:
      "Work for broadcasters like MultiChoice (DStv), advertising agencies, or as freelancers for international YouTube channels. They edit footage, add effects, color-grade, and ensure projects match creative direction.",
    skillsNeeded: [
      "Adobe Premiere Pro proficiency",
      "After Effects expertise",
      "DaVinci Resolve knowledge",
      "Storytelling",
      "Color grading",
      "Sound design",
      "Attention to detail",
    ],
    certifications: [
      "Diploma in Film/Video Editing",
      "Adobe Certified Associate (Video Editing)",
      "Professional video editing certifications",
      "Portfolio demonstration",
    ],
    tertiaryInstitutions: [
      "AFDA (Film and Performing Arts School)",
      "CityVarsity",
      "Vega School",
      "Red & Yellow",
    ],
    image:
      "https://images.unsplash.com/photo-1533928298208-27ff66555d0d?w=800&q=80",
  },
  {
    name: "Virologist",
    industry: "Science / Research / Healthcare",
    description:
      "A scientist who studies viruses and the diseases they cause through laboratory research and analysis.",
    whatItIs:
      "A research specialist or medical pathologist working in viral identification, vaccine development, and antiviral treatment research.",
    whatTheyDo:
      "Work in research labs or for the NHLS (National Health Laboratory Service) identifying viral strains and developing vaccines or antiviral treatments. They conduct molecular research particularly relevant to HIV and COVID-19 research in SA.",
    skillsNeeded: [
      "Laboratory research",
      "Molecular biology",
      "Genetics",
      "Bioinformatics",
      "Data analysis",
      "Scientific writing",
      "Problem-solving",
    ],
    certifications: [
      "BSc in Microbiology or Life Sciences",
      "MSc/PhD in Virology or related field",
      "Laboratory certifications",
      "Biosafety level certifications",
    ],
    tertiaryInstitutions: [
      "University of the Witwatersrand (Wits)",
      "University of Cape Town (UCT)",
      "Stellenbosch University",
      "University of KwaZulu-Natal (UKZN)",
    ],
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3649cda?w=800&q=80",
  },
  {
    name: "Vibration Technician / Specialist",
    industry: "Engineering / Manufacturing",
    description:
      "A technical specialist who uses sensors to monitor machinery vibration for predictive maintenance.",
    whatItIs:
      "An industrial technician who prevents equipment failure by monitoring vibration patterns and identifying maintenance needs before breakdowns occur.",
    whatTheyDo:
      "Work in mining and power plants like Eskom using 'predictive maintenance' to detect failing bearings and other machinery issues. They prevent massive machine breakdowns and save millions in repair costs.",
    skillsNeeded: [
      "Vibration analyzer operation",
      "Data modeling",
      "Mechanical engineering knowledge",
      "Sensor technology",
      "Analytics",
      "Problem-solving",
      "Safety awareness",
    ],
    certifications: [
      "National Diploma in Mechanical Engineering",
      "Vibration Institute certifications",
      "Predictive maintenance training",
      "Equipment-specific certifications",
    ],
    tertiaryInstitutions: [
      "Tshwane University of Technology (TUT)",
      "Vaal University of Technology (VUT)",
      "Cape Peninsula University of Technology (CPUT)",
      "Vibration Institute (international)",
    ],
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    name: "Vocational Teacher (TVET Lecturer)",
    industry: "Education",
    description:
      "An educator who specializes in teaching practical skills and trades rather than purely academic subjects.",
    whatItIs:
      "A skilled educator who delivers practical trade and vocational education at TVET Colleges across South Africa.",
    whatTheyDo:
      "Teach at TVET Colleges, instructing students in trades like Plumbing, Welding, Business Management, and other vocational skills. They combine practical demonstrations with theoretical knowledge.",
    skillsNeeded: [
      "Practical trade mastery",
      "Classroom management",
      "Curriculum delivery",
      "Student mentorship",
      "Safety instruction",
      "Communication",
      "Assessment skills",
    ],
    certifications: [
      "Trade qualification or relevant degree",
      "Advanced Diploma in Technical and Vocational Teaching (AdvDip TVT)",
      "TVET teaching credentials",
      "Safety and risk management certification",
    ],
    tertiaryInstitutions: [
      "Various TVET Colleges",
      "University of South Africa (Unisa)",
      "Teacher training institutions",
    ],
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
  },
  {
    name: "Visual Effects (VFX) Artist",
    industry: "Media & Entertainment",
    description:
      "A digital artist who creates computer-generated imagery integrated into live-action footage.",
    whatItIs:
      "A technical and creative specialist who produces high-end visual effects for film, television, and digital media.",
    whatTheyDo:
      "Work in VFX houses in Cape Town and Joburg, creating 3D models, compositing shots, and adding digital effects to live-action footage. They work on international films like Mad Max and Monster Hunter using advanced CGI technology.",
    skillsNeeded: [
      "3D modeling",
      "Compositing (Nuke)",
      "Artistic lighting",
      "Motion graphics",
      "Software proficiency",
      "Problem-solving",
      "Attention to detail",
    ],
    certifications: [
      "Diploma in Visual Effects or Digital Media",
      "3D and compositing software certifications",
      "VFX pipeline knowledge",
      "Portfolio demonstration",
    ],
    tertiaryInstitutions: [
      "The Animation School",
      "AFDA (Film and Performing Arts School)",
      "Vega School",
      "Red & Yellow",
    ],
    image:
      "https://images.unsplash.com/photo-1533928298208-27ff66555d0d?w=800&q=80",
  },
];

async function main() {
  console.log("Starting to add V careers...");

  let addedCount = 0;
  let skippedCount = 0;

  for (const career of vCareers) {
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
