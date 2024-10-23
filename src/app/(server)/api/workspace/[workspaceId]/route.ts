// Next
import { NextRequest, NextResponse } from "next/server";

// Libs
import { z } from "zod";
import prisma from "@/libs/prisma";

// Services
import { isAuthenticated } from "@/services/authService";
import { handleError, handleZodError } from "@/services/errorService";

type Params = {
  workspaceId: string;
};

const paramsSchema = z.object({
  workspaceId: z.string().cuid(),
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
 *        type: string
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
 *      '403':
 *         $ref: '#/definitions/responses/403'
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

    const paramsResult = paramsSchema.safeParse({ workspaceId: params.workspaceId });
    const { success: paramsSuccess, data: paramsData, error: paramsError } = paramsResult;
    if (!paramsSuccess) return handleZodError(paramsError);

    const checkWorkspace = await prisma.workspace.findUnique({
      where: { id: paramsData.workspaceId },
      include: { member: { where: { userId: authResult.user?.id } } },
    });
    if (!checkWorkspace) return handleError("WORKSPACE_ID_NOT_FOUND");
    if (!checkWorkspace.member[0]?.isOwner) return handleError("IS_NOT_OWNER");

    const workspaceList = await prisma.workspace.update({
      where: { id: paramsData.workspaceId },
      data,
    });

    return NextResponse.json(workspaceList);
  } catch (error) {
    console.error("워크스페이스 수정 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
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
 *        type: string
 *        required: true
 *    responses:
 *      '204':
 *         $ref: '#/definitions/responses/204'
 *      '400':
 *         $ref: '#/definitions/responses/400'
 *      '401':
 *         $ref: '#/definitions/responses/401'
 *      '403':
 *         $ref: '#/definitions/responses/403'
 *      '404':
 *         $ref: '#/definitions/responses/404'
 */
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const authResult = await isAuthenticated();
    if (!authResult.ok) return authResult.response;

    const paramsResult = paramsSchema.safeParse({ workspaceId: params.workspaceId });
    const { success: paramsSuccess, data: paramsData, error: paramsError } = paramsResult;
    if (!paramsSuccess) return handleZodError(paramsError);

    const checkWorkspace = await prisma.workspace.findUnique({
      where: { id: paramsData.workspaceId },
      include: { member: { where: { userId: authResult.user?.id } } },
    });
    if (!checkWorkspace) return handleError("WORKSPACE_ID_NOT_FOUND");
    if (!checkWorkspace.member[0]?.isOwner) return handleError("IS_NOT_OWNER");

    await prisma.workspace.delete({
      where: { id: paramsData.workspaceId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("워크스페이스 삭제 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
