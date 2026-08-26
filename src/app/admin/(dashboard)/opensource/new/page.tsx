import PageHeader from "../../component/PageHeader";
import OpenSourceForm from "../../component/OpenSourceForm";

export default function NewOpenSourcePage() {
  return (
    <>
      <PageHeader title="New Open Source Project" description="Draft it, then publish when ready" />
      <OpenSourceForm />
    </>
  );
}
