import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
  return NextResponse.json({});
}
