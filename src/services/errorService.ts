"use server";

import { NextResponse } from "next/server";
import { z } from "zod";
import errors from "@/services/errors";

export const handleZodError = (error: z.ZodError) => {
  const { path, message } = error.errors[0];
  return NextResponse.json(
    { msg: `${path[0] ? `'${path}': ` : ""}${message}`, errorCode: "SCHEMA_INVALID" },
    { status: 400 },
  );
};

export const handleError = (errorCode: keyof typeof errors) => {
  const { msg, status } = errors[errorCode];
  return NextResponse.json({ msg, errorCode }, { status });
};
