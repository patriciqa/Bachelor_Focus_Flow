import CustomButton from "@/component/CustomButton";
import Tag from "@/component/overview/Tag";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import saveToDb from "@/hooks/SaveToDb";
import { BreakComponent } from "@/types/Components";
import { Break, Mood, WhichTimer } from "@/types/Timer";

export default function BreakSummary({
  breakEntry,
  setbreakEntry,
  setShowComponent,
  whichTimer,
  setWhichTimer,
}: {
  breakEntry: Break;
  setbreakEntry: (d: Break) => void;
  setShowComponent: (d: BreakComponent) => void;
  whichTimer: WhichTimer;
  setWhichTimer: (p: WhichTimer) => void;
}) {
  const { examPhaseId, setExamPhaseId } = useExamPhaseContext();

  const showBreakButton = (): boolean => {
    if (breakEntry.mood === Mood.BAD || breakEntry.mood === Mood.RATHER_BAD) {
      return true;
    }
    return false;
  };
  return (
    <div className="relative flex flex-col items-center h-full pt-20 ">
      <div className="w-[80vw] text-h16 text-pieGrey pb-4">
        {breakEntry.mood === Mood.GOOD || breakEntry.mood === Mood.RATHER_GOOD
          ? "Cool! Now let’s get back to studying."
          : "Everyone feels down sometimes and that’s okay. Consider taking another break and do something that makes you feel good."}
      </div>
      <div className="flex justify-center">
        <Tag entry={breakEntry} />
      </div>
      <div className="absolute flex flex-col items-center justify-end bottom-10 ">
        {showBreakButton() && (
          <CustomButton
            variant="break"
            onClick={() => {
              setWhichTimer(WhichTimer.BREAK);
              setShowComponent(BreakComponent.NO_COMPONENT);
              saveToDb(examPhaseId, breakEntry, false);
              setbreakEntry({
                timer: { startTime: 5, duration: 0 },
              });
            }}
          >
            take another break
          </CustomButton>
        )}
        <CustomButton
          variant="break-unfilled"
          onClick={() => {
            setWhichTimer(WhichTimer.STUDY);
            setShowComponent(BreakComponent.NO_COMPONENT);
            saveToDb(examPhaseId, breakEntry, false);
            setbreakEntry({ timer: { startTime: 0, duration: 0 } });
          }}
        >
          go studying
        </CustomButton>
      </div>
    </div>
  );
}
