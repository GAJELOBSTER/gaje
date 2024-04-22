// Next
import { useTranslation } from "@/i18n";

// Components
import SampleModal from "@/components/modal/SampleModal";
import Btn from "@/components/common/Btn";

// Types
import { IPageProps } from "@/types/commonType";

export default async function SamplePage(props: Pick<IPageProps, "params">) {
  const { t } = await useTranslation(props.params.locale, "page");
  return (
    <div>
      <div>{t("sample.title")}</div>
      <SampleModal className="mt-5">
        <Btn outline size="medium" width={120} category="primary">
          {t("sample.sample_modal")}
        </Btn>
      </SampleModal>
    </div>
  );
}
