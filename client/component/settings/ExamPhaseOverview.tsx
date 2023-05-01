import { useExamPhaseContext } from "@/context/ExamPhaseContext";
import { getElement } from "@/db/Actions";
import { SettingComponent } from "@/types/Components";
import { ExamPhase } from "@/types/Timer";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Modal } from "../transitions/Modal";
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
      <AnimatePresence>
        {open && (
          <>
            <Modal onClose={() => setOpen(false)}>
              <button
                className="mr-1 text-blue-500 focus:outline-none"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <CreateExamPhase
                setOpen={setOpen}
                setShowComponent={setShowComponent}
              />
            </Modal>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
