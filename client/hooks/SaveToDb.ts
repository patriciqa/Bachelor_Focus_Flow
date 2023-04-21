import { ExamContext } from "@/context/ExamPhaseContext";
import { editElement, getElement } from "@/db/Actions";
import { Break, ExamPhase, Study } from "@/types/Timer";
import { useContext } from "react";

export default function saveToDb(
  examPhaseId: string,
  entry: Break | Study,
  isStudyEntry: boolean
) {
  // const { examPhaseId } = useContext(ExamContext);
  const currentPhase = getElement("examPhases", examPhaseId);
  currentPhase.then((e: any) => {
    const updatedPhase: ExamPhase = { ...e };
    if (isStudyEntry) {
      if (updatedPhase.studyEntries) {
        updatedPhase.studyEntries.push(entry);
      } else {
        const phase = [];
        phase.push(entry);
        updatedPhase.studyEntries = phase;
      }
    } else {
      if (updatedPhase.breakEntries) {
        updatedPhase.breakEntries.push(entry);
      } else {
        const phase = [];
        phase.push(entry);
        updatedPhase.breakEntries = phase;
      }
    }

    editElement("examPhases", examPhaseId, updatedPhase);
  });
}
