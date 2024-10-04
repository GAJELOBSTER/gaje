// Next
import { NextResponse } from "next/server";

// Libs
import prisma from "@/libs/prisma";

// Services
import { isAuthenticated } from "@/services/authService";

/**
 * @swagger
 * /api/user:
 *  get:
 *    tags: [User]
 *    summary: 유저 목록 가져오기
 *    parameters:
 *      - in: body
 *        name: id
 *        schema:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/schema/User'
 */
export async function GET() {
  const authResult = await isAuthenticated();
  if (!authResult.ok) return authResult.response;

  const userList = await prisma.user.findMany({
    include: {
      workspace: true,
    },
  });
  return NextResponse.json({ userList });
}
