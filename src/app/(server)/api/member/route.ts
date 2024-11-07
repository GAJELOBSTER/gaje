// Next
import { NextRequest, NextResponse } from "next/server";

// Libs
import { z } from "zod";
import prisma from "@/libs/prisma";

// Services
import { isAuthenticated } from "@/services/authService";
import { handleError, handleZodError } from "@/services/errorService";

const schema = z
  .object({
    userId: z.string().cuid().optional(),
    workspaceId: z.string().cuid(),
  })
  .strict();

/**
 * @swagger
 * /api/member:
 *  post:
 *    tags: [Member]
 *    summary: 멤버 추가하기
 *    description: userId가 없으면 로그인되어 있는 유저를 멤버에 추가
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - workspaceId
 *          properties:
 *            userId:
 *              type: string
 *              description: 유저 ID
 *            workspaceId:
 *              type: string
 *              description: 워크스페이스 ID
 *    responses:
 *      '201':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/schema/Member'
 *      '401':
 *         $ref: '#/definitions/responses/401'
 *      '403':
 *         $ref: '#/definitions/responses/403'
 *      '404':
 *         $ref: '#/definitions/responses/404'
 */
export async function POST(req: NextRequest) {
  try {
    const authResult = await isAuthenticated();
    if (!authResult.ok) return authResult.response;

    const body = await req.json();
    const { success, data, error } = schema.safeParse(body);
    if (!success) return handleZodError(error);

    const userId = data.userId || authResult.user?.id;
    if (!userId) return handleError("USER_NOT_FOUND");

    const checkWorkspace = await prisma.workspace.findUnique({
      where: { id: data.workspaceId },
    });
    if (!checkWorkspace) return handleError("WORKSPACE_ID_NOT_FOUND");
    if (!checkWorkspace.isPublic) return handleError("IS_NOT_PUBLIC_WORKSPACE");

    const checkMember = await prisma.member.findUnique({
      where: { userId_workspaceId: { userId, workspaceId: data.workspaceId } },
    });
    if (checkMember) return handleError("MEMBER_ALREADY_REGISTERED");

    const createdMember = await prisma.member.create({
      data: {
        userId,
        workspaceId: data.workspaceId,
        isOwner: false,
      },
    });
    return NextResponse.json(createdMember, { status: 201 });
  } catch (error) {
    console.error("멤버 생성 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
