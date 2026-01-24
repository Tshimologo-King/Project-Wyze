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
  console.log("Starting to add J careers...");

  const jCareers = [
    {
      name: "Judge",
      industry: "Legal & Judiciary",
      description: "A high-ranking legal official who presides over court proceedings and delivers impartial judgments in criminal and civil matters.",
      whatItIs: "A judge is a senior legal official who interprets and applies the law, presides over court proceedings, and renders binding decisions. They are responsible for upholding the Constitution and ensuring the fair administration of justice.",
      whatTheyDo: "In the South African judiciary (High Court, Supreme Court of Appeal, or Constitutional Court), judges oversee court proceedings, evaluate evidence, interpret the law, settle disputes between parties, deliver written judgments, and uphold constitutional principles.",
      skillsNeeded: ["Expert legal knowledge", "Impartiality and fairness", "Critical reasoning", "High ethical standards", "Judgment and wisdom", "Effective communication"],
      certifications: ["LLB degree from recognized SA university", "Years of experience as Advocate or Attorney", "Judicial appointment by the President", "Judicial education and training"],
      tertiaryInstitutions: ["University of Cape Town (UCT)", "University of the Witwatersrand (Wits)", "University of Pretoria (UP)", "Stellenbosch University", "University of KwaZulu-Natal (UKZN)"],
      image: "https://images.unsplash.com/photo-1589994965851-a8f479c0a5b1?w=500&h=300&fit=crop"
    },
    {
      name: "Journalist",
      industry: "Media & Communications",
      description: "A media professional who researches, writes, and reports on news stories for print, broadcast, or digital platforms.",
      whatItIs: "A journalist is a communicator who gathers, investigates, and reports factual information about events and issues to inform the public. They work across various media platforms to hold power to account.",
      whatTheyDo: "Working for outlets like News24, Daily Maverick, or the SABC, they conduct investigative research, conduct interviews, write news stories, verify facts, manage social media, develop stories for different platforms, and act as watchdogs on issues of public interest.",
      skillsNeeded: ["Investigative research", "Storytelling and writing", "Interviewing skills", "Digital media proficiency", "Social media and SEO knowledge", "Critical thinking", "Deadline management"],
      certifications: ["Degree in Journalism or Media Studies", "National Press Club membership", "Various journalism training certifications", "Journalism ethics training"],
      tertiaryInstitutions: ["Rhodes University", "University of the Witwatersrand (Wits)", "Stellenbosch University", "Tshwane University of Technology (TUT)"],
      image: "https://images.unsplash.com/photo-1495606807533-d4e9b54e1197?w=500&h=300&fit=crop"
    },
    {
      name: "Jewellery Designer / Manufacturer",
      industry: "Crafts & Luxury Goods",
      description: "A creative professional who designs and crafts wearable art using precious metals and gemstones.",
      whatItIs: "A jewellery designer and manufacturer is an artisan who combines artistic creativity with technical skill to create beautiful, wearable pieces. They work with precious metals like gold and platinum, and gemstones like diamonds.",
      whatTheyDo: "In South Africa's prominent jewellery sector (e.g., The Diamond Works or Shimansky), they create bespoke custom pieces for clients, develop commercial collections for mass production, design technical drawings and 3D models, source materials, craft pieces, and set gemstones.",
      skillsNeeded: ["CAD and 3D design software", "Technical drawing", "Gemstone setting and knowledge", "Metal casting and fabrication", "Artistic creativity", "Precision craftsmanship"],
      certifications: ["Degree in Jewellery Design or Fine Arts", "CAD certification", "Gemology certification", "Portfolio of professional work"],
      tertiaryInstitutions: ["Stellenbosch University", "University of Johannesburg (UJ)", "Cape Peninsula University of Technology (CPUT)", "Tshwane University of Technology (TUT)"],
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=300&fit=crop"
    },
    {
      name: "Junior Software Developer",
      industry: "Technology & Software Development",
      description: "An entry-level tech professional who assists in designing, coding, and testing software applications.",
      whatItIs: "A junior software developer is an early-career programmer who works under supervision to write code, debug programs, and contribute to software development projects. They learn best practices while delivering real value.",
      whatTheyDo: "Found in almost every corporate sector, they write clean, efficient code in assigned programming languages, debug existing programs, participate in code reviews, write unit tests, learn from senior developers, and collaborate within Agile teams.",
      skillsNeeded: ["Proficiency in programming languages (Python, Java, C#)", "Problem-solving", "Version control (Git)", "Teamwork and communication", "API understanding", "Testing and debugging"],
      certifications: ["Degree in Computer Science/Software Engineering", "Bootcamp certifications (WeThinkCode_, HyperionDev)", "Language-specific certifications", "Agile methodology training"],
      tertiaryInstitutions: ["University of the Witwatersrand (Wits)", "University of Cape Town (UCT)", "University of Pretoria (UP)", "WeThinkCode_", "HyperionDev"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop"
    },
    {
      name: "Joiner",
      industry: "Construction & Skilled Trades",
      description: "A skilled artisan who specializes in joining pieces of timber to create fixed structures like stairs, door frames, and window sills.",
      whatItIs: "A joiner is a skilled tradesperson who works with wood to create precision-made components for buildings. Unlike carpenters who work on-site, joiners typically work in workshops creating components before installation.",
      whatTheyDo: "Working in workshops or construction environments, they read blueprints and technical drawings, precisely cut and shape wood components, join pieces using various techniques, create stairs, door frames, window sills, and other timber structures, and prepare components for installation.",
      skillsNeeded: ["Reading blueprints and technical drawings", "Precision cutting and measurement", "Knowledge of wood properties and types", "Tool mastery and machine operation", "Attention to detail", "Physical dexterity"],
      certifications: ["NQF Level 4 in Carpentry/Joinery", "Joinery artisan certification", "Carpentry trade certification", "Health and Safety in construction"],
      tertiaryInstitutions: ["Northlink College", "False Bay TVET College", "Artisan Training Institute (ATI)", "Various TVET colleges"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop"
    },
    {
      name: "Jigsaw Puzzle Designer / Illustrator",
      industry: "Creative & Game Design",
      description: "A niche creative professional who designs intricate illustrations specifically meant for reproduction as jigsaw puzzles.",
      whatItIs: "A jigsaw puzzle designer is a specialized illustrator who creates complex, visually engaging artwork designed specifically to be challenging and entertaining when assembled as puzzles.",
      whatTheyDo: "Often working as a freelancer or for specialized game and gift companies, they conceptualize puzzle themes, create detailed illustrations, design complex patterns with color gradients, ensure artwork suits puzzle format and difficulty level, and prepare artwork for print production.",
      skillsNeeded: ["Digital illustration and art", "Spatial awareness and design", "Color theory", "Pattern creation", "Adobe Creative Suite", "Attention to visual detail"],
      certifications: ["Degree in Graphic Design or Fine Arts", "Digital illustration certification", "Portfolio of creative work"],
      tertiaryInstitutions: ["Vega School", "Ruth Prowse School of Art", "Stellenbosch University (Visual Arts)", "Red & Yellow Creative School of Business"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop"
    }
  ];

  for (const career of jCareers) {
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
  const addedCount = jCareers.filter(c => !jCareers.slice(0, jCareers.indexOf(c)).some(existing => existing.name === c.name)).length;
  
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
