import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiToken = process.env.SPORTMONKS_API_TOKEN;

    if (!apiToken) {
      throw new Error("API token not configured");
    }

    const includes = ["details.type", "participant"].join(";");

    const url = `https://api.sportmonks.com/v3/football/standings/rounds/372940?include=${includes}&api_token=${apiToken}`;

    console.log("Fetching standings:", url);

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching standings:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du classement" },
      { status: 500 }
    );
  }
}
