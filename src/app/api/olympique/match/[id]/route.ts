import { NextResponse } from "next/server";

const API_TOKEN = process.env.SPORTMONKS_API_TOKEN;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: matchId } = await params;
    console.log(`Fetching match details for ID: ${matchId}`);

    const matchUrl = `https://api.sportmonks.com/v3/football/fixtures/${matchId}?include=participants;scores;statistics.type;events.type;league;round;venue&api_token=${API_TOKEN}`;

    const response = await fetch(matchUrl, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    console.log("Match API Response status:", response.status);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching match details:", error);
    return NextResponse.json(
      { error: "Failed to fetch match details" },
      { status: 500 }
    );
  }
}
