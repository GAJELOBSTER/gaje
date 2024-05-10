export type SubBtnType = {
  text: string;
  onClick: () => void;
};

export type AlertStateType = {
  alertData: {
    title: string;
    contents: string | React.ReactNode;
    subBtn?: SubBtnType;
  };
  isOpenAlertModal: boolean;
};

export type AlertSliceType = AlertStateType & {
  openAlertModal: (title: string, contents: string | React.ReactNode, subBtn?: SubBtnType) => void;
  closeAlertModal: () => void;
};
