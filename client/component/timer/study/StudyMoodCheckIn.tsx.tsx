import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import saveToDb from "@/hooks/SaveToDb";
import { StudyComponent } from "@/types/Components";
import { Mood, Study } from "@/types/Timer";

export default function StudyMoodCheckIn({
  showComponent,
  setShowComponent,
  studyEntry,
  setStudyEntry,
}: {
  showComponent: StudyComponent;
  setShowComponent: (p: StudyComponent) => void;
  studyEntry: Study;
  setStudyEntry: (s: Study) => void;
}) {
  const { examPhaseId } = useExamPhaseContext();

  return (
    <>
      <div>Study - {studyEntry.timer.duration}</div>
      <div>How did your studying go?</div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            const s = { ...studyEntry };
            s.mood = Mood.GOOD;
            setStudyEntry(s);
          }}
        >
          good
        </button>
        <button
          onClick={() => {
            const s = { ...studyEntry };
            s.mood = Mood.NEUTRAL;
            setStudyEntry(s);
          }}
        >
          neutral
        </button>
        <button
          onClick={() => {
            const s = { ...studyEntry };
            s.mood = Mood.BAD;
            s.reasonIds = [];
            setStudyEntry(s);
          }}
        >
          bad
        </button>
      </div>
      <button
        onClick={() => {
          switch (studyEntry.mood) {
            case Mood.GOOD:
              setShowComponent(StudyComponent.GOOD_REASON);
              break;
            case Mood.NEUTRAL:
              saveToDb(examPhaseId, studyEntry, true);
              setShowComponent(StudyComponent.NO_COMPONENT);
              break;
            case Mood.BAD:
              setShowComponent(StudyComponent.BAD_REASON);
              break;
          }
        }}
      >
        Continue
      </button>
    </>
  );
}
