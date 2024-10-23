export const createMockFailList = (count = 10) => {
  return new Array(count).fill({}).map(() => ({ email: "jay@cnai.ai", membership: "Simple", projectId: 1234 }));
};

export const mockNotificationList = (count: number) => {
  return new Array(count).fill({}).map((_, index) => ({
    index: index + 1,
    user: "user",
    text: "코멘트가 노출되는 영역입니다. 코멘트가 노출되는 영역입니다. 코멘트가 노출되는 영역입니다. 코멘트가 노출되는 영역입니다. 코멘트가 노출되는 영역입니다. 코멘트가 노출되는 영역입니다. 코멘트가 노출되는 영역입니다.",
    date: "1분 전",
    title: "대규모 CDC Pipeline 운영을 위한 Debezium 개선 여정",
  }));
};
