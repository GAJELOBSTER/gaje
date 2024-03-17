export const createMockFailList = (count = 10) => {
  return new Array(count).fill({}).map(() => ({ email: "jay@cnai.ai", membership: "Simple", projectId: 1234 }));
};
