import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiToken = process.env.SPORTMONKS_API_TOKEN;

    if (!apiToken) {
      throw new Error("API token not configured");
    }

    const includes = [
      "latest.participants",
      "latest.statistics.type",
      "latest.scores.type",
    ].join(";");

    const url = `https://api.sportmonks.com/v3/football/teams/44?include=${includes}&api_token=${apiToken}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des statistiques" },
      { status: 500 }
    );
  }
}
