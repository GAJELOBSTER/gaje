/**
 * @swagger
 * definitions:
 *   schema:
 *     Workspace:
 *      type: object
 *      properties:
 *        id:
 *          type: number
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
 *     WorkspaceWithMember:
 *      type: object
 *      properties:
 *        id:
 *          type: number
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
 */
