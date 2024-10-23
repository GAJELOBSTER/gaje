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

/**
 * @swagger
 * /api/workspace/{workspaceId}/feed:
 *  get:
 *    tags: [Feed]
 *    summary: 피드 목록 가져오기
 *    parameters:
 *      - in: path
 *        name: workspaceId
 *        type: string
 *        required: true
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/schema/Feed'
 *      '400':
 *         $ref: '#/definitions/responses/400'
 *      '401':
 *         $ref: '#/definitions/responses/401'
 *      '403':
 *         $ref: '#/definitions/responses/403'
 *      '404':
 *         $ref: '#/definitions/responses/404'
 */
export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const authResult = await isAuthenticated();
    if (!authResult.ok) return authResult.response;

    const { success: paramsSuccess, error: paramsError } = paramsSchema.safeParse({ workspaceId: params.workspaceId });
    if (!paramsSuccess) return handleZodError(paramsError);

    const checkWorkspace = await prisma.workspace.findUnique({
      where: { id: params.workspaceId },
      include: { member: { where: { userId: authResult.user?.id } } },
    });
    if (!checkWorkspace) return handleError("WORKSPACE_ID_NOT_FOUND");
    if (!checkWorkspace.member[0]) return handleError("ACCESS_DENIED");

    const feedList = await prisma.feed.findMany({
      where: { workspaceId: params.workspaceId },
    });
    return NextResponse.json(feedList);
  } catch (error) {
    console.error("피드 불러오기 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
