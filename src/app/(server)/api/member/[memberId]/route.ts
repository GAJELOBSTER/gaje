// Next
import { NextRequest, NextResponse } from "next/server";

// Libs
import { z } from "zod";
import prisma from "@/libs/prisma";

// Services
import { isAuthenticated } from "@/services/authService";
import { handleError, handleZodError } from "@/services/errorService";

type Params = {
  memberId: string;
};

const paramsSchema = z.object({
  memberId: z.number(),
});

/**
 * @swagger
 * /api/member/{memberId}:
 *  delete:
 *    tags: [Member]
 *    summary: 멤버 삭제
 *    parameters:
 *      - in: path
 *        name: memberId
 *        type: number
 *        required: true
 *    responses:
 *      '204':
 *         $ref: '#/definitions/responses/204'
 *      '400':
 *         description: <font color="#ff4f4f">SCHEMA_INVALID</font> - 잘못된 요청(파라미터가 잘못된 경우) </br>
 *                      <font color="#ff4f4f">DONT_DELETE_OWNER</font> - Owner는 삭제 불가능
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
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const authResult = await isAuthenticated();
    if (!authResult.ok) return authResult.response;

    const paramsResult = paramsSchema.safeParse({ memberId: params.memberId });
    const { success: paramsSuccess, data: paramsData, error: paramsError } = paramsResult;
    if (!paramsSuccess) return handleZodError(paramsError);

    const checkMember = await prisma.member.findUnique({ where: { id: paramsData.memberId } });
    if (!checkMember) return handleError("MEMBER_ID_NOT_FOUND");
    if (checkMember?.isOwner) return handleError("DONT_DELETE_OWNER");

    const checkOwner = await prisma.member.findUnique({
      where: { userId_workspaceId: { userId: authResult.user.id, workspaceId: checkMember.workspaceId } },
    });
    if (!checkOwner?.isOwner) return handleError("IS_NOT_OWNER");

    await prisma.member.delete({ where: { id: paramsData.memberId } });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("멤버 삭제 오류", error);
    return handleError("INTERNAL_SERVER_ERROR");
  }
}
