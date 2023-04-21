import { addElement } from "@/db/Actions";
import { StudyComponent } from "@/types/Components";
import { Mood, Study } from "@/types/Timer";

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
  const getLink = (): string => {
    let url = "";
    if (studyEntryy !== undefined) {
      switch (studyEntryy.mood) {
        case Mood.GOOD:
          url = "/reasons/good";
          break;
        case Mood.BAD:
          url = "/reasons/bad";
          break;
        case Mood.NEUTRAL:
          url = "/";
          addElement("examPhases", studyEntryy);
          break;
      }
    }

    return url;
  };

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
