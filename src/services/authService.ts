import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/(server)/api/auth/[...nextauth]/route";
import prisma from "@/libs/prisma";

export const isAuthenticated = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return { ok: false, response: NextResponse.json({ msg: "인증이 필요합니다" }, { status: 401 }) };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) return { ok: false, response: NextResponse.json({ msg: "해당 유저가 DB에 없습니다" }, { status: 500 }) };

  return { ok: true, user: session.user };
};
