import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { getElement } from "@/db/Actions";
import { SettingComponent } from "@/types/Components";
import { ExamPhase, WhichTimer } from "@/types/Timer";
import { useEffect, useState } from "react";
import CreateExamPhase from "./CreateExamPhase";
import ModalPage from "./reasons/ModalPage";

export default function ExamPhaseOverview({
  setShowComponent,
  setWhichTimer,
}: {
  setShowComponent: (c: SettingComponent) => void;
  setWhichTimer: (d: WhichTimer) => void;
}) {
  const [open, setOpen] = useState(false);
  const [phases, setPhases] = useState<ExamPhase[]>();
  const examphases: ExamPhase[] = [];
  const { setExamPhaseId } = useExamPhaseContext();

  const getPhases = async (): Promise<ExamPhase[]> => {
    const a = (await getElement("examPhases", "all").then((result) => {
      return result;
    })) as ExamPhase[];
    return a;
  };

  useEffect(() => {
    getPhases().then((phase: ExamPhase[]) => {
      phase.forEach((p) => {
        examphases.push(p);
        setPhases(phase);
      });
    });
  });

  return (
    <div className="flex flex-col">
      <div className="bg-tahiti">active:{localStorage.getItem("examId")}</div>
      <div className="flex flex-col">
        {phases !== undefined &&
          phases.map((p) => (
            <button
              key={p.title}
              onClick={() => {
                if (p.title !== undefined) {
                  localStorage.setItem("examId", p.title);
                  setExamPhaseId(p.title);
                }
              }}
            >
              {p.title}
            </button>
          ))}
      </div>
      <button onClick={() => setOpen(true)}>Create Phase</button>
      <ModalPage
        isStudy={false}
        open={open}
        setOpen={setOpen}
        component={
          <CreateExamPhase
            setOpen={setOpen}
            setShowComponent={setShowComponent}
            setWhichTimer={setWhichTimer}
          />
        }
      />
    </div>
  );
}
