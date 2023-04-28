import { BreakComponent } from "@/types/Components";
import { WhichTimer } from "@/types/Timer";

export default function ExtendBreak({
  setShowComponent,
  whichTimer,
  setWhichTimer,
}: {
  setShowComponent: (d: BreakComponent) => void;
  whichTimer: WhichTimer;
  setWhichTimer: (p: WhichTimer) => void;
}) {
  return (
    <div className="flex flex-col ">
      <div>Need a longer break?</div>

      <button
        onClick={() => {
          setWhichTimer(WhichTimer.BREAK);
          setShowComponent(BreakComponent.NO_COMPONENT);
        }}
      >
        extend break
      </button>
      <button
        onClick={() => {
          setWhichTimer(WhichTimer.STUDY);
          setShowComponent(BreakComponent.NO_COMPONENT);
        }}
      >
       continue studying
      </button>
    </div>
  );
}
