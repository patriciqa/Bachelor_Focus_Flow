import { StudyComponent } from "@/types/Components";
import { Study } from "@/types/Timer";
import React from "react";

export default function BadReasons({
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
  return (
    <>
      <div>Why did it go not so well?</div>

      <button onClick={() => setShowComponent(StudyComponent.NO_COMPONENT)}>
        complete
      </button>
    </>
  );
}
