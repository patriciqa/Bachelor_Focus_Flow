import { ExamContext } from "@/context/ExamPhaseContext";
import { addElement } from "@/db/Actions";
import saveToDb from "@/hooks/SaveToDb";
import { StudyComponent } from "@/types/Components";
import { Mood, Study } from "@/types/Timer";
import { useContext } from "react";

export default function StudyMoodCheckIn({
  showComponent,
  setShowComponent,
  studyEntryy,
  setStudyEntryy,
}: {
  showComponent: StudyComponent;
  setShowComponent: (p: StudyComponent) => void;
  studyEntryy: Study;
  setStudyEntryy: (s: Study) => void;
}) {
  const { examPhaseId } = useContext(ExamContext);

  return (
    <>
      <div>Study - {studyEntryy.timer.duration}</div>
      <div>How did your studying go?</div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            const s = { ...studyEntryy };
            s.mood = Mood.GOOD;
            setStudyEntryy(s);
          }}
        >
          good
        </button>
        <button
          onClick={() => {
            const s = { ...studyEntryy };
            s.mood = Mood.NEUTRAL;
            setStudyEntryy(s);
          }}
        >
          neutral
        </button>
        <button
          onClick={() => {
            const s = { ...studyEntryy };
            s.mood = Mood.BAD;
            s.reasonIds = [];
            setStudyEntryy(s);
          }}
        >
          bad
        </button>
      </div>
      <button
        onClick={() => {
          switch (studyEntryy.mood) {
            case Mood.GOOD:
              setShowComponent(StudyComponent.GOOD_CAUSE);
              break;
            case Mood.NEUTRAL:
              saveToDb(examPhaseId, studyEntryy, true);
              setShowComponent(StudyComponent.NO_COMPONENT);
              break;
            case Mood.BAD:
              setShowComponent(StudyComponent.BAD_CAUSE);
              break;
          }
        }}
      >
        Continue
      </button>
      {/* <Link href={getLink()}>Continue</Link> */}
    </>
  );
}
