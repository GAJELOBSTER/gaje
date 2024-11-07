/**
 * @swagger
 * definitions:
 *   schema:
 *     error:
 *       type: object
 *       properties:
 *         errorCode:
 *            type: string
 *            description: 에러 코드
 *         msg:
 *            type: string
 *            description: 에러 메세지
 *   responses:
 *     200:
 *       description: 요청 성공
 *     201:
 *       description: 생성 성공
 *     204:
 *       description: 반환되는 데이터 없음 (삭제인 경우, 빈 컨텐츠 반환하는 경우)
 *     400:
 *       description: <font color="#ff4f4f">SCHEMA_INVALID</font> - 잘못된 요청(파라미터가 잘못된 경우)
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/schema/error'
 *     401:
 *       description: 인증된 유저가 아닌 경우 (로그인 되어 있지 않음)
 *     403:
 *       description: 미승인 요청 (요청 권한 없음)
 *     404:
 *       description: 데이터가 존재하지 않는 경우
 *     422:
 *       description: 중복된 경우
 */
