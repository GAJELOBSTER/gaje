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
  workspaceId: string;
};

const paramsSchema = z.object({
  workspaceId: z.string().cuid(),
});

const querySchema = z.object({
  action: z.enum(["HIDDEN", "BOOKMARK"]).optional(),
});

/**
 * @swagger
 * /api/workspace/{workspaceId}/feed-item:
 *  get:
 *    tags: [Feed Item]
 *    summary: 피드 아이템 목록 가져오기
 *    parameters:
 *      - in: path
 *        name: workspaceId
 *        type: string
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

    const paramsResult = paramsSchema.safeParse({ workspaceId: params.workspaceId });
    const { success: paramsSuccess, data: paramsData, error: paramsError } = paramsResult;
    if (!paramsSuccess) return handleZodError(paramsError);

    const action = req.nextUrl.searchParams.get("action") || undefined;
    const queryResult = querySchema.safeParse({ action });
    const { success: querySuccess, data: queryData, error: queryError } = queryResult;
    if (!querySuccess) return handleZodError(queryError);

    const checkWorkspace = await prisma.workspace.findUnique({
      where: { id: paramsData.workspaceId },
      include: { member: { where: { userId: authResult.user?.id } } },
    });
    if (!checkWorkspace) return handleError("WORKSPACE_ID_NOT_FOUND");
    if (!checkWorkspace.member[0]) return handleError("ACCESS_DENIED");

    const feedItemList = await prisma.feedItem.findMany({
      where: {
        feed: { is: { workspaceId: paramsData.workspaceId } },
        feedAction: { some: { type: queryData.action } },
      },
      include: { feedAction: true },
    });

    const convertedFeedItemList = addActionToFeedItems(feedItemList);
    return NextResponse.json(convertedFeedItemList);
  } catch (error) {
    console.error("피드 아이템(with workspaceId) 불러오기 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
