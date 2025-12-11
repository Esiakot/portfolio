import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiToken = process.env.SPORTMONKS_API_TOKEN;

    if (!apiToken) {
      throw new Error("API token not configured");
    }

    // Récupérer le dernier match de Marseille via l'endpoint team avec latest
    const teamUrl = `https://api.sportmonks.com/v3/football/teams/44?include=latest&api_token=${apiToken}`;

    const teamResponse = await fetch(teamUrl, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!teamResponse.ok) {
      throw new Error(`Error fetching team: ${teamResponse.status}`);
    }

    const teamData = await teamResponse.json();

    console.log("Team latest match:", teamData.data?.latest);

    if (
      !teamData.data?.latest ||
      !Array.isArray(teamData.data.latest) ||
      teamData.data.latest.length === 0
    ) {
      throw new Error("No latest match found");
    }

    const latestRoundId = teamData.data.latest[0].round_id;

    console.log("Latest completed round ID:", latestRoundId);

    const includes = ["details.type", "participant"].join(";");
    const url = `https://api.sportmonks.com/v3/football/standings/rounds/${latestRoundId}?include=${includes}&api_token=${apiToken}`;

    console.log("Fetching standings:", url);

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
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
