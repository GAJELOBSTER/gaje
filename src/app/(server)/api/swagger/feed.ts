/**
 * @swagger
 * definitions:
 *   schema:
 *     Feed:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: 피드 ID
 *        title:
 *          type: string
 *          description: 피드 제목
 *        feedUrl:
 *          type: string
 *          description: 피드 URL
 *        description:
 *          type: string
 *          description: 피드 설명
 *        imageUrl:
 *          type: string
 *          description: 피드 이미지 URL
 *        workspaceId:
 *          type: string
 *          description: 워크스페이스 ID
 *
 *     FeedItem:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: 피드 아이템 ID
 *        link:
 *          type: string
 *          description: 피드 아이템 링크
 *        title:
 *          type: string
 *          description: 피드 아이템 제목
 *        description:
 *          type: string
 *          description: 피드 아이템 설명
 *        imageUrl:
 *          type: string
 *          description: 썸네일 이미지 URL
 *        publishedAt:
 *          type: string
 *          description: 게시일
 *        feedId:
 *          type: number
 *          description: 피드 ID
 *
 *     FeedAction:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: 피드 아이템 ID
 *        type:
 *          type: string
 *          enum: [BOOKMARK, HIDDEN]
 *          description: 액션 종류
 *        userId:
 *          type: string
 *          description: 유저 ID
 *        feedItemId:
 *          type: number
 *          description: 피드 아이템 ID
 */

/**
 * @description 합성 모델
 * @swagger
 * definitions:
 *   schema:
 *     FeedItemWithAction:
 *      type: object
 *      properties:
 *        id:
 *          type: number
 *          description: 피드 아이템 ID
 *        link:
 *          type: string
 *          description: 피드 아이템 링크
 *        title:
 *          type: string
 *          description: 피드 아이템 제목
 *        description:
 *          type: string
 *          description: 피드 아이템 설명
 *        imageUrl:
 *          type: string
 *          description: 썸네일 이미지 URL
 *        publishedAt:
 *          type: string
 *          description: 게시일
 *        feedId:
 *          type: string
 *          description: 피드 ID
 *        isBookmark:
 *          type: boolean
 *          description: 북마크 여부
 *        isHidden:
 *          type: boolean
 *          description: 숨김 여부
 */
