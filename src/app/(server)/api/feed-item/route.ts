// Next
import { NextRequest, NextResponse } from "next/server";

// Libs
import { z } from "zod";
import prisma from "@/libs/prisma";
import { FeedAction, FeedItem } from "@prisma/client";

// Services
import { isAuthenticated } from "@/services/authService";
import { handleError, handleZodError } from "@/services/errorService";

const querySchema = z
  .object({
    feedId: z.number().optional(),
    workspaceId: z.string().cuid().optional(),
    action: z.enum(["HIDDEN", "BOOKMARK"]).optional(),
  })
  .refine(
    (data) =>
      (data.feedId && data.workspaceId) || (!data.workspaceId && data.feedId) || (!data.feedId && data.workspaceId),
    {
      message: "feedId 또는 workspaceId 둘 중 하나는 입력해야 합니다",
    },
  );

/**
 * !@swagger
 * /api/feed-item:
 *  get:
 *    tags: [Feed Item]
 *    summary: 피드 아이템 목록 가져오기
 *    parameters:
 *      - in: query
 *        name: action
 *        type: string
 *        description: hidden 또는 bookmark
 *      - in: query
 *        name: feedId
 *        type: number
 *      - in: query
 *        name: workspaceId
 *        type: string
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/schema/FeedItemWithAction'
 *      '401':
 *         $ref: '#/definitions/responses/401'
 */
export async function GET(req: NextRequest) {
  try {
    const authResult = await isAuthenticated();
    if (!authResult.ok) return authResult.response;
    const feedId = Number(req.nextUrl.searchParams.get("feedId")) || undefined;
    const workspaceId = req.nextUrl.searchParams.get("workspaceId") || undefined;
    const action = req.nextUrl.searchParams.get("action") || undefined;

    const queryResult = querySchema.safeParse({ feedId, workspaceId, action });
    const { success: querySuccess, data: queryData, error: queryError } = queryResult;
    if (!querySuccess) return handleZodError(queryError);

    let checkFeed;
    if (feedId) {
      checkFeed = await prisma.feed.findUnique({ where: { id: queryData.feedId } });
      if (!checkFeed) return handleError("FEED_ID_NOT_FOUND");
    }

    let checkWorkspace;
    if (workspaceId) {
      checkWorkspace = await prisma.workspace.findUnique({ where: { id: queryData.workspaceId } });
      if (!checkWorkspace) return handleError("WORKSPACE_ID_NOT_FOUND");
    }

    const memberWorkspaceId = queryData.workspaceId || checkFeed?.workspaceId;
    if (!memberWorkspaceId) return handleError("ACCESS_DENIED");
    const checkMember = await prisma.member.findUnique({
      where: {
        userId_workspaceId: {
          userId: authResult.user.id,
          workspaceId: memberWorkspaceId,
        },
      },
    });
    if (!checkMember) return handleError("ACCESS_DENIED");

    const feedItemList = await prisma.feedItem.findMany({
      where: {
        feedId: queryData.feedId,
        feed: { is: { workspaceId: queryData.workspaceId } },
        feedAction: { some: { type: queryData.action } },
      },
      include: { feedAction: true },
    });

    const convertedFeedItemList = feedItemList.map((item: FeedItem & { feedAction?: FeedAction[] }) => {
      const feedAction = item.feedAction;
      delete item.feedAction;
      return {
        ...item,
        isBookmark: feedAction?.some((action) => action.type === "BOOKMARK"),
        isHidden: feedAction?.some((action) => action.type === "HIDDEN"),
      };
    });

    return NextResponse.json(convertedFeedItemList);
  } catch (error) {
    console.error("피드 아이템 불러오기 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
