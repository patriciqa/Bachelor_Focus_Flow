import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { getElement } from "@/db/Actions";
import { SettingComponent } from "@/types/Components";
import { ExamPhase } from "@/types/Timer";
import { useEffect, useState } from "react";
import ModalPage from "./causes/ModalPage";
import CreateExamPhase from "./CreateExamPhase";

export default function ExamPhaseOverview({
  setShowComponent,
}: {
  setShowComponent: (c: SettingComponent) => void;
}) {
  let [open, setOpen] = useState(false);
  const [phases, setPhases] = useState<ExamPhase[]>();
  const examphases: ExamPhase[] = [];
  const { examPhaseId, setExamPhaseId } = useExamPhaseContext();

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
        open={open}
        setOpen={setOpen}
        component={
          <CreateExamPhase
            setOpen={setOpen}
            setShowComponent={setShowComponent}
          />
        }
      />
    </div>
  );
}
