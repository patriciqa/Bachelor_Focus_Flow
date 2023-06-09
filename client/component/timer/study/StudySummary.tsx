import CustomButton from "@/component/CustomButton";
import Tag from "@/component/overview/Tag";
import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import saveToDb from "@/hooks/SaveToDb";
import { Mood, Study, WhichTimer } from "@/types/Timer";

export default function StudySummary({
  studyEntry,
  setStudyEntry,
  setWhichTimer,
}: {
  studyEntry: Study;
  setStudyEntry: (d: Study) => void;
  setWhichTimer: (p: WhichTimer) => void;
}) {
  const { examPhaseId } = useExamPhaseContext();

  return (
    <div className="relative flex flex-col items-center h-full pt-20 ">
      <div className="w-[80vw] text-h16 text-pieGrey pb-4">
        {studyEntry.mood === Mood.GOOD || studyEntry.mood === Mood.RATHER_GOOD
          ? "Cool, keep it up! Now enjoy your well deserved break."
          : "Seems like your studying didn't go well. You should consider taking a longer break and do something you enjoy."}
      </div>
      <div className="flex justify-center">
        <Tag entry={studyEntry} />
      </div>
      <div className="absolute flex flex-col items-center justify-end bottom-20 ">
        <CustomButton
          variant="study"
          onClick={() => {
            setWhichTimer(WhichTimer.BREAK);
            saveToDb(examPhaseId, studyEntry, true);
            setStudyEntry({ timer: { startTime: 0, duration: 0 } });
          }}
        >
          take a break
        </CustomButton>
      </div>
    </div>
  );
}
