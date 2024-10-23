export const authError = {
  INVALID_TOKEN: {
    msg: "인증이 필요합니다",
    status: 401,
  },
  ACCESS_DENIED: {
    msg: "접근 권한이 없습니다",
    status: 403,
  },
  IS_NOT_OWNER: {
    msg: "오너 권한이 필요합니다",
    status: 403,
  },
  USER_NOT_FOUND: {
    msg: "해당 유저가 DB에 없습니다",
    status: 404,
  },
};
