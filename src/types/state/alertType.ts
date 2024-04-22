export type SubBtnType = {
  text: string;
  onClick: () => void;
};

export type AlertSliceType = {
  alertData: {
    title: string;
    contents: string;
    subBtn?: SubBtnType;
  };
  isOpenAlertModal: boolean;
  openAlertModal: (title: string, contents: string, subBtn?: SubBtnType) => void;
  closeAlertModal: () => void;
};
