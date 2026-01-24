import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Fetching careers from database...");
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    
    const careers = await prisma.career.findMany({
      orderBy: {
        name: "asc",
      },
    });

    console.log("Found careers:", careers.length);
    return NextResponse.json(careers);
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json(
      { error: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      industry,
      description,
      whatItIs,
      whatTheyDo,
      skillsNeeded,
      certifications,
      tertiaryInstitutions,
      image,
    } = body;

    // Validation
    if (!name || !industry || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create career
    const career = await prisma.career.create({
      data: {
        name,
        industry,
        description,
        whatItIs: whatItIs || "",
        whatTheyDo: whatTheyDo || "",
        skillsNeeded: skillsNeeded || [],
        certifications: certifications || [],
        tertiaryInstitutions: tertiaryInstitutions || [],
        image: image || "https://picsum.photos/400/300?random=1",
      },
    });

    return NextResponse.json(career, { status: 201 });
  } catch (error) {
    console.error("Error creating career:", error);
    return NextResponse.json(
      { error: "Failed to create career" },
      { status: 500 }
    );
  }
}
