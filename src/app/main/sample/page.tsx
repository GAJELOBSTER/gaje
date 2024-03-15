import SampleModal from "@/components/modal/SampleModal";
import Btn from "@/components/common/Btn";

export default function SamplePage() {
  return (
    <div>
      <SampleModal className="mt-5">
        <Btn outline size="medium" width={120} category="primary">
          Sample Modal
        </Btn>
      </SampleModal>
    </div>
  );
}
