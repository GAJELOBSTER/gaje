/**
 * @swagger
 * definitions:
 *   schema:
 *     Workspace:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: 워크스페이스 ID
 *        name:
 *          type: string
 *          description: 워크스페이스 이름
 *        isPublic:
 *          type: boolean
 *          description: 공유 워크스페이스 여부
 *        userId:
 *          type: string
 *          description: 유저 ID
 */

/**
 * @description 합성 모델
 * @swagger
 * definitions:
 *   schema:
 *     WorkspaceWithMember:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: 워크스페이스 ID
 *        name:
 *          type: string
 *          description: 워크스페이스 이름
 *        isPublic:
 *          type: boolean
 *          description: 공유 워크스페이스 여부
 *        userId:
 *          type: string
 *          description: 유저 ID
 *        member:
 *          type: array
 *          description: 워크스페이스 멤버들
 *          items:
 *            $ref: '#/definitions/schema/Member'
 *
 *     WorkspaceWithMemberAndFeed:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: 워크스페이스 ID
 *        name:
 *          type: string
 *          description: 워크스페이스 이름
 *        isPublic:
 *          type: boolean
 *          description: 공유 워크스페이스 여부
 *        userId:
 *          type: string
 *          description: 유저 ID
 *        member:
 *          type: array
 *          description: 워크스페이스 멤버 목록
 *          items:
 *            $ref: '#/definitions/schema/Member'
 *        feed:
 *          type: array
 *          description: 워크스페이스 피드 목록
 *          items:
 *            $ref: '#/definitions/schema/Feed'
 */
