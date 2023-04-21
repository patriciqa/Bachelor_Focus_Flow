import { BreakComponent } from "@/types/Components";
import { ShowPage } from "@/types/Timer";

export default function ExtendBreak({
  setShowComponent,
  showPage,
  setShownPage,
}: {
  setShowComponent: (d: BreakComponent) => void;
  showPage: ShowPage;
  setShownPage: (p: ShowPage) => void;
}) {
  return (
    <div className="flex flex-col ">
      <div>Need a longer break?</div>

      <button
        onClick={() => {
          setShownPage(ShowPage.BREAK);
          setShowComponent(BreakComponent.NO_COMPONENT);
        }}
      >
        extend break
      </button>
      <button
        onClick={() => {
          setShownPage(ShowPage.STUDY);
          setShowComponent(BreakComponent.NO_COMPONENT);
        }}
      >
       continue studying
      </button>
    </div>
  );
}
