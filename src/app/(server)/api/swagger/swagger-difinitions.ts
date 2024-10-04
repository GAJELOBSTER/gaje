/**
 * @swagger
 * definitions:
 *   responses:
 *     200:
 *       description: 요청 성공
 *     201:
 *       description: 생성 성공
 *     204:
 *       description: 반환되는 데이터가 없을 때 (빈 콘텐츠 제공)
 *     400:
 *       description: 잘못된 요청(파라미터가 잘못된 경우)
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *               properties:
 *                 msg:
 *                    type: string
 *                    description: 에러 메세지
 *     401:
 *       description: 인증된 유저가 아닌 경우 (로그인 되어 있지 않음)
 *     403:
 *       description: 미승인 요청 (요청 권한 없음)
 *     404:
 *       description: 데이터가 존재하지 앟는 경우
 *     422:
 *       description: 중복된 경우
 */
