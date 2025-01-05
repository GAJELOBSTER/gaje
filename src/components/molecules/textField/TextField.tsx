"use client";

//Componenet
import HelperText from "@/components/atoms/helperText/HelperText";
import Input from "@/components/atoms/input/Input";
import Label from "@/components/atoms/label/Label";
import TextArea from "@/components/atoms/textArea/TextArea";

type WidthUnitType = "px" | "%" | "em" | "vh";
type TextFieldCategoryType = "input" | "textArea";
type TextFieldSizeType = "large" | "medium" | "small";

type IconList = {
  icon: React.ReactNode;
  onclick?: () => void;
};

export interface ITextFieldProps {
  className?: string;
  /** 텍스트 필드 가로 길이 */
  width?: `${number}${WidthUnitType}` | number;
  /** 텍스트필드  타입*/
  type?: TextFieldCategoryType;
  /** 텍스트필드 사이즈 */
  size?: TextFieldSizeType;
  /** label */
  label?: string;
  /** placeholder */
  placeholder?: string;
  /** 텍스트 필드 안내 메시지 */
  helperText?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 유효성 여부 */
  error?: boolean;
  /** 입력 값 */
  value: string;
  /** 입력란 오른쪽 아이콘 */
  iconList?: IconList[];
  /** 입력 값 변경 이벤트 */
  onChange: (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** 키보드 입력 시 이벤트 */
  onKeyDown?: (value: React.KeyboardEvent<any>) => void;
  /** 키보드 포커스 이벤트 */
  onFocus?: () => void;
  /** 키보드 포커스 아웃 이벤트 */
  onBlur?: () => void;
}

export default function TextField({ size = "medium", type = "input", ...args }: ITextFieldProps) {
  const props = { ...args, size };

  return (
    <div className={props.className}>
      {props.label && <Label {...props} text={props.label} />}
      <div className="relative my-2">
        {type === "input" ? <Input {...props} /> : <TextArea {...props} />}
        <div className="absolute right-5 top-[calc(50%-2px)] flex -translate-y-1/2 gap-3">
          {props.iconList &&
            props.iconList.map((icon, index) => (
              <div key={`icon-list-${index}`} className="h-6 w-6 cursor-pointer" onClick={icon.onclick}>
                {icon.icon}
              </div>
            ))}
        </div>
      </div>
      {props.helperText && <HelperText {...props} text={props.helperText} />}
    </div>
  );
}
