import { atom, selector } from "recoil";
import type { SampleType } from "@/types/state/sampleType";

const tempData = new Array(10).fill({}).map((_, index) => {
  return {
    email: "sample@cnai.ai",
    name: "Sample",
    isAdmin: index % 4 === 0 ? true : false,
  };
});

export const userListState = atom<SampleType[]>({
  key: "userState",
  default: tempData,
});

export const adminUserListState = selector({
  key: "adminUserListState",
  get: ({ get }) => {
    const userList = get(userListState);
    return userList.filter((user) => user.isAdmin);
  },
});
