// Next
import { NextRequest, NextResponse } from "next/server";

// Libs
import { z } from "zod";
import prisma from "@/libs/prisma";
import { handleZodError } from "@/libs/serverUtils";

// Services
import { isAuthenticated } from "@/services/authService";

type Params = {
  workspaceId: string;
};

const paramsSchema = z.object({
  workspaceId: z.number(),
});

const schema = z
  .object({
    name: z.string(),
  })
  .strict();

/**
 * @swagger
 * /api/workspace/{workspaceId}:
 *  patch:
 *    tags: [Workspace]
 *    summary: 워크스페이스 정보 변경하기
 *    parameters:
 *      - in: path
 *        name: workspaceId
 *        type: number
 *        required: true
 *      - in: body
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: 워크스페이스 이름
 *            isPublic:
 *              type: boolean
 *              description: 공유 워크스페이스 여부
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/schema/Workspace'
 *      '400':
 *         $ref: '#/definitions/responses/400'
 *      '401':
 *         $ref: '#/definitions/responses/401'
 *      '404':
 *         $ref: '#/definitions/responses/404'
 */
export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const authResult = await isAuthenticated();
    if (!authResult.ok) return authResult.response;

    const body = await req.json();
    const { success, data, error } = schema.safeParse(body);
    if (!success) return handleZodError(error);

    const workspaceId = Number(params.workspaceId);
    const { success: paramsSuccess, error: paramsError } = paramsSchema.safeParse({ workspaceId });
    if (!paramsSuccess) return handleZodError(paramsError);

    const checkWorkspace = await prisma.workspace.findUnique({ where: { id: workspaceId } });
    if (!checkWorkspace) return NextResponse.json({ msg: "존재하지 않는 Workspace ID 입니다" }, { status: 404 });

    const workspaceList = await prisma.workspace.update({
      where: { id: workspaceId },
      data,
    });

    return NextResponse.json(workspaceList);
  } catch (error) {
    console.error("워크스페이스 수정 오류", error);
    return NextResponse.json({ msg: "서버 에러" }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/workspace/{workspaceId}:
 *  delete:
 *    tags: [Workspace]
 *    summary: 워크스페이스 삭제
 *    parameters:
 *      - in: path
 *        name: workspaceId
 *        type: number
 *        required: true
 *    responses:
 *      '200':
 *         $ref: '#/definitions/responses/200'
 *      '400':
 *         $ref: '#/definitions/responses/400'
 *      '401':
 *         $ref: '#/definitions/responses/401'
 *      '404':
 *         $ref: '#/definitions/responses/404'
 */
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const authResult = await isAuthenticated();
    if (!authResult.ok) return authResult.response;

    const workspaceId = Number(params.workspaceId);
    const { success: paramsSuccess, error: paramsError } = paramsSchema.safeParse({ workspaceId });
    if (!paramsSuccess) return handleZodError(paramsError);

    const checkWorkspace = await prisma.workspace.findUnique({ where: { id: workspaceId } });
    if (!checkWorkspace) return NextResponse.json({ msg: "존재하지 않는 Workspace ID 입니다" }, { status: 404 });

    await prisma.workspace.delete({
      where: { id: workspaceId },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("워크스페이스 삭제 오류", error);
    return NextResponse.json({ msg: "서버 에러" }, { status: 500 });
  }
}
