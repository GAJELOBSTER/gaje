import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const baseURL = `${process.env.API_URL}/api/${process.env.API_VERSION}`;
    const response = await fetch(`${baseURL}/auth/sign-in`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    cookies().set("accessToken", result.accessToken);
    cookies().set("refreshToken", result.refreshToken, { httpOnly: true });
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    return NextResponse.error();
  }
}
