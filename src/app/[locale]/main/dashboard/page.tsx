import { useTranslation } from "@/i18n";
import { IPageProps } from "@/types/commonType";

export default async function SamplePage(props: IPageProps) {
  const { t } = await useTranslation(props.params.locale, "page");
  return <div>{t("dashboard.title")}</div>;
}
