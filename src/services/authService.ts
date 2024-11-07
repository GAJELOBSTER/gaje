import { NextResponse } from "next/server";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/(server)/api/auth/[...nextauth]/route";
import prisma from "@/libs/prisma";
import { handleError } from "@/services/errorService";

type SuccessType = {
  ok: true;
  user: User;
};

type ErrorType = {
  ok: false;
  response: NextResponse;
};

type ReturnType = SuccessType | ErrorType;

export const isAuthenticated = async (): Promise<ReturnType> => {
  const session = await getServerSession(authOptions);
  if (!session) return { ok: false, response: handleError("INVALID_TOKEN") };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) return { ok: false, response: handleError("USER_NOT_FOUND") };

  return { ok: true, user: session.user };
};
