import { NextResponse } from "next/server";
import { getCountry } from "@/data/policy-countries";
import { getPoliciesByCountry } from "@/sanity/fetch";

export const revalidate = 60;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ country: string }> }
) {
  const { country } = await params;

  if (!getCountry(country)) {
    return NextResponse.json({ error: "Country not found" }, { status: 404 });
  }

  const policies = await getPoliciesByCountry(country);
  return NextResponse.json(policies);
}
