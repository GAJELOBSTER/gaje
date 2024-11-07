const feedError = {
  // 400
  INVALID_RSS_FEED_URL: {
    msg: "해당 URL은 rss feed 정보를 제공하지 않습니다",
    status: 400,
  },
  RSS_URL_ALREADY_REGISTERED: {
    msg: "이미 등록된 Feed 입니다",
    status: 400,
  },

  // 404
  RSS_FEED_NOT_FOUND: {
    msg: "리소스를 찾을 수 없는 Feed URL입니다",
    status: 404,
  },
  FEED_ID_NOT_FOUND: {
    msg: "존재하지 않는 Feed ID 입니다",
    status: 404,
  },
  FEED_ITEM_ID_NOT_FOUND: {
    msg: "존재하지 않는 Feed Item ID 입니다",
    status: 404,
  },
};

const memberError = {
  DONT_DELETE_OWNER: {
    msg: "오너는 삭제할 수 없습니다",
    status: 400,
  },
  MEMBER_ALREADY_REGISTERED: {
    msg: "이미 등록된 멤버 입니다",
    status: 400,
  },
  MEMBER_ID_NOT_FOUND: {
    msg: "존재하지 않는 Member ID 입니다",
    status: 404,
  },
};

const workspaceError = {
  IS_NOT_PUBLIC_WORKSPACE: {
    msg: "공유 워크스페이스가 아닙니다",
    status: 403,
  },
  WORKSPACE_ID_NOT_FOUND: {
    msg: "존재하지 않는 Workspace ID 입니다",
    status: 404,
  },
};

export const customError = {
  ...feedError,
  ...memberError,
  ...workspaceError,
};
