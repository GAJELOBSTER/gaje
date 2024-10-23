// Next
import { NextRequest, NextResponse } from "next/server";

// Libs
import { z } from "zod";
import prisma from "@/libs/prisma";

// Services
import { isAuthenticated } from "@/services/authService";
import { handleError, handleZodError } from "@/services/errorService";
import { addActionToFeedItems } from "@/services/feedService";

type Params = {
  feedId: string;
};

const paramsSchema = z.object({
  feedId: z.number(),
});

const querySchema = z.object({
  action: z.enum(["HIDDEN", "BOOKMARK"]).optional(),
});

/**
 * @swagger
 * /api/feed/{feedId}/feed-item:
 *  get:
 *    tags: [Feed Item]
 *    summary: 피드 아이템 목록 가져오기
 *    parameters:
 *      - in: path
 *        name: feedId
 *        type: number
 *        required: true
 *      - in: query
 *        name: action
 *        type: string
 *        description: hidden 또는 bookmark
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/schema/FeedItemWithAction'
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

    const paramsResult = paramsSchema.safeParse({ feedId: params.feedId });
    const { success: paramsSuccess, data: paramsData, error: paramsError } = paramsResult;
    if (!paramsSuccess) return handleZodError(paramsError);

    const action = req.nextUrl.searchParams.get("action") || undefined;
    const queryResult = querySchema.safeParse({ action });
    const { success: querySuccess, data: queryData, error: queryError } = queryResult;
    if (!querySuccess) return handleZodError(queryError);

    const checkFeed = await prisma.feed.findUnique({ where: { id: paramsData.feedId } });
    if (!checkFeed) return handleError("FEED_ID_NOT_FOUND");

    const checkMember = await prisma.member.findUnique({
      where: {
        userId_workspaceId: {
          userId: authResult.user.id,
          workspaceId: checkFeed.workspaceId,
        },
      },
    });
    if (!checkMember) return handleError("ACCESS_DENIED");

    // @TODO: 액션 값 처리하게끔 필요, 지금 무조건 type 값이 적용됨
    const feedItemList = await prisma.feedItem.findMany({
      where: {
        feedId: paramsData.feedId,
        feedAction: { some: { type: queryData.action } },
      },
      include: { feedAction: true },
    });

    const convertedFeedItemList = addActionToFeedItems(feedItemList);
    return NextResponse.json(convertedFeedItemList);
  } catch (error) {
    console.error("피드 아이템(with feedId) 불러오기 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
