"use server";

// Next
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Types
import { IFetchOption } from "@/types/commonType";

export default async function serverFetch(apiUrl: string, options: IFetchOption) {
  const { method, body } = options;
  const cookie = headers().get("cookie");

  const fetchURL = `${process.env.NEXT_PUBLIC_NEXT_SERVER}/api${apiUrl}`;
  const requestOptions: RequestInit = {
    method: `${method}`,
    body: JSON.stringify(body),
    headers: { Cookie: cookie || "" },
  };

  const response = await fetch(fetchURL, requestOptions);
  const result = await response.json();

  return NextResponse.json(result, { status: response.status });
}
