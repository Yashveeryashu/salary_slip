// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
  try {
    const { id } = await request.json();
    const user = await User.findByIdAndDelete(id);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
