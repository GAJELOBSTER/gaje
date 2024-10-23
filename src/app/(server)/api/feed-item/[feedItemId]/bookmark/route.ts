// Next
import { NextRequest, NextResponse } from "next/server";

// Libs
import { z } from "zod";
import prisma from "@/libs/prisma";

// Services
import { isAuthenticated } from "@/services/authService";
import { handleError, handleZodError } from "@/services/errorService";

type Params = {
  feedItemId: string;
};

const paramsSchema = z.object({
  feedItemId: z.string().cuid(),
});

/**
 * @swagger
 * /api/feed-item/{feedItemId}/bookmark:
 *  post:
 *    tags: [Feed Item]
 *    summary: 피드 아이템 북마크 토글
 *    parameters:
 *      - in: path
 *        name: feedItemId
 *        type: string
 *        required: true
 *    responses:
 *      '201':
 *         $ref: '#/definitions/responses/201'
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
export async function POST(req: NextRequest, { params }: { params: Params }) {
  try {
    const authResult = await isAuthenticated();
    if (!authResult.ok) return authResult.response;

    const paramsResult = paramsSchema.safeParse({ feedItemId: params.feedItemId });
    const { success: paramsSuccess, data: paramsData, error: paramsError } = paramsResult;
    if (!paramsSuccess) return handleZodError(paramsError);

    const checkFeedItem = await prisma.feedItem.findUnique({
      where: { id: paramsData.feedItemId },
      include: {
        feed: { include: { workspace: { include: { member: { where: { userId: authResult.user?.id } } } } } },
      },
    });
    if (!checkFeedItem) return handleError("FEED_ITEM_ID_NOT_FOUND");
    if (!checkFeedItem.feed.workspace.member[0]) return handleError("ACCESS_DENIED");

    const checkFeedAction = await prisma.feedAction.findUnique({
      where: {
        userId_feedItemId_type: { userId: authResult.user.id, feedItemId: paramsData.feedItemId, type: "BOOKMARK" },
      },
    });

    if (checkFeedAction) {
      await prisma.feedAction.delete({ where: { id: checkFeedAction.id } });
      return new NextResponse(null, { status: 204 });
    } else {
      const createdFeedAction = await prisma.feedAction.create({
        data: { userId: authResult.user.id, feedItemId: paramsData.feedItemId, type: "BOOKMARK" },
      });
      return NextResponse.json(createdFeedAction, { status: 201 });
    }
  } catch (error) {
    console.error("피드 불러오기 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
