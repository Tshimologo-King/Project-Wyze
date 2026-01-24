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

const zCareers = [
  {
    name: 'Zoologist',
    industry: 'Science & Research',
    description: 'A scientist who studies animal life, including their origins, genetics, diseases, and behavior.',
    whatItIs: 'Zoologists are professionals dedicated to studying animal species in depth, researching their biology, behavior, genetics, and ecological roles. They work to understand how animals interact with their environments and contribute to scientific knowledge that informs conservation efforts.',
    whatTheyDo: 'Conduct field research on animal populations and behavior, analyze genetic data, monitor endangered species, study disease patterns in wildlife, write technical reports, collaborate with environmental teams, and develop strategies for wildlife conservation and ecosystem management.',
    skillsNeeded: ['Field research methodology', 'Data analysis', 'Animal tracking and identification', 'Technical report writing', 'Laboratory analysis', 'Statistical analysis', 'Environmental monitoring', 'Research design'],
    certifications: ['Bachelor\'s degree in Zoology or Life Sciences', 'Advanced research training', 'Master\'s degree (for senior roles)', 'PhD (for research positions)', 'Field research certification'],
    tertiaryInstitutions: ['University of the Witwatersrand (Wits)', 'University of Cape Town (UCT)', 'University of Pretoria (UP)', 'Rhodes University', 'Stellenbosch University'],
    image: '/careers/zoologist.jpg'
  },
  {
    name: 'Zinc Galvanizing Technician',
    industry: 'Manufacturing & Engineering',
    description: 'A technical specialist who oversees the hot-dip galvanizing process—coating steel or iron with a layer of zinc to prevent rusting.',
    whatItIs: 'Zinc galvanizing technicians are skilled professionals who specialize in protecting steel and iron products from corrosion through specialized coating processes. They work in manufacturing plants ensuring structural materials meet quality and durability standards.',
    whatTheyDo: 'Manage chemical baths in galvanizing plants, monitor zinc coating thickness and quality, operate and maintain galvanizing equipment, ensure chemical process parameters are within specifications, conduct quality testing, maintain safety protocols, keep detailed process records, and troubleshoot equipment issues.',
    skillsNeeded: ['Metallurgy knowledge', 'Chemical process control', 'Safety and PPE compliance', 'Quality testing and measurement', 'Equipment operation and maintenance', 'Technical troubleshooting', 'Documentation and record-keeping', 'Temperature and chemical management'],
    certifications: ['Diploma in Chemical or Mechanical Engineering', 'Specialized galvanizing training', 'Hot Dip Galvanizing Association certification', 'Safety training (NEBOSH or equivalent)', 'Chemical handling certification'],
    tertiaryInstitutions: ['Tshwane University of Technology (TUT)', 'Vaal University of Technology (VUT)', 'Cape Peninsula University of Technology (CPUT)', 'Hot Dip Galvanizers Association Southern Africa (HDGASA)'],
    image: '/careers/zinc-galvanizing-technician.jpg'
  },
  {
    name: 'Z-Axis / CNC Programmer',
    industry: 'Manufacturing & Engineering',
    description: 'A specialized machinist who programs Computer Numerical Control (CNC) machines to cut and shape parts along the X, Y, and Z-axis (depth).',
    whatItIs: 'CNC programmers are precision engineering specialists who write and optimize programs for computer-controlled machines. They create complex metal and composite components with exact specifications required for aerospace, automotive, and other high-precision industries.',
    whatTheyDo: 'Write G-code and M-code programs for CNC machines, convert CAD designs into machine-readable formats, set up and test programs on machines, optimize cutting speeds and feeds, perform precision measurements and quality checks, troubleshoot machine issues, and document program specifications.',
    skillsNeeded: ['G-code and M-code programming', 'CAD/CAM software (Mastercam, Fusion 360, Siemens NX)', 'Precision measurement', 'Technical drawing interpretation', 'Problem-solving', 'Machine operation knowledge', 'Quality control', 'Blueprint reading'],
    certifications: ['Technical certificate in CNC programming', 'Diploma in Mechanical Engineering', 'CAD/CAM software certification', 'Machine operation and setup certification', 'Advanced CNC programming certification'],
    tertiaryInstitutions: ['Denel Technical Academy', 'Northlink College', 'Johannesburg Institute of Engineering and Technology (JIET)', 'TUT', 'Various TVET institutions'],
    image: '/careers/cnc-programmer.jpg'
  },
  {
    name: 'Zoo Curator / Manager',
    industry: 'Animal Care & Conservation',
    description: 'An administrative and scientific leader who oversees the animal collection, staff, and daily operations of a zoo or aquarium.',
    whatItIs: 'Zoo curators and managers are conservation leaders who balance scientific research, animal welfare, and public education. They serve as stewards of animal collections while managing budgets, staff, and educational programs.',
    whatTheyDo: 'Manage animal collections and breeding programs, oversee staff and daily operations, design and maintain exhibits, develop conservation education initiatives, manage budgets and resources, coordinate with veterinary teams, implement animal welfare standards, engage with the public, and participate in species management plans.',
    skillsNeeded: ['Animal husbandry knowledge', 'People management', 'Budget and financial oversight', 'Conservation science', 'Public relations and communication', 'Project management', 'Leadership', 'Research and data analysis'],
    certifications: ['Degree in Zoology or Animal Science', 'Management certification', 'Leadership training', 'Conservation biology qualification', 'Extensive field experience'],
    tertiaryInstitutions: ['University of the Witwatersrand (Wits)', 'University of Cape Town (UCT)', 'University of Pretoria (UP)', 'Stellenbosch University', 'Rhodes University'],
    image: '/careers/zoo-curator.jpg'
  },
  {
    name: 'Zootechnician (Animal Health Technician)',
    industry: 'Animal Care & Health',
    description: 'A para-veterinary professional who assists veterinarians and carries out technical functions related to animal health and production.',
    whatItIs: 'Zootechnicians are skilled animal health professionals who work in veterinary clinics, farms, and government departments. They provide essential support in animal care, health monitoring, and disease prevention across diverse settings from rural communities to commercial operations.',
    whatTheyDo: 'Assist veterinarians in clinical procedures, administer vaccinations and treatments, collect and prepare samples for disease testing, monitor animal health and nutrition, advise farmers on livestock management practices, maintain medical records, sterilize equipment, and educate communities on animal health.',
    skillsNeeded: ['Clinical assistance', 'Disease monitoring and identification', 'Livestock management', 'Animal restraint and handling', 'Medical record-keeping', 'Sample collection and handling', 'Vaccination administration', 'Communication and education'],
    certifications: ['Diploma in Animal Health or Veterinary Technology', 'Registration with South African Veterinary Council (SAVC)', 'Vaccination certification', 'Disease monitoring certification', 'Animal welfare training'],
    tertiaryInstitutions: ['University of South Africa (Unisa)', 'North-West University (NWU)', 'Tshwane University of Technology (TUT)', 'Durban University of Technology (DUT)'],
    image: '/careers/zootechnician.jpg'
  }
];

async function seedZCareers() {
  try {
    console.log('🌍 Starting Z careers seed...');
    let added = 0;
    let skipped = 0;

    for (const career of zCareers) {
      // Check if career already exists
      const existing = await prisma.career.findUnique({
        where: { name: career.name }
      });

      if (existing) {
        console.log(`⏭️  Skipped: ${career.name} (already exists)`);
        skipped++;
      } else {
        await prisma.career.create({
          data: career
        });
        console.log(`✅ Added: ${career.name}`);
        added++;
      }
    }

    // Get total count
    const totalCareers = await prisma.career.count();
    console.log(`\n✨ Seed complete! Added: ${added}, Skipped: ${skipped}, Total careers in database: ${totalCareers}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedZCareers();
