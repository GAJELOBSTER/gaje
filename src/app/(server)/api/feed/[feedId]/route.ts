// Next
import { NextRequest, NextResponse } from "next/server";

// Libs
import { z } from "zod";
import prisma from "@/libs/prisma";

// Services
import { isAuthenticated } from "@/services/authService";
import { handleError, handleZodError } from "@/services/errorService";

type Params = {
  feedId: string;
};

const paramsSchema = z.object({
  feedId: z.number(),
});

/**
 * @swagger
 * /api/feed/{feedId}:
 *  delete:
 *    tags: [Feed]
 *    summary: 피드 삭제
 *    parameters:
 *      - in: path
 *        name: feedId
 *        type: number
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

    const paramsResult = paramsSchema.safeParse({ feedId: params.feedId });
    const { success: paramsSuccess, data: paramsData, error: paramsError } = paramsResult;
    if (!paramsSuccess) return handleZodError(paramsError);

    const checkFeed = await prisma.feed.findUnique({ where: { id: paramsData.feedId }, include: { workspace: true } });
    if (!checkFeed) return handleError("FEED_ID_NOT_FOUND");

    const checkMember = await prisma.member.findUnique({
      where: { userId_workspaceId: { userId: authResult.user.id, workspaceId: checkFeed.workspaceId } },
    });
    if (!checkMember?.isOwner) return handleError("IS_NOT_OWNER");

    await prisma.feed.delete({ where: { id: paramsData.feedId } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("피드 삭제 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
