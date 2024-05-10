import { I18nLocaleType } from "@/i18n/i18nConfig";

export type SearchParamsType = {
  page: number;
  size: number;
  start_date?: string;
  end_date?: string;
  orderBy?: string;
  order?: "asc" | "desc";
};
export interface ILocaleProps {
  locale: I18nLocaleType;
}

export interface IPageProps {
  children: React.ReactNode;
  params: ILocaleProps;
  searchParams: SearchParamsType;
}

export interface IModalProps {
  /** 모달 오픈 유무 */
  isOpen?: boolean;
  /** 모달 닫기 */
  onClose?: () => void;
  /** 모달 여는 트리거(버튼) */
  children?: React.ReactNode;
  /** 모달 트리거 영역 ClassName */
  className?: string;
}

export interface IFetchOption extends RequestInit {
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  body?: any;
}

// API에 맞게 변경
type UserType = any;

export type CookieDataType = {
  accessToken: string | undefined;
  refreshToken?: string | undefined;
  userInfo: UserType;
};
