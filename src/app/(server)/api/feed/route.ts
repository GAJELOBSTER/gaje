// Next
import { NextRequest, NextResponse } from "next/server";

// Libs
import { z } from "zod";
import prisma from "@/libs/prisma";
import Parser from "rss-parser";
import { JSDOM } from "jsdom";

// Services
import { isAuthenticated } from "@/services/authService";
import { handleError, handleZodError } from "@/services/errorService";

const schema = z
  .object({
    feedUrl: z.string().url(),
    workspaceId: z.string().cuid(),
  })
  .strict();

/**
 * @swagger
 * /api/feed:
 *  post:
 *    tags: [Feed]
 *    summary: 피드 생성하기
 *    parameters:
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *            - feedUrl
 *            - workspaceId
 *          properties:
 *            feedUrl:
 *              type: string
 *              description: 피드 URL
 *            workspaceId:
 *              type: string
 *              description: 워크스페이스 ID
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
 *         description: <font color="#ff4f4f">SCHEMA_INVALID</font> - 잘못된 요청(파라미터가 잘못된 경우) </br>
 *                      <font color="#ff4f4f">INVALID_RSS_FEED_URL</font> - RSS Feed를 제공하지 않는 URL </br>
 *                      <font color="#ff4f4f">RSS_URL_ALREADY_REGISTER</font> - 이미 등록된 Feed URL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/schema/error'
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

    const checkWorkspace = await prisma.workspace.findUnique({
      where: { id: data.workspaceId },
      include: { member: { where: { userId: authResult.user?.id } } },
    });
    if (!checkWorkspace) return handleError("WORKSPACE_ID_NOT_FOUND");
    if (!checkWorkspace.member[0]?.isOwner) return handleError("IS_NOT_OWNER");

    const getFeedHtmlResponse = await fetch(data.feedUrl);
    if (!getFeedHtmlResponse.ok) return handleError("RSS_FEED_NOT_FOUND");

    const html = await getFeedHtmlResponse.text();
    const { document } = new JSDOM(html).window;
    const linkElement = document.querySelector(
      'link[rel="alternate"][type="application/rss+xml"], link[rel="alternate"][type="application/atom+xml"]',
    );
    if (!linkElement) return handleError("INVALID_RSS_FEED_URL");

    const rssFeedUrl = linkElement.getAttribute("href");
    const parser = new Parser();
    const feed = await parser.parseURL(new URL(rssFeedUrl as string, data.feedUrl).href);

    const checkFeed = await prisma.feed.findUnique({
      where: {
        feedUrl_workspaceId: {
          feedUrl: feed.link || data.feedUrl,
          workspaceId: data.workspaceId,
        },
      },
    });
    if (checkFeed) return handleError("RSS_URL_ALREADY_REGISTER");

    const checkYoutubeUrl = (url: string) => url.includes("www.youtube.com");

    const createdFeed = await prisma.feed.create({
      data: {
        title: feed.title || "",
        feedUrl: feed.link || data.feedUrl,
        description: feed.description,
        imageUrl: feed.image?.url,
        workspaceId: data.workspaceId,
        feedItem: {
          createMany: {
            data: feed.items.map((item) => {
              return {
                link: item.link || "",
                title: item.title || "",
                description: item.contentSnippet || item.content,
                imageUrl: checkYoutubeUrl(item.link || "")
                  ? `https://img.youtube.com/vi/${item.link?.split("v=")[1]}/0.jpg`
                  : null,
                publishedAt: item.pubDate || "",
              };
            }),
          },
        },
      },
      include: {
        feedItem: true,
      },
    });

    return NextResponse.json(createdFeed, { status: 201 });
  } catch (error) {
    console.error("피드 생성 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
