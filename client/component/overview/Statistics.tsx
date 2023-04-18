import { PageComponent } from "@/types/Timer";

export default function Statistics({
  setShowComponent,
}: {
  setShowComponent: (d: PageComponent) => void;
}) {
  return (
    <>
      <button onClick={() => setShowComponent(PageComponent.SETTINGS)}>
        Settings
      </button>
      <div>Statistics</div>
    </>
  );
}
