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
    name: z.string(),
  })
  .strict();

/**
 * @swagger
 * /api/workspace:
 *  post:
 *    tags: [Workspace]
 *    summary: 워크스페이스 생성하기
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - name
 *          properties:
 *            name:
 *              type: string
 *              description: 워크스페이스 이름
 *    responses:
 *      '201':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                workspace:
 *                  $ref: '#/definitions/schema/WorkspaceWithMember'
 *      '400':
 *         $ref: '#/definitions/responses/400'
 *      '401':
 *         $ref: '#/definitions/responses/401'
 */
export async function POST(req: NextRequest) {
  try {
    const authResult = await isAuthenticated();
    if (!authResult.ok) return authResult.response;

    const body = await req.json();
    const { success, data, error } = schema.safeParse(body);
    if (!success) return handleZodError(error);

    const createdWorkspace = await prisma.workspace.create({
      data: {
        name: data.name,
        userId: authResult.user.id,
        member: {
          create: {
            isOwner: true,
            userId: authResult.user.id,
          },
        },
      },
      include: {
        member: true,
      },
    });

    return NextResponse.json(createdWorkspace, { status: 201 });
  } catch (error) {
    console.error("워크스페이스 생성 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}

/**
 * @swagger
 * /api/workspace:
 *  get:
 *    tags: [Workspace]
 *    summary: 워크스페이스 목록 가져오기
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/schema/WorkspaceWithMemberAndFeed'
 *      '401':
 *         $ref: '#/definitions/responses/401'
 */
export async function GET() {
  try {
    const authResult = await isAuthenticated();
    if (!authResult.ok) return authResult.response;

    const workspaceList = await prisma.workspace.findMany({
      where: { member: { some: { userId: authResult.user?.id } } },
      include: { member: true, feed: true },
    });
    return NextResponse.json(workspaceList);
  } catch (error) {
    console.error("워크스페이스 불러오기 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
