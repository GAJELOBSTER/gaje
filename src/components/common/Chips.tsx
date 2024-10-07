"use client";

//Assets
import DeleteIcon from "@/assets/svg/DeleteIcon";

//Components
import Avatar from "@/components/common/Avatar";

type WidthUnitType = "px" | "%" | "em" | "vh";
type ChipsSizeType = "large" | "medium" | "small";

export interface IChipsProps {
  /** 칩 내용(텍스트) */
  title: string;
  /** 칩 이미지 */
  image: string;
  /** 칩 사이즈, 디자인 시스템(피그마 컨벤션) */
  size?: ChipsSizeType;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 칩 가로 길이 */
  width?: `${number}${WidthUnitType}` | number;
  /** 버튼 클릭 시 이벤트 동작 */
  onClick?: () => void;
  /** 선택된 드롭다운 상태값 -> const [sample, setSample] = useState<string>("") */
  checkedData: any;
  /** 선택된 드롭다운 상태값 업데이트 -> const [sample, setSample] = useState<string>("") */
  setCheckedData: React.Dispatch<React.SetStateAction<any>>;
}

export default function Chips(props: IChipsProps) {
  const chipsWidth = props.width ? (typeof props.width === "string" ? props.width : `${props.width}px`) : "fit-content";

  return (
    <div
      className={`${props.checkedData === props.title ? "bg-background-primary-weak pl-4 pr-[40px] outline outline-2 outline-border-primary" : "bg-background-gray px-4"} relative flex flex-shrink-0 cursor-pointer items-center justify-center gap-3 rounded-4 py-3`}
      style={{ width: chipsWidth }}
      onClick={() => props.setCheckedData(props.title)}
    >
      <Avatar image={props.image} />
      <div className="z-5 typo-body-2-normal font-medium">{props.title}Avatar</div>
      {props.checkedData === props.title && (
        <div
          className="absolute right-3"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.setCheckedData("");
            console.log("here");
          }}
        >
          <DeleteIcon />
        </div>
      )}
    </div>
  );
}
