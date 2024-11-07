import { FeedAction, FeedItem } from "@prisma/client";

export const addActionToFeedItems = (feedItemList: (FeedItem & { feedAction: FeedAction[] })[]) => {
  return feedItemList.map((item) => {
    const { feedAction, ...itemWithoutAction } = item;
    return {
      ...itemWithoutAction,
      isBookmark: feedAction?.some((action) => action.type === "BOOKMARK"),
      isHidden: feedAction?.some((action) => action.type === "HIDDEN"),
    };
  });
};
