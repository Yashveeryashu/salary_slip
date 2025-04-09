// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
export const fetchCache = 'force-no-store'

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const user = await User.find();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
